import React from 'react';
import { Animated } from 'react-native';

export default class FadeInView extends React.Component {
  fadeAnim = new Animated.Value(0);

  componentDidMount() {
    Animated.timing(
      this.fadeAnim,
      {
        toValue: 1,
        duration: 600
      }
    ).start();
  }

  render() {
    const { style, reverse, children } = this.props;
    return (
      <Animated.View
        style={{
          ...style,
          opacity: this.fadeAnim,
          transform: [{
            translateY: this.fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [reverse ? -20 : 20, 0]
            })
          }]
        }}
      >
        {children}
      </Animated.View>
    );
  }
}
