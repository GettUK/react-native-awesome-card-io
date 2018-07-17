import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components';

import Marker from './Basic';

class SourceActiveMarker extends React.Component {
  render() {
    const { coordinate } = this.props;

    return (
      <Marker coordinate={coordinate} id="pickUpField">
        <Icon name="pickUpField" size={16} />
      </Marker>
    );
  }
}

SourceActiveMarker.propTypes = {
  coordinate: PropTypes.object.isRequired
};

export default SourceActiveMarker;
