import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components';

import Marker from './Basic';

class CurrentLocation extends React.Component {
  render() {
    const { coordinate } = this.props;

    return (
      <Marker coordinate={coordinate} id="currentLocation">
        <Icon name="currentLocation" size={18} />
      </Marker>
    );
  }
}

CurrentLocation.propTypes = {
  coordinate: PropTypes.object.isRequired
};

export default CurrentLocation;
