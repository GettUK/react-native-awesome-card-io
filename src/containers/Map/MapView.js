import React, { Component } from 'react';
import { Platform, ImageBackground } from 'react-native';
import Map, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compact } from 'lodash';

import assets from 'assets';

import { changeAddress } from 'actions/booking';

import config from 'config';

import { Icon } from 'components';

import { LATTITIDE_DELTA, LONGTITUDE_DELTA, geocode, processLocation } from 'utils';
import {
  IN_PROGRESS_STATUS,
  ARRIVED_STATUS,
  DRIVER_ON_WAY,
  ACTIVE_DRIVER_STATUSES,
  FINAL_STATUSES,
  PREORDER_STATUSES
} from 'utils/orderStatuses';

import MapStyle from './MapStyle';
import styles from './style';

class MapView extends Component {
  componentDidUpdate(prevProps) {
    const { isActiveOrder, isCompletedOrder, dragEnable } = this.props;
    const {
      isActiveOrder: isActiveOrderProps,
      isCompletedOrder: isCompletedOrderProps,
      dragEnable: oldDragEnable
    } = prevProps;

    const order = this.getOrder();
    const oldOrder = this.getOrder(prevProps);

    if (isCompletedOrder && !isCompletedOrderProps) {
      const { source, dest, stops } = this.preparePointsList(order);
      const multiplier = this.getMultiplier();
      this.resizeMapToCoordinates([source, dest, ...stops], { top: 100 * multiplier, bottom: 170 * multiplier });
    } else if (!isCompletedOrder) {
      this.changeMapForActiveOrder({ oldOrder, order, isActiveOrderProps, isActiveOrder, dragEnable, oldDragEnable });
    }
  }

  changeMapForActiveOrder({ oldOrder, order, isActiveOrderProps, isActiveOrder, dragEnable, oldDragEnable }) {
    if (this.shouldResizeMapToPointsList({ oldOrder, order, oldIsActiveOrder: isActiveOrderProps, isActiveOrder })) {
      const { source, dest, stops } = this.preparePointsList(order);
      setTimeout(() => this.resizeMapToCoordinates([source, dest, ...stops]));
    }

    this.handleAnimateToRegion({ order, oldOrder, dragEnable, oldDragEnable, isActiveOrder, isActiveOrderProps });

    if (this.shouldResizeMapToDriverAndPickupAddress({ oldOrder, order })) {
      this.resizeMapToDriverAndPickupAddress(order);
    }
  }

  getOrder(props = this.props) {
    return props.isPreOrder ? props.bookingForm : props.currentOrder;
  }

  getStops(order = this.getOrder()) {
    return order.stops || order.stopAddresses;
  }

  animateToRegion = (source) => {
    this.map.animateToRegion({
      ...source,
      latitudeDelta: LATTITIDE_DELTA,
      longitudeDelta: LONGTITUDE_DELTA
    });
  };

  isPickupAddressWasUpdatedByMapDrag = ({ order, dragEnable, oldDragEnable, oldOrder }) => (
    !dragEnable && !oldDragEnable && order.pickupAddress !== oldOrder.pickupAddress
  );

  isPathChanged = (bookingForm, bookingFormProps) => (
    (bookingForm.pickupAddress && (bookingForm.pickupAddress !== bookingFormProps.pickupAddress))
    || (bookingForm.destinationAddress && (bookingForm.destinationAddress !== bookingFormProps.destinationAddress))
    || (bookingForm.stops && bookingForm.stops !== bookingFormProps.stops)
  );

  resizeMapToCoordinates = (coordinates, params) => {
    const multiplier = this.getMultiplier();

    this.map.fitToCoordinates(compact(coordinates), {
      edgePadding: { top: 80 * multiplier, bottom: 420 * multiplier, left: 100, right: 100, ...params },
      animated: true
    });
  };

  shouldAnimateToPickUp = ({ order, oldOrder, isActiveOrder, isActiveOrderProps }) => (
    (order.pickupAddress !== oldOrder.pickupAddress && !order.destinationAddress && oldOrder.pickupAddress)
    || (!order.destinationAddress && oldOrder.destinationAddress)
    || (isActiveOrder && !isActiveOrderProps)
  );

  gotNewStatus = (oldOrder, order, status) =>
    oldOrder.status !== status && order.status === status;

