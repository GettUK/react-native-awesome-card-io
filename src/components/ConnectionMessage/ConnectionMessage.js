import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import { View as AnimatableView } from 'react-native-animatable';

import { strings } from 'locales';

import { isIphoneX } from 'utils';

import styles from './styles';

class ConnectionMessage extends PureComponent {
  state = {
    animation: {}
  }

  show = () => {
    this.animate({ isHide: false });
  };

  hide = () => {
    this.animate({ isHide: true });
  };

  animate = ({ isHide }) => {
    const size = isIphoneX() ? 100 : 80;
    const height = isHide ? 0 : size;
    const animation = { height };
    this.setState({ animation });
  };

  onLayout = (e) => {
    this.props.onLayout(e.nativeEvent.layout);
  };

  render() {
    return (
      <AnimatableView
        transition={['height']}
        onLayout={this.onLayout}
        duration={400}
        easing="linear"
        style={[styles.container, this.state.animation]}
      >
        <View style={styles.messageContainer}>
          <View style={styles.messageWrapper}>
            <Text style={styles.message}>{strings('connection.text.serviceFailure')}</Text>
            <Text style={styles.message}>{strings('connection.text.checkYourConnection')}</Text>
          </View>
        </View>
      </AnimatableView>
    );
  }
}

export default ConnectionMessage;
