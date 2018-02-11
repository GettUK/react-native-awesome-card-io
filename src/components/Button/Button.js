import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});

const Button = ({ style, children, size, raised, ...rest }) => {
  let computedStyles = {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20
  };

  switch (size) {
  case 'sm': {
    computedStyles = {
      ...computedStyles,
      borderRadius: 6,
      paddingVertical: 10,
      paddingHorizontal: 15
    };
    break;
  }
  }

  if (raised) {
    computedStyles = {
      ...computedStyles,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      shadowOffset: {
        height: 0
      }
    };
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.btn, computedStyles, style]}
      {...rest}>
      {children}
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  raised: true
};

Button.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  children: PropTypes.node,
  size: PropTypes.string,
  raised: PropTypes.bool
};

export default Button;
