import React, { PureComponent } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { View as AnimatedView } from 'react-native-animatable';

import { Icon } from 'components';

import { pointerStyles } from './styles';
import circleAnimation from './circleAnimation.json';

const pulseAnimation = {
  0: { scale: 1 },
  0.5: { scale: 1.15 },
  1: { scale: 1 }
};

export default class Pointer extends PureComponent {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View style={pointerStyles.container}>
        <LottieView ref={(el) => { this.animation = el; }} loop source={circleAnimation} />

        <AnimatedView animation={pulseAnimation} iterationCount="infinite" useNativeDriver style={pointerStyles.icon}>
          <Icon name="pickUpField" size={16} />
        </AnimatedView>
      </View>
    );
  }
}
