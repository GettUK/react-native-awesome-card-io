

import React from 'react';
import PropTypes from 'prop-types';
import MapViewDirections from 'react-native-maps-directions';

import config from 'config';

import { prepareCoordinates } from 'utils';

class Route extends React.Component {
  render() {
    const { source, destination } = this.props;

    return (
      <MapViewDirections
        key={source.line + destination.line}
        origin={prepareCoordinates(source)}
        destination={prepareCoordinates(destination)}
        apikey={config.googleAPIKey}
        strokeWidth={3}
        resetOnChange={false}
        strokeColor="#2b4983"
      />
    );
  }
}

Route.propTypes = {
  source: PropTypes.object.isRequired,
  destination: PropTypes.object.isRequired
};

export default Route;
