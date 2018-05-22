import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientWrapper = ({ children, ...rest }) => {
  return (
    <LinearGradient {...rest}>
      {children}
    </LinearGradient>
  );
};

GradientWrapper.propTypes = {
  colors: PropTypes.array,
  end: PropTypes.object,
  start: PropTypes.object,
  style: ViewPropTypes.style
};

GradientWrapper.defaultProps = {
  colors: ['#0076bb', '#284784'],
  start: { x: 0, y: 1 },
  end: { x: 1, y: 1 }
};

export default GradientWrapper;
