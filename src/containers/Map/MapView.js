import React, { Component } from 'react';
import { Platform, View, Text, Animated } from 'react-native';
import Map, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compact, upperFirst, take } from 'lodash';

import { changeAddress } from 'actions/booking';
import { subscribeToDriversLocations, getDriversLocations } from 'actions/ui/map';

import config from 'config';

import { Icon } from 'components';

import { LATTITIDE_DELTA, LONGTITUDE_DELTA, geocode, processLocation, normalizeCoordinate } from 'utils';
import {
  IN_PROGRESS_STATUS,
  ARRIVED_STATUS,
  DRIVER_ON_WAY,
  ACTIVE_DRIVER_STATUSES,
  FINAL_STATUSES,
  PREORDER_STATUSES,
  ORDER_RECEIVED_STATUS
} from 'utils/orderStatuses';

import DriversMarkers from './DriversMarkers';
import MapStyle from './MapStyle';
import styles from './style';
import { getPathCoordinates, fixPathLength, getRandomCoordinatesInRadius } from './utils';

const pollingInterval = 45 * 1000;

class MapView extends Component {
  state = {
    coords: [],
    predictedRoutes: []
  };

  predictedRoutesRefs = {};

  componentDidUpdate(prevProps) {
    const { isCompletedOrder } = this.props;
    const {
      isActiveOrder: isActiveOrderProps,
      isCompletedOrder: isCompletedOrderProps,
      dragEnable: oldDragEnable,
      currentPosition: oldCurrentPosition
    } = prevProps;

    const order = this.getOrder();
    const oldOrder = this.getOrder(prevProps);

    if (isCompletedOrder && !isCompletedOrderProps) {
      const { source, dest, stops } = this.preparePointsList(order);
      const multiplier = this.getMultiplier();
      this.resizeMapToCoordinates([source, dest, ...stops], { top: 100 * multiplier, bottom: 170 * multiplier });
    } else if (!isCompletedOrder) {
      this.changeMapForActiveOrder({
        oldOrder, order, isActiveOrderProps, oldDragEnable, oldCurrentPosition
      });
    }
  }

  changeMapForActiveOrder({ oldOrder, order, isActiveOrderProps, oldDragEnable }) {
    const { dragEnable, isActiveOrder } = this.props;

    if (this.shouldResizeMapToPointsList({ oldOrder, order, oldIsActiveOrder: isActiveOrderProps, isActiveOrder })) {
      const { source, dest, stops } = this.preparePointsList(order);
      setTimeout(() => this.resizeMapToCoordinates([source, dest, ...stops]));
    }

    this.handleAnimateToRegion({ order, oldOrder, dragEnable, oldDragEnable, isActiveOrder, isActiveOrderProps });

    if (this.shouldResizeMapToDriverAndPickupAddress({ oldOrder, order })) {
      this.resizeMapToDriverAndPickupAddress(order);
    }

    if (this.shouldOpenOrderDetails({ oldOrder, order })) {
      setTimeout(this.props.onFutureOrderReceived, 3000);
    }

    if (this.shouldGetDriversLocations({ order, oldOrder })) {
      this.getDriversLocations(order.pickupAddress);
    }

    if (this.gotNewStatus(oldOrder, order, 'locating')) {
      this.createPathsAnimations();
      this.getRandomPaths(order.pickupAddress).then(this.animatePaths);
    } else if (order.status !== 'locating' && this.animationStarted) {
      this.stopPathsAnimation();
    }
  }

  componentWillUnmount() {
    clearInterval(this.getDriversInterval);
    clearInterval(this.pathAnimationInterval);
  }

  getOrder(props = this.props) {
    return props.isPreOrder ? props.bookingForm : props.currentOrder;
  }

  getStops(order = this.getOrder()) {
    return order.stops || order.stopAddresses;
  }

  getDriversLocations = (pickupAddress) => {
    clearInterval(this.getDriversInterval);

    this.props.getDriversLocations(pickupAddress);
    this.props.subscribeToDriversLocations(pickupAddress);

    this.getDriversInterval = setInterval(() => {
      const pickUpAddress = this.getOrder().pickupAddress;

      this.props.subscribeToDriversLocations(pickUpAddress);
    }, pollingInterval);
  };

  animateToRegion = (source) => {
    if (source) {
      this.map.animateToRegion({
        latitudeDelta: LATTITIDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA,
        ...source
      });
    }
  };

  createPathsAnimations = () => {
    this.animationStarted = true;
    this.pathAnimationValue = new Animated.Value(0.1);

    this.pathAnimation = Animated.loop(Animated.sequence([
      Animated.timing(this.pathAnimationValue, { toValue: 1, duration: 1250 }),
      Animated.timing(this.pathAnimationValue, { toValue: 0.1, duration: 1250 })
    ]));
  };

  animatePaths = () => {
    let index = 0;
    this.pathAnimation.start();

    this.pathAnimationValue.addListener(({ value }) => {
      this.state.predictedRoutes.forEach((_, i) => {
        if (this.predictedRoutesRefs[i]) {
          this.predictedRoutesRefs[i].setNativeProps({
            strokeWidth: (value * 2) + 1,
            strokeColor: `rgba(140, 155, 187, ${value})`
          });
        }
      });
    });

    this.pathAnimationInterval = setInterval(() => {
      this.state.predictedRoutes.forEach((r, i) => {
        if (r[index] && this.predictedRoutesRefs[i]) {
          this.predictedRoutesRefs[i].setNativeProps({ coordinates: take(r, index) });
        }
      });
      index += 1;
      if (index > 115) index = 0;
    }, 50);
  };

