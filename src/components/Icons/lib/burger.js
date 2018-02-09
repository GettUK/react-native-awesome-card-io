import React from 'react';
import Svg, { G, Rect } from 'react-native-svg';

export default function Burger({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 32 32" {...rest}>
      <G fill={color} fillRule="evenodd">
        <Rect width="24" height="2" x="4" y="7" rx="1" />
        <Rect width="24" height="2" x="4" y="15" rx="1" />
        <Rect width="24" height="2" x="4" y="23" rx="1" />
      </G>
    </Svg>
  );
}
