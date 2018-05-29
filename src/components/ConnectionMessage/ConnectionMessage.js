import React, { PureComponent } from 'react';
import { Animated, View, Text } from 'react-native';

import { strings } from 'locales';

import { isIphoneX } from 'utils';

import styles from './styles';

class ConnectionMessage extends PureComponent {
  alertAnim = new Animated.Value(0);

  show = () => {
    this.alertAnim.setValue(0);

    this.animate(isIphoneX() ? 100 : 80);
  };

  hide = () => {
    this.animate(0);
  };

  animate = (toValue) => {
    Animated.timing(
      this.alertAnim,
      {
        toValue,
        duration: 400
      }
    ).start();
  };

  onLayout = (e) => {
    this.props.onLayout(e.nativeEvent.layout);
  };

  render() {
    return (
      <Animated.View
        onLayout={this.onLayout}
        style={[styles.container, { height: this.alertAnim, opacity: this.alertAnim }]}
      >
        <View style={styles.messageContainer}>
          <View style={styles.messageWrapper}>
            <Text style={styles.message}>{strings('connection.errorHeader')}</Text>
            <Text style={styles.message}>{strings('connection.errorMessage')}</Text>
          </View>
        </View>
      </Animated.View>
    );
  }
}

export default ConnectionMessage;