  stopPathsAnimation = () => {
    this.animationStarted = false;
    this.pathAnimation.stop();
    clearInterval(this.pathAnimationInterval);
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

  shouldOpenOrderDetails = ({ oldOrder, order }) =>
    (this.gotNewStatus(oldOrder, order, ORDER_RECEIVED_STATUS)) && !order.asap;

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

  shouldGetDriversLocations = ({ order, oldOrder }) =>
    order.pickupAddress && order.pickupAddress !== oldOrder.pickupAddress;

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

  renderCurrentMarker = () => <Icon name="currentLocation" size={18} />;

  renderSourceMarker = () => <Icon name="sourceMarker" width={32} height={52} />;

  renderSourceActiveMarker = () => <Icon name="pickUpField" size={16} />;

  renderStopMarker = () => <Icon name="pickUpField" color="#74818f" size={12} />;

  renderDestinationMarker = () => <Icon name="destinationMarker" width={16} height={19} />;

  renderDriverMarker = () => <Icon name="carFacet" size={32} />;

  renderMarker = ({ address, type = 'current', index = '' }) =>
    address && (
      <Map.Marker
        key={type + index}
        coordinate={this.prepareCoordinates(address)}
        anchor={{ x: 0.5, y: 0.5 }}
        stopPropagation
        tracksViewChanges={false}
      >
        {this[`render${upperFirst(type)}Marker`]()}
      </Map.Marker>
    );

  renderInfoMarker = ({ address, title, value, icon }) => (
    address && value && (
      <Map.Marker
        key={`${title}${value}`}
        coordinate={this.prepareCoordinates(address)}
        anchor={{ x: 0.5, y: 1.2 }}
        stopPropagation
        tracksViewChanges={false}
      >
        <View style={styles.infoMarkerContainer}>
          <View style={styles.infoMarker}>
            <Icon style={styles.infoMarkerIcon} name={icon} size={18} color="#d8d8d8" />
            <View>
              <Text style={styles.infoMarkerTitle}>{title}</Text>
              <Text style={styles.infoMarkerValue}>{value}</Text>
            </View>
          </View>
        </View>
      </Map.Marker>
    )
  );

  getPaths = locations => (
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

    return this.getPaths(locations).map(this.renderSinglePath);
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

    return this.getPaths(locations).map(this.renderSinglePath);
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

  getRandomPaths(coord) {
    if (!coord || !coord.lat || !coord.lng) return null;

    const randomCoordinates = getRandomCoordinatesInRadius({ origin: coord, amount: 5, radius: 0.01 });

    return Promise.all(randomCoordinates.map(c => getPathCoordinates(c, coord)))
      .then((res) => {
        this.setState({ predictedRoutes: res.filter(Boolean).map(i =>
          fixPathLength([...i, { latitude: coord.lat, longitude: coord.lng }], 50))
        });
      });
  }

  // eslint-disable-next-line consistent-return
  getGeocode = (region) => {
    const { isPreOrder, dragEnable, changeAddress, onEndLoadingPickup, onStartLoadingPickup, enableDrag } = this.props;

    if (!dragEnable) { return enableDrag(); }

    const order = this.getOrder();

    if (region && isPreOrder && dragEnable && !order.destinationAddress) {
      const coordinates = { lat: normalizeCoordinate(region.latitude), lng: normalizeCoordinate(region.longitude) };

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

  shouldShowETA = ({ order }) => (
    order.driverDetails && order.driverDetails.eta && order.status === DRIVER_ON_WAY
  );

  render() {
    const { currentPosition, isPreOrder, dragEnable, vehicles, drivers, isActiveOrder, isCompletedOrder } = this.props;
    const { predictedRoutes } = this.state;

    const order = this.getOrder();
    const stops = this.getStops();

    return (
      <Map
        ref={(map) => { this.map = map; }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        zoomEnabled
        rotateEnabled={false}
        showsCompass={false}
        mapPadding={{ bottom: !order.destinationAddress && isPreOrder ? 190 : 0 }}
        scrollEnabled={dragEnable}
        customMapStyle={MapStyle}
        onRegionChangeComplete={this.getGeocode}
      >
        {this.renderRidePath()}

        {this.renderDriverPath()}

        {!isActiveOrder && !isCompletedOrder && this.renderMarker({ address: currentPosition })}

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

        {isPreOrder && this.renderInfoMarker({
          address: order.pickupAddress,
          title: 'Journey Time',
          value: vehicles.duration,
          icon: 'journeyTime'
        })}

        {isPreOrder && this.renderInfoMarker({
          address: order.destinationAddress,
          title: 'Distance',
          value: vehicles.distance,
          icon: 'distance'
        })}

        {this.shouldShowETA({ order }) && this.renderInfoMarker({
          address: order.pickupAddress,
          title: 'ETA',
          value: `${order.driverDetails.eta} min`,
          icon: 'journeyTime'
        })}

        {isPreOrder && !order.destinationAddress &&
          <DriversMarkers drivers={drivers} />
        }

        {order.pickupAddress && order.status === 'locating' &&
          predictedRoutes.map((_, i) => (<Polyline key={i} ref={(el) => { this.predictedRoutesRefs[i] = el; }} />))
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
  vehicles: booking.vehicles,
  currentOrder: booking.currentOrder,
  currentPosition: ui.map.currentPosition,
  driverLocation: booking.currentOrder.driverDetails ? booking.currentOrder.driverDetails.location : {},
  status: booking.currentOrder.status || 'connected',
  drivers: ui.map.drivers
});

const mapDispatch = {
  changeAddress,
  subscribeToDriversLocations,
  getDriversLocations
};

export default connect(mapState, mapDispatch, null, { withRef: true })(MapView);
