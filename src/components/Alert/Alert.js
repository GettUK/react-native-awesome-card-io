import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import { View as AnimatableView } from 'react-native-animatable';

import { Icon } from 'components';

import { strings } from 'locales';

import styles, { height } from './styles';

class Alert extends PureComponent {
  state = {
    animation: {
      opacity: 1,
      top: this.props.position && this.props.position === 'bottom' ? 2000 : -120
    }
  };

  show = () => {
    this.animate({ isHide: false });

    this.timeout = setTimeout(() => {
      this.hide();
    }, this.props.delay);
  };

  hide = () => {
    this.animate({ isHide: true });

    if (this.props.onClose) this.props.onClose();
    clearTimeout(this.timeout);
  };

  animate = ({ isHide }) => {
    const isBottom = this.props.position === 'bottom';
    const actualOffset = isBottom ? 130 : 0;
    const alertPosition = isBottom ? (height - actualOffset) : actualOffset;
    const multiplier = isBottom ? 1 : -1;
    const opacity = isHide ? 0 : 1;
    const top = isHide ? (alertPosition + 120) * multiplier : alertPosition * multiplier;

    this.setState({ animation: { opacity, top } });
  };

  render() {
    const { type, message, position } = this.props;
    return (
      <AnimatableView
        pointerEvents="box-none"
        duration={400}
        transition={['opacity', 'top']}
        style={[
          styles.container,
          styles[`container${position}`],
          this.state.animation
        ]}
      >
        <View style={[styles.messageContainer, styles[`messageContainer${type}`]]}>
          <Icon name={type} width={40} height={40} />

          <Text style={styles.message}>
            <Text style={styles.title}>{`${strings(`alert.status.${type}`)}. `}</Text>
            {message && <Text>{message}</Text>}
          </Text>

          <TouchableWithoutFeedback onPress={this.hide}>
            <View style={styles.icon}>
              <Icon name="close" width={30} height={30} color="#d2dadc" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </AnimatableView>
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
