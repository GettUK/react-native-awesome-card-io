import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { Icon } from 'components';
import { color } from 'theme';

const IconBtn = ({ onPress, style, ...rest }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Icon {...rest} />
  </TouchableOpacity>
);

IconBtn.propTypes = {
  onPress: PropTypes.func,
  name: PropTypes.string,
  style: Text.propTypes.style
};

IconBtn.defaultProps = {
  size: 22,
  color: color.white,
  name: 'search'
};

export default IconBtn;
