import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { color } from 'theme';

const GradientWrapper = ({ children, ...rest }) => (
  <LinearGradient {...rest}>
    {children}
  </LinearGradient>
);

GradientWrapper.propTypes = {
  colors: PropTypes.array,
  end: PropTypes.object,
  start: PropTypes.object,
  style: ViewPropTypes.style
};

GradientWrapper.defaultProps = {
  colors: [color.iconsSettigs, color.primaryBtns],
  start: { x: 0, y: 1 },
  end: { x: 1, y: 1 }
};

export default GradientWrapper;
