import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Back({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 12 21" {...rest}>
      <Path
        fill={color}
        d="M11.542 2.971c.588-.546.61-1.453.05-2.026a1.496 1.496 0 0 0-2.077-.05L.42 9.479a1.456 1.456 0 0 0 .048 2.094l9.046 8.53a1.496 1.496 0 0 0 2.078-.045 1.41 1.41 0 0 0-.047-2.027l-7.472-7.168a.5.5 0 0 1 0-.722l7.468-7.169z"
      />
    </Svg>
  );
}
