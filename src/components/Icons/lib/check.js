import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Check({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 14 11" {...rest}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M0 6.81l1.615-1.572 2.693 2.619L12.385 0 14 1.571 4.308 11z"
      />
    </Svg>
  );
}
