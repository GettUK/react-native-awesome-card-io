import React, { Component } from 'react';
import {
  View,
  Animated,
  Dimensions,
  StatusBar
} from 'react-native';

import { Icon, Background } from 'components';

import styles from './style';

const { height, width } = Dimensions.get('window');

export default class TransitionLoading extends Component {
  fadeAnim = new Animated.Value(0);

  scaleAnim = new Animated.Value(0);

  componentDidMount() {
    Animated.timing(
      this.fadeAnim,
      {
        toValue: 1,
        duration: 800,
        delay: 1000
      }
    ).start();

    Animated.timing(
      this.scaleAnim,
      {
        toValue: 20,
        duration: 300,
        delay: 3100
      }
    ).start();

    setTimeout(() => {
      this.props.navigation.navigate('MapView', { transition: 'loadTransition' });
    }, 3380);
  }

  renderHideAnimation = children => (
    <Animated.View
      style={{
        opacity: this.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0]
        })
      }}
    >
      {children}
    </Animated.View>
  )

  renderLeftIcon = () => (
    <Animated.View
      style={{
        transform: [{
          translateX: this.fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 86]
          })
        }]
      }}
    >
      <Icon name="logoLeft" height={68} width={66} />
    </Animated.View>
  )

  renderScaleRectangle = () => (
    <Animated.View
      style={{
        position: 'absolute',
        top: (height / 2) - 34,
        opacity: this.scaleAnim,
        transform: [{
          scaleX: this.scaleAnim.interpolate({
            inputRange: [0, 20],
            outputRange: [1, (width + 40) / 66]
          })
        },
        {
          scaleY: this.scaleAnim.interpolate({
            inputRange: [0, 20],
            outputRange: [1, (height + 40) / 68]
          })
        }]
      }}
    >
      <Icon name="rectangle" height={68} width={66} />
    </Animated.View>
  )

  render() {
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="light-content" />

        <Background>
          <View style={styles.container}>
            <View style={styles.logoRow}>
              {this.renderLeftIcon()}
              {this.renderHideAnimation(<Icon name="line" height={68} />)}
              {this.renderHideAnimation(<Icon name="logoRight" height={70} width={133} />)}
            </View>

            {this.renderScaleRectangle()}
          </View>
        </Background>
      </View>
    );
  }
}
