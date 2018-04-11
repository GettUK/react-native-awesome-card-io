import React, { PureComponent } from 'react';
import { Animated, View, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import { Icon } from 'components';

import { strings } from 'locales';

import styles from './styles';

class Alert extends PureComponent {
  alertAnim = new Animated.Value(0);

  show = () => {
    this.alertAnim.setValue(0);

    this.animate(1);

    this.timeout = setTimeout(() => {
      this.hide();
    }, this.props.delay);
  };

  hide = () => {
    this.animate(0);

    clearTimeout(this.timeout);
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

  render() {
    const { type, message, position } = this.props;

    return (
      <Animated.View
        style={[
          styles.container,
          styles[`container${position}`],
          {
            opacity: this.alertAnim,
            transform: [{
              translateY: this.alertAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [position === 'bottom' ? 120 : -120, 0]
              })
            }]
          }
        ]}
      >
        <View style={[styles.messageContainer, styles[`messageContainer${type}`]]}>
          <Icon name={type} width={40} height={40} />

          <Text style={styles.message}>
            <Text style={styles.title}>{`${strings(`alerts.${type}`)}. `}</Text>
            {message && <Text>{message}</Text>}
          </Text>

          <TouchableWithoutFeedback onPress={this.hide}>
            <View style={styles.icon}>
              <Icon name="close" width={30} height={30} color="#d2dadc" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Animated.View>
    );
  }
}

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'failed', 'info']),
  position: PropTypes.oneOf(['top', 'bottom']),
  message: PropTypes.string,
  delay: PropTypes.number
};

Alert.defaultProps = {
  type: 'info',
  position: 'top',
  message: '',
  delay: 5000
};

export default Alert;
