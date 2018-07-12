import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'components';

import Marker from './Basic';

class SourceMarker extends React.Component {
  render() {
    const { coordinate } = this.props;

    return (
      <Marker coordinate={coordinate} id="sourceMarker">
        <Icon name="sourceMarker" width={32} height={52} />
      </Marker>
    );
  }
}

SourceMarker.propTypes = {
  coordinate: PropTypes.object.isRequired
};

export default SourceMarker;
