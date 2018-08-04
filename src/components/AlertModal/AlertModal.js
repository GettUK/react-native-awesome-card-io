import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import { Popup } from '../Popup';

import styles from './style';

class AlertModal extends PureComponent {
  constructor(props) {
    super(props);
    AlertModal.context = this;
  }

  state = {
    title: '',
    message: ''
  };

  hide = () => { this.popup.close(); };

  closeWrapper = callback => () => {
    this.hide();
    if (callback) callback();
  };

  static show(theme, title, message, desiredButtons) {
    const defaultButton = { title: '', textStyle: {}, onPress: () => {} };
    const buttons = desiredButtons.map((item) => {
      const isCancelStyle = item.style && item.style === 'cancel';
      const style = isCancelStyle ? [styles.btnCancelStyle, { backgroundColor: theme.color.bgSecondary }] : {};
      const textStyle = isCancelStyle ? styles.btnTextStyle : {};
      const onPress = AlertModal.context.closeWrapper(item.onPress);

      return { ...defaultButton, ...item, style, textStyle, onPress };
    });
    const messageStyle = { color: theme.color.secondaryText };

    AlertModal.context.setState({ title, message, buttons, messageStyle }, AlertModal.context.popup.open);
  }

  render() {
    const { title, message, messageStyle, buttons } = this.state;

    return (
      <View style={styles.container}>
        <Popup
          innerRef={(popup) => { this.popup = popup; }}
          title={title}
          titleStyle={styles.titleStyle}
          contentStyle={styles.contentStyle}
          buttons={buttons}
          content={(
            message &&
            <View style={styles.messageWrapper}>
              <Text style={[styles.messageStyle, messageStyle]}>
                {message}
              </Text>
            </View>
          )}
        />
      </View>
    );
  }
}

export default AlertModal;
