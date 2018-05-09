import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from './styles';

const Divider = ({ style, left }) => (
  <View style={[styles.container, { marginLeft: left }, style]} />
);

Divider.propTypes = {
  style: View.propTypes.style,
  left: PropTypes.number
};

Divider.defaultProps = {
  style: {},
  left: 15
};

export default Divider;
