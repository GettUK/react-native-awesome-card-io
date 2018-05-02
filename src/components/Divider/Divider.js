import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from './styles';

const Divider = ({ style }) => (<View style={[styles.container, style]} />);

Divider.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ])
};

Divider.defaultProps = {
  style: {}
};

export default Divider;
