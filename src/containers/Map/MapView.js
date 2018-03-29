import React, { Component } from 'react';
import Map, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeRegionPosition } from 'actions/ui/map';

import { Icon } from 'components';

import { LATTITIDE_DELTA, LONGTITUDE_DELTA } from 'utils';

import styles from './style';

class MapView extends Component {
  componentWillReceiveProps({ fields, isActiveOrder }) {
    const { fields: fieldsProps, isActiveOrder: isActiveOrderProps } = this.props;

    if (this.isPathChanged(fields, fieldsProps)) {
      const source = this.prepareCoordinates(fields.pickupAddress);
      const dest = this.prepareCoordinates(fields.destinationAddress);
      const stops = (fields.stops || []).map(stop => (this.prepareCoordinates(stop.address)));

      this.map.fitToCoordinates([
        source,
        dest,
        ...stops
      ], { edgePadding: { top: 200, bottom: 300, left: 100, right: 100 }, animated: true });
    }

    if ((fields.pickupAddress !== fieldsProps.pickupAddress && !fields.destinationAddress)
      || (isActiveOrder && !isActiveOrderProps)) {
      const source = this.prepareCoordinates(fields.pickupAddress);

      this.map.animateToRegion({
        ...source,
        latitudeDelta: LATTITIDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA
      });
    }
  }

  isPathChanged = (fields, fieldsProps) => (
    (fields.destinationAddress &&
      (fields.destinationAddress !== fieldsProps.destinationAddress ||
        fields.pickupAddress !== fieldsProps.pickupAddress
      )
    )
    || (fields.stops && fields.stops !== fieldsProps.stops)
  );

  prepareCoordinates = address => (
    address.lat && address.lng
      ? { latitude: address.lat, longitude: address.lng }
      : address
  );

  renderCurrentMarker = () => <Icon name="currentLocation" size={24} />;

  renderSourceMarker = () => <Icon name="sourceMarker" width={32} height={52} />;

  renderSourceActiveMarker = () => <Icon name="pickUpField" size={32} />;

  renderStopMarker = () => <Icon name="pickUpField" color="#74818f" size={32} />;

  renderDestinationMarker = () => <Icon name="pickUpField" color="#ff0000" size={32} />;

  renderMarker = ({ address, type = 'current' }) =>
    !this.props.isActiveOrder &&
      (<Map.Marker coordinate={this.prepareCoordinates(address)}>
        {this[`render${type.charAt(0).toUpperCase()}${type.slice(1)}Marker`]()}
      </Map.Marker>);

  render() {
    const { fields, currentPosition, regionPosition, changeRegionPosition } = this.props;

    return (
      <Map
        ref={(map) => { this.map = map; }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        zoomEnabled
        onRegionChangeComplete={changeRegionPosition}
        region={regionPosition}
      >
        {this.renderMarker({ address: currentPosition })}

        {fields.pickupAddress &&
          this.renderMarker({
            address: fields.pickupAddress,
            type: fields.destinationAddress ? 'sourceActive' : 'source'
          })
        }

        {fields.stops && fields.stops.map(stop => (
          stop.address && this.renderMarker({ address: stop.address, type: 'stop' })
        ))}

        {fields.destinationAddress &&
          this.renderMarker({ address: fields.destinationAddress, type: 'destination' })
        }
      </Map>
    );
  }
}

MapView.propTypes = {
  isActiveOrder: PropTypes.bool.isRequired
};

MapView.defaultProps = {};

const mapState = ({ ui }) => ({
  fields: ui.map.fields,
  currentPosition: ui.map.currentPosition,
  regionPosition: ui.map.regionPosition
});

const mapDispatch = {
  changeRegionPosition
};

export default connect(mapState, mapDispatch)(MapView);
