import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Image, View } from 'react-native';
import { curry } from 'lodash/fp';
import { Icon } from 'components';
import assets from 'assets';
import styles from './style';

const AnimateTiming = curry((property, toValue) => {
  Animated.timing(property, {
    toValue: toValue ? 0 : 1,
    duration: 1000
  }).start();
});

class SplashScreen extends Component {
  state = {
    opacity: new Animated.Value(1)
  };
  componentWillMount() {
    setTimeout(
      () => AnimateTiming(this.state.opacity, this.props.loaded),
      1000
    );
  }
  componentWillReceiveProps(newProps) {
    AnimateTiming(this.state.opacity, newProps.loaded);
  }

  render() {
    return (
      <Animated.View
        style={[styles.container, { opacity: this.state.opacity }]}
        pointerEvents={this.props.loaded ? 'none' : 'auto'}>
        <Image style={styles.image} source={assets.loginBg} />
        <View style={styles.containerLogo}>
          <Icon name="logo" width={250} height={60} fill="#fff" />
        </View>
      </Animated.View>
    );
  }
}

SplashScreen.propTypes = {
  loaded: PropTypes.bool.isRequired
};
SplashScreen.defaultProps = {
  loaded: false
};
export default SplashScreen;
