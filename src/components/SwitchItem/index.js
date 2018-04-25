import React, { PureComponent } from 'react';
import { View, Text, Platform, Switch } from 'react-native';
import { noop } from 'lodash';
import styles from './style';

export default class SwitchItem extends PureComponent {
  static defaultProps = {
    value: false,
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
      ...rest
    } = this.props;

    return (
      <View style={[styles.container, style]}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <Switch {...rest} />
      </View>
    );
  }
}
