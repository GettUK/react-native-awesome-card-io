import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Rectangle({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 66 68" {...rest}>
      <Path
        d="M61.614 67.58H4.386C1.963 67.58 0 65.57 0 63.09V4.49C0 2.011 1.963 0 4.386 0h57.228C64.037 0 66 2.01 66 4.491V63.09c0 2.481-1.963 4.491-4.386 4.491z"
        fill={color || '#FFF'}
        fillRule="evenodd"
      />
    </Svg>
  );
}
