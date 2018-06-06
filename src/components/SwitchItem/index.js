import React, { PureComponent } from 'react';
import { View, Text, Platform, Switch, TouchableWithoutFeedback } from 'react-native';
import { noop } from 'lodash';
import styles from './style';

export default class SwitchItem extends PureComponent {
  static defaultProps = {
    value: false,
    onLabelPress: () => noop,
    onValueChange: () => noop,
    onTintColor: '#4cd964',
    tintColor: 'rgba(255,255,255,0.2)',
    thumbTintColor: Platform.OS === 'android' ? '#fff' : null
  };

  render() {
    const {
      style,
      labelStyle,
      label,
      onLabelPress,
      ...rest
    } = this.props;

    return (
      <View style={[styles.container, style]}>
        {label &&
          <TouchableWithoutFeedback onPress={onLabelPress}>
            <View style={styles.labelView}>
              <Text style={[styles.label, labelStyle]} numberOfLines={1}>{label}</Text>
            </View>
          </TouchableWithoutFeedback>
        }
        <Switch {...rest} />
      </View>
    );
  }
}
