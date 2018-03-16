import React, { Component } from 'react';
import { View } from 'react-native';
import Map, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeRegionPosition } from 'actions/ui/map';

import { Icon } from 'components';

import styles from './style';

class MapView extends Component {
  componentWillReceiveProps({ fields }) {
    const { fields: fieldsProps } = this.props;

    if (fields.destinationAddress !== fieldsProps.destinationAddress && fields.destinationAddress
      || fields.stops !== fieldsProps.stops
      || fields.pickupAddress !== fieldsProps.pickupAddress && fields.destinationAddress) {
      const source = this.prepareCoordinates(fields.pickupAddress);
      const dest = this.prepareCoordinates(fields.destinationAddress);
      const stops = (fields.stops || []).map(stop => (this.prepareCoordinates(stop.address)));

      this.map.fitToCoordinates([
        source,
        dest,
        ...stops
      ], { edgePadding: { top: 200, bottom: 300, left: 100, right: 100 }, animated: true });
    }

    if (fields.pickupAddress !== fieldsProps.pickupAddress && !fields.destinationAddress) {
      const source = this.prepareCoordinates(fields.pickupAddress);

      this.map.animateToCoordinate(source)
    }
  }

  prepareCoordinates = (address) => {
    return address.lat &&  address.lng
      ? {
        latitude: address.lat,
        longitude: address.lng
      }
      : address;
  }

  renderCurrentMarker = () => {
    return <Icon
      name="currentLocation"
      size={24}
    />;
  }

  renderSourceMarker = () => {
    return <Icon
      name="sourceMarker"
      width={32}
      height={52}
    />;
  }

  renderSourceActiveMarker = () => {
    return <Icon
      name="pickUpField"
      width={32}
      height={32}
    />;
  }

  renderStopMarker = () => {
    return <Icon
      name="pickUpField"
      color="#74818f"
      width={32}
      height={32}
    />;
  }

  renderDestinationMarker = () => {
    return <Icon
      name="pickUpField"
      color="#ff0000"
      height={32}
      width={32}
    />;
  }

  renderMarker = ({ address, type = 'current' }) => {
    return !this.props.isActiveOrder &&
      (<Map.Marker coordinate={this.prepareCoordinates(address)}>
        {this[`render${type.charAt(0).toUpperCase()}${type.slice(1)}Marker`]()}
      </Map.Marker>);
  }

  render() {
    const { fields, currentPosition, regionPosition } = this.props;

    return (
      <Map
        ref={map => this.map = map}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        zoomEnabled
        onRegionChangeComplete={this.props.changeRegionPosition}
        region={regionPosition}
      >
        {this.renderMarker({ address: currentPosition })}

        {fields.pickupAddress
          && this.renderMarker({ address: fields.pickupAddress, type: fields.destinationAddress ? 'sourceActive' : 'source' })}

        {fields.stops && fields.stops.map(stop => (
          stop.address && this.renderMarker({ address: stop.address, type: 'stop' })
        ))}

        {fields.destinationAddress
          && this.renderMarker({ address: fields.destinationAddress, type: 'destination' })}
      </Map>
    );
  }
};

MapView.propTypes = {
  isActiveOrder: PropTypes.bool.isRequired
};

MapView.defaultProps = {};

const mapState = ({ ui, bookings }) => ({
  fields: ui.map.fields,
  currentPosition: ui.map.currentPosition,
  regionPosition: ui.map.regionPosition
});

const mapDispatch = {
  changeRegionPosition
};

export default connect(mapState, mapDispatch)(MapView);
