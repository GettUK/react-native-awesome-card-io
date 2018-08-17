import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import { Button } from 'components';

import { strings } from 'locales';

import { withTheme } from 'providers';

import styles from './styles';

const LabeledButton = ({ onClick, type, theme }) => (
  <Button
    style={styles.btnContainer}
    styleContent={[styles.btn, { backgroundColor: theme.color.bgPrimary }, styles[type]]}
    raised={false}
    size="sm"
    onPress={onClick}
  >
    <Text
      allowFontScaling={false}
      style={[styles[`${type}Text`], type === 'createNew' && { color: theme.color.primaryBtns }]}
    >
      {strings(`order.button.${type}`)}
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

export default withTheme(LabeledButton);
