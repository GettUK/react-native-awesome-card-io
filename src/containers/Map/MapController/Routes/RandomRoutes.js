import React from 'react';
import { Animated } from 'react-native';
import { Polyline } from 'react-native-maps';
import { take } from 'lodash';

import { LOCATING_STATUS } from 'utils/orderStatuses';

import { getPathCoordinates, fixPathLength, getRandomCoordinatesInRadius } from './utils';

class RandomRoutes extends React.Component {
  state = {
    predictedRoutes: []
  };

  predictedRoutesRefs = {};

  componentDidMount() {
    const { order } = this.props;

    if (order.status === LOCATING_STATUS) {
      this.initializeAnimation();
    }
  }

  componentDidUpdate({ order: oldOrder }) {
    const { order } = this.props;

    if (this.gotNewStatus(oldOrder, order, LOCATING_STATUS)) {
      this.initializeAnimation();
    } else if (order.status !== LOCATING_STATUS && this.animationStarted) {
      this.stopPathsAnimation();
    }
  }

  componentWillUnmount() {
    this.stopPathsAnimation();
  }

  gotNewStatus = (oldOrder, order, status) =>
    oldOrder.status !== status && order.status === status;

  initializeAnimation = () => {
    this.createPathsAnimations();
    this.getRandomPaths(this.props.order.pickupAddress).then(this.animatePaths);
  }

  animatePaths = () => {
    let index = 0;
    this.pathAnimation.start();

    this.pathAnimationValue.addListener(({ value }) => {
      this.state.predictedRoutes.forEach((_, i) => {
        if (this.predictedRoutesRefs[i]) {
          this.predictedRoutesRefs[i].setNativeProps({
            strokeWidth: (value * 2) + 1,
            strokeColor: `rgba(140, 155, 187, ${value})`
          });
        }
      });
    });

    this.pathAnimationInterval = setInterval(() => {
      this.state.predictedRoutes.forEach((r, i) => {
        if (r[index] && this.predictedRoutesRefs[i]) {
          this.predictedRoutesRefs[i].setNativeProps({ coordinates: take(r, index) });
        }
      });
      index += 1;
      if (index > 50) index = 0;
    }, 50);
  };

  getRandomPaths(coord) {
    if (!coord || !coord.lat || !coord.lng) return null;

    const randomCoordinates = getRandomCoordinatesInRadius({ origin: coord, amount: 5, radius: 0.01 });

    return Promise.all(randomCoordinates.map(c => getPathCoordinates(c, coord)))
      .then((res) => {
        this.setState({ predictedRoutes: res.filter(Boolean).map(i =>
          fixPathLength([...i, { latitude: coord.lat, longitude: coord.lng }], 50))
        });
      });
  }

  createPathsAnimations = () => {
    this.animationStarted = true;
    this.pathAnimationValue = new Animated.Value(0.1);

    this.pathAnimation = Animated.loop(Animated.sequence([
      Animated.timing(this.pathAnimationValue, { toValue: 1, duration: 1250 }),
      Animated.timing(this.pathAnimationValue, { toValue: 0.1, duration: 1250 })
    ]));
  };

  stopPathsAnimation = () => {
    this.animationStarted = false;
    if (this.pathAnimation) this.pathAnimation.stop();
    clearInterval(this.pathAnimationInterval);
  };

  render() {
    const { order } = this.props;
    const { predictedRoutes } = this.state;

    return order.pickupAddress && order.status === LOCATING_STATUS &&
      predictedRoutes.map((_, i) => (
        <Polyline key={i} coordinates={[]} ref={(el) => { if (el) { this.predictedRoutesRefs[i] = el; } } } />
      ));
  }
}

export default RandomRoutes;
