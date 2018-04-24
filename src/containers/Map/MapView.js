import React, { Component } from 'react';
import { Platform } from 'react-native';
import Map, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeAddress } from 'actions/ui/map';

import config from 'config';

import { Icon } from 'components';

import { LATTITIDE_DELTA, LONGTITUDE_DELTA, geocode, processLocation } from 'utils';
import { ACTIVE_STATUS } from 'utils/orderStatuses';

import MapStyle from './MapStyle';
import styles from './style';

class MapView extends Component {
  componentWillReceiveProps({ fields, isActiveOrder, currentOrder, isCompletedOrder }) {
    const {
      fields: fieldsProps,
      isActiveOrder: isActiveOrderProps,
      isCompletedOrder: isCompletedOrderProps
    } = this.props;

    if (isCompletedOrder && !isCompletedOrderProps) {
      const { source, dest, stops } = this.preparePointsList(currentOrder);

      const multiplier = this.getMultiplier();

      this.resizeMapToCoordinates([source, dest, ...stops], { top: 300 * multiplier, bottom: 100 * multiplier });
    } else if (!isCompletedOrder) {
      if (this.isPathChanged(fields, fieldsProps) ||
        (!isActiveOrder && isActiveOrderProps && fields.destinationAddress)) {
        const { source, dest, stops } = this.preparePointsList(fields);

        this.resizeMapToCoordinates([source, dest, ...stops]);
      }

      if ((fields.pickupAddress !== fieldsProps.pickupAddress
        && !fields.destinationAddress && fieldsProps.pickupAddress)
        || (!fields.destinationAddress && fieldsProps.destinationAddress)
        || (isActiveOrder && !isActiveOrderProps)) {
        const source = this.prepareCoordinates(fields.pickupAddress);

        this.animateToRegion(source);
      }

      // TODO: check after driverLocation channel listen

      // if (driverLocation && driverLocation !== driverLocationProps) {
      //   console.warn(driverLocation)

      //   const dest = this.prepareCoordinates(fields.pickupAddress);
      //   const source = this.prepareCoordinates(driverLocation);

      //   this.resizeMapToCoordinates([source, dest], { top: 100, left: 50, right: 50 });
      // }
    }
  }

  animateToRegion = (source) => {
    this.map.animateToRegion({
      ...source,
      latitudeDelta: LATTITIDE_DELTA,
      longitudeDelta: LONGTITUDE_DELTA
    });
  };

  isPathChanged = (fields, fieldsProps) => (
    (fields.destinationAddress &&
      (fields.destinationAddress !== fieldsProps.destinationAddress ||
        fields.pickupAddress !== fieldsProps.pickupAddress
      )
    )
    || (fields.stops && fields.stops !== fieldsProps.stops)
  );

  resizeMapToCoordinates = (coordinates, params) => {
    const multiplier = this.getMultiplier();

    this.map.fitToCoordinates(coordinates, {
      edgePadding: { top: 200 * multiplier, bottom: 300 * multiplier, left: 100, right: 100, ...params },
      animated: true
    });
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
    const stops = (order.stops || order.stopAddresses || []).map(this.prepareCoordinates);

    return { source, dest, stops };
  };

  renderCurrentMarker = () => <Icon name="currentLocation" size={24} />;

  renderSourceMarker = () => <Icon name="sourceMarker" width={32} height={52} />;

  renderSourceActiveMarker = () => <Icon name="pickUpField" size={32} />;

  renderStopMarker = () => <Icon name="pickUpField" color="#74818f" size={32} />;

  renderDestinationMarker = () => <Icon name="pickUpField" color="#ff0000" size={32} />;

  renderMarker = ({ address, type = 'current', index = '', draggable = false, onDragEnd }) =>
    !this.props.isActiveOrder && address &&
      (<Map.Marker
        key={address.line + index}
        coordinate={this.prepareCoordinates(address)}
        draggable={draggable}
        onDragEnd={onDragEnd}
      >
        {this[`render${type.charAt(0).toUpperCase()}${type.slice(1)}Marker`]()}
      </Map.Marker>);

  // renderPath = () => { // TODO: render after driverLocation channel listen
  //   const { fields, driverLocation, isActiveOrder, status } = this.props;

