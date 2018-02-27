import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import styles from './style';

export default function NavImageButton(props) {
  return (
    <TouchableOpacity
      style={props.styleContainer}
      onPress={props.onClick ? props.onClick : null}>
      <View style={[styles.buttonView, props.styleView]}>{props.icon}</View>
    </TouchableOpacity>
  );
}

NavImageButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
  styleContainer: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  styleView: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ])
};

NavImageButton.defaultProps = {
  styleContainer: {},
  styleView: {}
};
