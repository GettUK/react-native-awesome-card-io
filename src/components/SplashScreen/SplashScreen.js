import React, { Component } from 'react';
import { Animated, Image } from 'react-native';
import { curry } from 'lodash/fp';
import { Icon } from 'components';
import assets from 'assets';
import styles from './styles';

const AnimateTiming = curry((property, toValue) => {
  Animated.timing(property, {
    toValue,
    duration: 500
  }).start();
});

class SplashScreen extends Component {
  state = {
    loaded: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loaded: true });
      AnimateTiming(this.opacity, 0);
    }, 1000);
  }

  opacity = new Animated.Value(1);

  render() {
    return (
      <Animated.View
        style={[styles.container, { opacity: this.opacity }]}
        pointerEvents={this.state.loaded ? 'none' : 'auto'}
      >
        <Image style={styles.image} source={assets.loginBg} />
        <Icon name="logo" width={240} height={70} />
      </Animated.View>
    );
  }
}

export default SplashScreen;
