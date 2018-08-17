import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';

import { withTheme } from 'providers';

import styles from './styles';

const Divider = ({ style, left, theme }) => (
  <View style={[styles.container, { marginLeft: left, borderBottomColor: theme.color.pixelLine }, style]} />
);

Divider.propTypes = {
  style: ViewPropTypes.style,
  left: PropTypes.number
};

Divider.defaultProps = {
  style: {},
  left: 15
};

export default withTheme(Divider);