  shouldResizeMapToDriverAndPickupAddress = ({ oldOrder, order }) =>
    order.pickupAddress && order.driverDetails && order.driverDetails.location &&
    ((this.gotNewStatus(oldOrder, order, DRIVER_ON_WAY))
      || (this.gotNewStatus(oldOrder, order, ARRIVED_STATUS)));

  shouldResizeMapToPointsList = ({ oldOrder, order, oldIsActiveOrder, isActiveOrder }) =>
    order.pickupAddress && order.destinationAddress && !PREORDER_STATUSES.includes(order.status) && (
      (!isActiveOrder && oldIsActiveOrder)
      || this.isPathChanged(order, oldOrder)
      || this.gotNewStatus(oldOrder, order, IN_PROGRESS_STATUS)
      || (order.driverDetails && !order.driverDetails.location)
    );

  handleAnimateToRegion = ({ order, oldOrder, dragEnable, oldDragEnable, isActiveOrder, isActiveOrderProps }) => {
    if (this.isPickupAddressWasUpdatedByMapDrag({ order, oldOrder, dragEnable, oldDragEnable })) {
      this.props.onEndLoadingPickup();
    } else if (this.shouldAnimateToPickUp({ order, oldOrder, isActiveOrder, isActiveOrderProps })) {
      const source = this.prepareCoordinates(order.pickupAddress);
      this.props.disableDrag();
      this.animateToRegion(source);
    }
  };

  resizeMapToDriverAndPickupAddress = (order) => {
    const dest = this.prepareCoordinates(order.pickupAddress);
    const source = this.prepareCoordinates(order.driverDetails.location);

    setTimeout(() => this.resizeMapToCoordinates([source, dest]));
  };

  getMultiplier = () => (Platform.OS === 'android' ? 2.5 : 1);

  prepareCoordinates = address => (
    address && address.lat && address.lng
      ? { latitude: address.lat, longitude: address.lng }
      : address
  );

  preparePointsList = (order) => {
    const source = this.prepareCoordinates(order.pickupAddress);
    const dest = this.prepareCoordinates(order.destinationAddress);
    const stops = (this.getStops(order) || []).map(this.prepareCoordinates);

    return { source, dest, stops };
  };

  renderCurrentMarker = () =>
    <ImageBackground source={assets.pointerShadow} style={styles.iconShadow}>
      <Icon name="currentLocation" size={18} />
    </ImageBackground>;

  renderSourceMarker = () => <Icon name="sourceMarker" width={32} height={52} />;

  renderSourceActiveMarker = () => <Icon name="pickUpField" size={16} />;

  renderStopMarker = () => <Icon name="pickUpField" color="#74818f" size={12} />;

  renderDestinationMarker = () => <Icon name="destinationMarker" width={16} height={19} />;

  renderDriverMarker = () => <Icon name="carFacet" size={32} />;

  renderMarker = ({ address, type = 'current', index = '' }) =>
    address &&
      (<Map.Marker
        key={type + index}
        coordinate={this.prepareCoordinates(address)}
        anchor={{ x: 0.5, y: 0.5 }}
        stopPropagation
        tracksViewChanges={false}
      >
        {this[`render${type.charAt(0).toUpperCase()}${type.slice(1)}Marker`]()}
      </Map.Marker>
      );

  getPathes = locations => (
    locations.map((location, index) => {
      const nextIndex = index + 1;

      if (nextIndex < locations.length) return { source: location, destination: locations[nextIndex] };

      return null;
    }).filter(Boolean)
  );

  renderRidePath = () => {
    // eslint-disable-next-line
    const { isPreOrder } = this.props;

    const order = this.getOrder();
    const stops = this.getStops();

    const shouldShowPath = order.destinationAddress && order.pickupAddress && (
      isPreOrder
      || FINAL_STATUSES.includes(order.status)
      || (order.status === IN_PROGRESS_STATUS && stops && stops.length > 0)
      || (order.status === DRIVER_ON_WAY && order.driverDetails && !order.driverDetails.location)
    );

    if (!shouldShowPath) return null;

    const locations = [
      order.pickupAddress,
      ...(stops || []),
      order.destinationAddress
    ];

    return this.getPathes(locations).map(this.renderSinglePath);
  };

