import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Checkmark({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 13 11" {...rest}>
      <Path
        fill={color || '#6BC11A'}
        fillRule="evenodd"
        d="M0 6.5L1.5 5 4 7.5 11.5 0 13 1.5l-9 9z"
      />
    </Svg>
  );
}
