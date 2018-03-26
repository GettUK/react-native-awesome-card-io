import React, { Component } from 'react';
import { View, Animated } from 'react-native';

import { Icon } from 'components';

import assets from 'assets';

import { pointerStyles } from './styles';

export default class Pointer extends Component {
  blinkAnim = new Animated.Value(0.2);

  componentDidMount() {
    this.cycleBlinking();
  }

  cycleBlinking = () => {
    this.blinkAnim.setValue(0);

    Animated.timing(
      this.blinkAnim,
      {
        toValue: 2,
        duration: 1500
      }
    ).start(this.cycleBlinking);
  };

  render() {
    return (
      <View style={pointerStyles.container}>
        <Animated.Image
          source={assets.pointerShadow}
          style={[
            pointerStyles.shadow, {
              opacity: this.blinkAnim.interpolate({
                inputRange: [0.2, 2],
                outputRange: [1, 0]
              }),
              transform: [{ scale: this.blinkAnim }]
            }
          ]}
        />

        <Icon name="pickUpField" size={30} style={pointerStyles.icon} />
      </View>
    );
  }
}
