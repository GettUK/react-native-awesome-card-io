import React from 'react';
import PropTypes from 'prop-types';
import { color } from 'theme';

import { Icon } from 'components';

import Marker from './Basic';

class StopMarker extends React.Component {
  render() {
    const { coordinate } = this.props;

    return (
      <Marker coordinate={coordinate} id="stopMarker">
        <Icon name="pickUpField" color={color.secondaryText} size={12} />
      </Marker>
    );
  }
}

StopMarker.propTypes = {
  coordinate: PropTypes.object.isRequired
};

export default StopMarker;