  renderDriverPath = () => {
    const order = this.getOrder();
    const stops = this.getStops();

    const isDriverOnTheWay = order.status === DRIVER_ON_WAY;
    const isInProgressStatus = order.status === IN_PROGRESS_STATUS;

    const shouldShowPath = order.pickupAddress
      && order.driverDetails && order.driverDetails.location
      && (isDriverOnTheWay || (isInProgressStatus && (!stops || !stops.length)));

    if (!shouldShowPath) return null;

    const locations = [order.driverDetails.location];

    if (isDriverOnTheWay) {
      locations.push(order.pickupAddress);
    } else {
      locations.push(order.destinationAddress);
    }

    return this.getPathes(locations).map(this.renderSinglePath);
  };

  renderSinglePath = ({ source, destination }) => (
    <MapViewDirections
      key={source.line + destination.line}
      origin={this.prepareCoordinates(source)}
      destination={this.prepareCoordinates(destination)}
      apikey={config.googleAPIKey}
      strokeWidth={3}
      strokeColor="#2b4983"
    />
  );

  // eslint-disable-next-line consistent-return
  getGeocode = (region) => {
    const { isPreOrder, dragEnable, changeAddress, onEndLoadingPickup, onStartLoadingPickup, enableDrag } = this.props;

    if (!dragEnable) { return enableDrag(); }

    const order = this.getOrder();

    if (region && isPreOrder && dragEnable && !order.destinationAddress) {
      const coordinates = { lat: region.latitude, lng: region.longitude };

      onStartLoadingPickup();

      geocode(coordinates)
        .then(processLocation)
        .then(data => changeAddress(data, { type: 'pickupAddress' }))
        .catch(onEndLoadingPickup);
    }
  };

  shouldShowPickupMarkers = ({ order, stops, isPreOrder }) => !!order.pickupAddress && (
    (isPreOrder && order.destinationAddress)
    || ACTIVE_DRIVER_STATUSES.includes(order.status)
    || (order.status === IN_PROGRESS_STATUS && stops && stops.length > 0)
    || FINAL_STATUSES.includes(order.status)
  );

  shouldShowDestinationMarkers = ({ order, isPreOrder }) => (
    isPreOrder
    || order.status === IN_PROGRESS_STATUS
    || FINAL_STATUSES.includes(order.status)
    || (order.status === DRIVER_ON_WAY && order.driverDetails && !order.driverDetails.location)
  );

  shouldShowDriverMarker = ({ order }) => (
    order.driverDetails && order.driverDetails.location
    && (ACTIVE_DRIVER_STATUSES.includes(order.status) || order.status === IN_PROGRESS_STATUS)
  );

  render() {
    const { currentPosition, isPreOrder, dragEnable } = this.props;

    const order = this.getOrder();
    const stops = this.getStops();

    return (
      <Map
        ref={(map) => { this.map = map; }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        zoomEnabled
        showsCompass={false}
        mapPadding={{ bottom: !order.destinationAddress && isPreOrder ? 190 : 0 }}
        scrollEnabled={dragEnable}
        customMapStyle={MapStyle}
        onRegionChangeComplete={this.getGeocode}
      >
        {this.renderRidePath()}

        {this.renderDriverPath()}

        {this.renderMarker({ address: currentPosition })}

        {this.shouldShowPickupMarkers({ order, stops, isPreOrder }) &&
          this.renderMarker({
            address: order.pickupAddress,
            type: !order.destinationAddress && isPreOrder ? 'source' : 'sourceActive'
          })
        }

        {stops && stops.length > 0 && this.shouldShowDestinationMarkers({ order, isPreOrder }) &&
          stops.map((address, index) => this.renderMarker({ address, type: 'stop', index }))
        }

        {order.destinationAddress && this.shouldShowDestinationMarkers({ order, isPreOrder }) &&
          this.renderMarker({ address: order.destinationAddress, type: 'destination' })
        }

        {this.shouldShowDriverMarker({ order }) &&
          this.renderMarker({ address: order.driverDetails.location, type: 'driver' })
        }
      </Map>
    );
  }
}

MapView.propTypes = {
  isActiveOrder: PropTypes.bool.isRequired,
  isCompletedOrder: PropTypes.bool.isRequired,
  isPreOrder: PropTypes.bool.isRequired
};

MapView.defaultProps = {};

const mapState = ({ ui, booking }) => ({
  bookingForm: booking.bookingForm,
  currentOrder: booking.currentOrder,
  currentPosition: ui.map.currentPosition,
  driverLocation: booking.currentOrder.driverDetails ? booking.currentOrder.driverDetails.location : {},
  status: booking.currentOrder.status || 'connected'
});

export default connect(mapState, { changeAddress }, null, { withRef: true })(MapView);
