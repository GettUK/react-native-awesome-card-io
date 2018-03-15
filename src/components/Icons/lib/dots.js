import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Dots({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 30 6" {...rest}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M27 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM3 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm12 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
      />
    </Svg>
  );
}
