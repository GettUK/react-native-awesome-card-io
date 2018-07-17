import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components';

import Marker from './Basic';

class DriverMarker extends React.Component {
  render() {
    const { coordinate } = this.props;

    return (
      <Marker coordinate={coordinate} id="driverMarker">
        <Icon name="carFacet" size={32} />
      </Marker>
    );
  }
}

DriverMarker.propTypes = {
  coordinate: PropTypes.object.isRequired
};

export default DriverMarker;
