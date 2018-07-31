import React, { PureComponent } from 'react';
import { View, Text, Platform, Switch, TouchableWithoutFeedback } from 'react-native';
import { noop } from 'lodash';
import { color, formattedColor } from 'theme';
import styles from './style';

export default class SwitchItem extends PureComponent {
  static defaultProps = {
    value: false,
    onLinkPress: () => noop,
    onValueChange: () => noop,
    onTintColor: color.success,
    tintColor: formattedColor.white.opacity(0.2),
    thumbTintColor: Platform.OS === 'android' ? color.white : null
  };

  render() {
    const {
      style,
      labelStyle,
      label,
      onLinkPress,
      link,
      linkStyle,
      ...rest
    } = this.props;

    return (
      <View style={[styles.container, style]}>
        {label && <Text style={[styles.label, labelStyle]} numberOfLines={1}>{label}</Text>}
        {link &&
          <TouchableWithoutFeedback onPress={onLinkPress}>
            <View style={styles.labelView}>
              <Text style={[styles.label, styles.link, linkStyle]} numberOfLines={1}>{link}</Text>
            </View>
          </TouchableWithoutFeedback>
        }
        <Switch {...rest} />
      </View>
    );
  }
}
