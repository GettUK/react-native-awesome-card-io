import React from 'react';
import { Dimensions } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';

const DURATION = 800;
const DELAY = 1000;

export default class TransitionView extends React.Component {
  render() {
    const { style, value, children } = this.props;
    const { height } = Dimensions.get('window');
    return (
      <AnimatableView
        pointerEvents="box-none"
        animation={{ from: { translateY: value || height }, to: { translateY: 0 } }}
        duration={DURATION}
        delay={DELAY}
        easing="linear"
        useNativeDriver
        style={{
          ...style,
          width: '100%'
        }}
      >
        {children}
      </AnimatableView>
    );
  }
}
