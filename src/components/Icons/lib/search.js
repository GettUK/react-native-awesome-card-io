import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Search({ color, strokeWidth, ...rest }) {
  return (
    <Svg viewBox="0 0 18 18" {...rest}>
      <Path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth || '2'}
        d="M7.4 13.8A6.4 6.4 0 1 1 7.4 1a6.4 6.4 0 0 1 0 12.8zM17 17l-4.8-4.8L17 17z"
      />
    </Svg>
  );
}
