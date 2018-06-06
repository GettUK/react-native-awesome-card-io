import React from 'react';
import { Text } from 'react-native';

import { strings } from 'locales';

import styles from './AddressStyles';

export default function Tip(props) {
  return (
    <Text style={styles.tip}>{props.label || strings('settings.address.tip')}</Text>
  );
}
