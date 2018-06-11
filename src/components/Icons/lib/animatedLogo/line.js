import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Line({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 2 68" {...rest}>
      <Path d="M.069 0h1.75v67.824H.068z" fill={color || '#FFF'} />
    </Svg>
  );
}
