import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  DriverMarker,
  SourceActiveMarker,
  ETAMarker,
  StopMarker,
  DestinationMarker
} from '../Markers';

import Route from './Route';
import { getRoutes } from './utils';

const Destinations = {
  source: SourceActiveMarker,
  eta: ETAMarker,
  destination: DestinationMarker
};

class DriverRoute extends React.Component {
  render() {
    const { source, destination, routeHidden, destinationType, stops } = this.props;

    const Destination = Destinations[destinationType];

    return (
      <Fragment>
        <DriverMarker coordinate={source} />
        <Destination coordinate={destination} value={destination.value} />
        {stops.map(stop => <StopMarker coordinate={stop} key={stop} />)}
        {!routeHidden &&
          getRoutes({ source, destination, stops }).map((coords, i) =>
            <Route key={i} source={coords.source} destination={coords.destination} />)}
      </Fragment>
    );
  }
}

DriverRoute.propTypes = {
  destinationType: PropTypes.oneOf(['source', 'eta', 'destination']),
  source: PropTypes.object.isRequired,
  destination: PropTypes.object.isRequired,
  stops: PropTypes.array,
  routeHidden: PropTypes.bool
};

DriverRoute.defaultProps = {
  stops: [],
  destinationType: 'source',
  routeHidden: false
};

export default DriverRoute;
