import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export default function Recent({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 18 18" {...rest}>
      <G fill="none" fillFule="evenodd" stroke={color || '#D8D8D8'} strokeWidth="1.5">
        <Path d="M.751 9.142a8.25 8.25 0 1 0 2.4-5.96l-2.4 5.96z"/>
        <Path d="M2.682.8l-.518 2.939 3.002.529M8.227 4.884v5.119l4.318 2.478"/>
      </G>
    </Svg>
  );
}

