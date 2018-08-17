import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { isString } from 'lodash';

import { strings } from 'locales';

import { withTheme } from 'providers';

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
    title: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
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
      <Text style={[styles.btnText, textStyle]}>{title || strings('alert.button.ok').toUpperCase()}</Text>
    </TouchableOpacity>
  );

  renderContent = () => {
    const { theme, contentStyle, titleStyle, contentWraperStyle,
      footerStyle, title, content, buttons, icon } = this.props;

    return (
      <View style={[styles.content, { backgroundColor: theme.color.bgPrimary }, contentWraperStyle]}>
        {icon}
        {isString(title) && <Text style={[styles.title, { color: theme.color.primaryBtns }, titleStyle]}>{title}</Text>}
        {isString(content)
          ? <Text style={[styles.description, contentStyle, { color: theme.color.primaryText }]}>{content}</Text>
          : content
        }
        <View style={[styles.footer, footerStyle]}>
          {buttons ? buttons.map(this.renderButton) : this.renderButton({})}
        </View>
      </View>
    );
  };

  render() {
    const { containerStyle, theme } = this.props;

    return (
      <Modal
        isVisible={this.state.isVisible}
        style={[styles.container, containerStyle]}
        backdropColor={theme.color.backdrop}
      >
        {this.renderContent()}
      </Modal>
    );
  }
}

export default withTheme(Popup);
