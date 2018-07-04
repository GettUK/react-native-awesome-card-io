import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import { Button } from 'components';

import { strings } from 'locales';

import styles from './styles';

const LabeledButton = ({ onClick, type }) => (
  <Button
    styleContent={[styles.btn, styles[type]]}
    raised={false}
    size="sm"
    onPress={onClick}
  >
    <Text allowFontScaling={false} style={styles[`${type}Text`]}>
      {strings(`order.${type}`)}
    </Text>
  </Button>
);

LabeledButton.propTypes = {
  type: PropTypes.oneOf(['createNew', 'orders']),
  onClick: PropTypes.func
};

LabeledButton.defaultProps = {
  type: 'orders',
  onClick: () => {}
};

export default LabeledButton;
