import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewPropTypes } from 'react-native';
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

const Button = ({ styleContent, children, size, raised, ...rest }) => {
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
    default: {
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
      {...rest}
    >
      <View style={[styles.btn, computedStyles, styleContent]}>
        {children}
      </View>

    </TouchableOpacity>
  );
};

Button.defaultProps = {
  raised: true
};

Button.propTypes = {
  styleContent: ViewPropTypes.style,
  style: ViewPropTypes.style,
  children: PropTypes.node,
  size: PropTypes.string,
  raised: PropTypes.bool
};

export default Button;
