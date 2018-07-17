import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StatusBar
} from 'react-native';

import { View as AnimatableView } from 'react-native-animatable';

import { Icon, Background } from 'components';

import styles from './style';

const { height, width } = Dimensions.get('window');

const SLIDE_IN_LEFT = { from: { translateX: 0 }, to: { translateX: 86 } };
const FADE_OUT = { from: { opacity: 1 }, to: { opacity: 0 } };

export default class TransitionLoading extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.replace('MapView', { transition: 'loadTransition' });
    }, 3380);
  }

  getScaleAnim = () => ({
    from: { scaleX: 0.01, scaleY: 0.01 }, to: { scaleX: ((width + 40) / 66), scaleY: ((height + 40) / 68) }
  })

  renderAnimation = ({
    name = 'logoLeft',
    animation = SLIDE_IN_LEFT,
    duration = 800,
    delay = 1000,
    useNativeDriver = false,
    style = { height: 68, width: 68 },
    children = <Icon name={name} height={68} width={66} />
  }) => (
    <AnimatableView
      animation={animation}
      duration={duration}
      delay={delay}
      easing="linear"
      useNativeDriver={useNativeDriver}
      style={[{ position: 'absolute' }, style]}
    >
      {children}
    </AnimatableView>
  )

  renderHideAnimation = children => this.renderAnimation({ useNativeDriver: true, children, animation: FADE_OUT })

  renderScaleRectangle = () => (
    this.renderAnimation({
      style: { top: (height / 2) - 34 }, duration: 300, delay: 3100, animation: this.getScaleAnim(), name: 'rectangle'
    })
  )

  render() {
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="light-content" />

        <Background>
          <View style={styles.container}>
            <View style={styles.logoRow}>
              {this.renderAnimation({ useNativeDriver: true })}
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
