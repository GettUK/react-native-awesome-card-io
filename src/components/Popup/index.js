import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { isString } from 'lodash';
import { strings } from 'locales';

import styles from './style';

class Popup extends PureComponent {
  static propTypes = {
    containerStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    contentStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    footerStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    title: PropTypes.string
  };

  static defaultProps = {
    containerStyle: {},
    contentStyle: {},
    footerStyle: {},
    title: '',
    content: ''
  };

  state = {
    isVisible: false
  };

  open = () => {
    this.setState({ isVisible: true });
  };

  close = () => {
    this.setState({ isVisible: false });
  };

  renderButton = ({ style, textStyle, onPress, title }, index) => (
    <TouchableOpacity key={index} style={[styles.btn, style]} onPress={onPress || this.close}>
      <Text style={[styles.btnText, textStyle]}>{title || strings('ok').toUpperCase()}</Text>
    </TouchableOpacity>
  );

  render() {
    const { containerStyle, contentStyle, footerStyle, title, titleStyle, content, buttons } = this.props;

    return (
      <Modal
        isVisible={this.state.isVisible}
        style={[styles.container, containerStyle]}
        backdropColor="rgba(40, 71, 132, 0.6)"
      >
        <View style={[styles.content, contentStyle]}>
          {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
          {isString(content)
            ? <Text style={styles.description}>{content}</Text>
            : content
          }
          <View style={[styles.footer, footerStyle]}>
            {buttons ? buttons.map(this.renderButton) : this.renderButton({})}
          </View>
          </View>
      </Modal>
    );
  }
}

export default Popup;
