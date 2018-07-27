import React, { Fragment, PureComponent } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import { isEqual, takeRight } from 'lodash';
import Map, { Polyline } from 'react-native-maps';
import { prepareCoordinates, areCoordinatesSimilar } from 'utils';

import {
  DriverMarker,
  SourceActiveMarker,
  ETAMarker,
  StopMarker,
  DestinationMarker
} from '../Markers';

import Route from './Route';
import { getPathCoordinates, getRoutes } from './utils';

const destinations = {
  source: SourceActiveMarker,
  eta: ETAMarker,
  destination: DestinationMarker
};

const animationDuration = 10000;

class DriverRoute extends PureComponent {
  constructor(props) {
    super(props);
    this.driverCoordinate = new Map.AnimatedRegion(prepareCoordinates(props.source));
    this.state = {
      source: props.source
    };
  }

  componentDidUpdate() {
    const { source } = this.state;
    const { source: sourceProps } = this.props;
    if (!isEqual(sourceProps, source) && !areCoordinatesSimilar(sourceProps, source) && !this.animationStarted) {
      this.animationStarted = true;
      getPathCoordinates(source, sourceProps, 'driving')
        .then(res => this.animateDriverToRoute(res))
        .then(() => this.setState({ source: sourceProps }));
    }
  }

  componentWillUnmount() {
    this.stopAnimation();
  }

  stopAnimation = () => {
    clearInterval(this.pathAnimationInterval);
    this.animationStarted = false;
  };

  animateDriverToRoute = (coords) => {
    clearInterval(this.pathAnimationInterval);
    const animations = coords.map(c =>
      this.driverCoordinate.timing({ ...prepareCoordinates(c), duration: animationDuration / coords.length }));
    Animated.sequence(animations).start();

    let index = coords.length;

    this.pathAnimationInterval = setInterval(() => {
      this.route.setNativeProps({ coordinates: takeRight(coords, index) });
      if (index === 0) this.stopAnimation();
      index -= 1;
    }, animationDuration / coords.length);
  };

  render() {
    const { destination, routeHidden, destinationType, stops } = this.props;
    const { source } = this.state;

    const Destination = destinations[destinationType];

    return (
      <Fragment>
        <DriverMarker coordinate={this.driverCoordinate} />
        <Polyline coordinates={[]} ref={(el) => { this.route = el; } } strokeWidth={3} strokeColor="#2b4983" />
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
