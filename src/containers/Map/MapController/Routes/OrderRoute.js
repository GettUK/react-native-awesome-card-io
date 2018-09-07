import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  SourceActiveMarker,
  ETAMarker,
  JourneyTimeMarker,
  DistanceMarker,
  DestinationMarker,
  StopMarker
} from '../Markers';

import Route from './Route';
import { getRoutes } from './utils';

const Sources = {
  default: SourceActiveMarker,
  eta: ETAMarker,
  journey: JourneyTimeMarker
};

const Destinations = {
  default: DestinationMarker,
  distance: DistanceMarker
};

class OrderRoute extends React.Component {
  render() {
    const { source, sourceType, destination, destinationType, stops } = this.props;

    const Source = Sources[sourceType];
    const Destination = Destinations[destinationType];

    const processedStops = stops.map(s => s.address || s);

    return (
      <Fragment>
        <Source coordinate={source} value={source.value} />
        <Destination coordinate={destination} value={destination.value} />
        {processedStops.map(stop => <StopMarker coordinate={stop} key={stop.line} />)}
        {getRoutes({ source, destination, stops: processedStops }).map((coords, i) =>
          <Route key={i} source={coords.source} destination={coords.destination} />)}
      </Fragment>
    );
  }
}

OrderRoute.propTypes = {
  sourceType: PropTypes.oneOf(['default', 'eta', 'journey']),
  destinationType: PropTypes.oneOf(['default', 'distance']),
  source: PropTypes.object.isRequired,
  destination: PropTypes.object.isRequired,
  stops: PropTypes.array
};

OrderRoute.defaultProps = {
  stops: [],
  sourceType: 'default',
  destinationType: 'default'
};

export default OrderRoute;
