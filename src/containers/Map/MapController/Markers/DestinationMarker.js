import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components';

import Marker from './Basic';

class DestinationMarker extends React.Component {
  render() {
    const { coordinate } = this.props;

    return (
      <Marker coordinate={coordinate} key="destinationMarker">
        <Icon name="destinationMarker" width={16} height={19} />
      </Marker>
    );
  }
}

DestinationMarker.propTypes = {
  coordinate: PropTypes.object.isRequired
};

export default DestinationMarker;
