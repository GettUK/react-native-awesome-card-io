import React, { Component } from 'react';
import { View, ImageBackground, Animated } from 'react-native';
import PropTypes from 'prop-types';

import { Icon } from 'components';

import assets from 'assets';

import { pointerStyles } from './styles';

class Pointer extends Component {
  blinkAnim = new Animated.Value(30);

  componentDidMount() {
    this.cycleBlinking();
  }

  cycleBlinking = () => {
    this.blinkAnim.setValue(30);

    Animated.timing(
      this.blinkAnim,
      {
        toValue: 200,
        duration: 1500
      }
    ).start(this.cycleBlinking);
  }

  render() {
    return (
      <View style={pointerStyles.container}>
        <Animated.Image
          source={assets.pointerShadow}
          style={[
            pointerStyles.shadow, {
              height: this.blinkAnim,
              width: this.blinkAnim,
              opacity: this.blinkAnim.interpolate({
                inputRange: [30, 200],
                outputRange: [1, 0]
              })
            }
          ]}
        />

        <Icon name="pickUpField" size={30} style={pointerStyles.icon} />
      </View>
    );
  }
};

export default Pointer;
