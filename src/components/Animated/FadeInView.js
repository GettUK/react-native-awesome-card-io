import React from 'react';
import { Animated } from 'react-native';

export default class FadeInView extends React.Component {
  fadeAnim = new Animated.Value(0);

  componentDidMount() {
    Animated.timing(
      this.fadeAnim,
      {
        toValue: 1,
        duration: 600,
      }
    ).start();
  }

  render() {
    return (
      <Animated.View
        style={{
          ...this.props.style,
          opacity: this.fadeAnim,
          transform: [{
            translateY: this.fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [this.props.reverse ? -20 : 20, 0]
            }),
          }],
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
