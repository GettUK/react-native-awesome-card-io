import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components';

import Marker from './Basic';

const carTypes = {
  BlackTaxi: 'blackTaxi',
  BlackTaxiXL: 'blackTaxiXL'
};

class DriverMarker extends React.Component {
  render() {
    const { coordinate, nightMode, type, innerRef, ...rest } = this.props;

    return (
      <Marker coordinate={coordinate} id="driverMarker" animated innerRef={innerRef} {...rest}>
        <Icon name={`${carTypes[type] || 'car'}${nightMode ? 'NightMode' : ''}`} width={36} height={80} />
      </Marker>
    );
  }
}

DriverMarker.propTypes = {
  coordinate: PropTypes.object.isRequired
};

export default DriverMarker;
