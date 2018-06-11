import React from 'react';
import { Animated, Dimensions } from 'react-native';

export default class TransitionView extends React.Component {
  fadeAnim = new Animated.Value(0);

  componentDidMount() {
    Animated.timing(
      this.fadeAnim,
      {
        toValue: 1,
        duration: 800,
        delay: 1000
      }
    ).start();
  }

  render() {
    const { style, value, children } = this.props;
    const { height } = Dimensions.get('window');

    return (
      <Animated.View
        pointerEvents="box-none"
        style={{
          ...style,
          width: '100%',
          transform: [{
            translateY: this.fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [value || height, 0]
            })
          }
        ]
        }}
      >
        {children}
      </Animated.View>
    );
  }
}