  //   const isRideInProgress = status === ACTIVE_STATUS;
  //   const isDriverOnWay = status === DRIVER_ON_WAY;
  //   const source = isRideInProgress ? driverLocation : fields.pickupAddress;
  //   const dest = isRideInProgress || !isActiveOrder ? fields.destinationAddress : driverLocation;

  //   return (isDriverOnWay || isRideInProgress || !isActiveOrder) && source && dest &&
  //     <MapViewDirections
  //       origin={this.prepareCoordinates(source)}
  //       destination={this.prepareCoordinates(dest)}
  //       apikey={config.googleAPIKey}
  //       strokeWidth={4}
  //       strokeColor="#2b4983"
  //     />
  // }

  renderRidePath = () => {
    // eslint-disable-next-line
    const { fields: currentFields, isActiveOrder, status, currentOrder, isCurrentOrder } = this.props;

    const fields = isCurrentOrder ? currentOrder : currentFields;

    const isRideInProgress = status === ACTIVE_STATUS;

    const locations = [
      fields.pickupAddress,
      ...(fields.stops || fields.stopAddresses || []),
      fields.destinationAddress
    ];

    const pathes = locations.map((location, index) => {
      const nextIndex = index + 1;

      if (nextIndex < locations.length) return { source: location, destination: locations[nextIndex] };

      return null;
    }).filter(location => location);

    return (isRideInProgress || !isActiveOrder) && fields.destinationAddress && fields.pickupAddress &&
      pathes.map(this.renderSinglePath);
  };

  renderSinglePath = ({ source, destination }) => (
    <MapViewDirections
      key={source.line + destination.line}
      origin={this.prepareCoordinates(source)}
      destination={this.prepareCoordinates(destination)}
      apikey={config.googleAPIKey}
      strokeWidth={4}
      strokeColor="#2b4983"
    />
  );

  getGeocode = (e) => {
    const { isActiveOrder, isCompletedOrder } = this.props;
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const coordinates = { lat: latitude, lng: longitude };

    const isPreorder = !isActiveOrder && !isCompletedOrder;

    if (isPreorder) {
      geocode(coordinates)
        .then(processLocation)
        .then((data) => {
          this.props.changeAddress(data, { type: 'pickupAddress' });
        });
    }
  }

  render() {
    const {
      fields: currentFields,
      currentPosition,
      currentOrder,
      isCurrentOrder,
      isActiveOrder,
      isCompletedOrder
    } = this.props;

    const fields = isCurrentOrder ? currentOrder : currentFields;
    const stops = fields.stops || fields.stopAddresses;

    const isPreorder = !isActiveOrder && !isCompletedOrder;

    return (
      <Map
        ref={(map) => { this.map = map; }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        zoomEnabled
        showsCompass={false}
        customMapStyle={MapStyle}
        onPress={this.getGeocode}
      >
        {this.renderRidePath()}

        {this.renderMarker({ address: currentPosition })}

        {fields.pickupAddress &&
          this.renderMarker({
            address: fields.pickupAddress,
            type: !fields.destinationAddress && isPreorder ? 'source' : 'sourceActive',
            draggable: !fields.destinationAddress && isPreorder,
            onDragEnd: this.getGeocode
          })
        }

        {stops && stops.length > 0 &&
          stops.map((address, index) => this.renderMarker({ address, type: 'stop', index }))
        }

        {fields.destinationAddress &&
          this.renderMarker({ address: fields.destinationAddress, type: 'destination' })
        }

        {/* TODO: show after driverLocation channel listen

        driverLocation &&
          this.renderMarker({ address: driverLocation, type: 'destination' })
        */}
      </Map>
    );
  }
}

MapView.propTypes = {
  isActiveOrder: PropTypes.bool.isRequired,
  isCompletedOrder: PropTypes.bool.isRequired,
  isCurrentOrder: PropTypes.bool.isRequired
};

MapView.defaultProps = {};

const mapState = ({ ui, bookings }) => ({
  fields: ui.map.fields,
  currentOrder: bookings.currentOrder,
  currentPosition: ui.map.currentPosition,
  driverLocation: bookings.currentOrder.driverDetails ? bookings.currentOrder.driverDetails.location : {},
  status: bookings.currentOrder.status || 'connected'
});

export default connect(mapState, { changeAddress }, null, { withRef: true })(MapView);
