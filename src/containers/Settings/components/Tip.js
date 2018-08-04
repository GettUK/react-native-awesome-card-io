import React from 'react';
import { Text } from 'react-native';

import { strings } from 'locales';

import { withTheme } from 'providers';

import styles from './AddressStyles';

function Tip(props) {
  return (
    <Text style={[styles.tip, { color: props.theme.color.secondaryText }]}>
      {props.label || strings('tip.text.removeAddress')}
    </Text>
  );
}

export default withTheme(Tip);
