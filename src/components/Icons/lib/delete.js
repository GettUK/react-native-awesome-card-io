import React from 'react';
import Svg, { Rect, G } from 'react-native-svg';

export default function Delete({ color, ...rest }) {
  return (
    <Svg width="12" height="12" {...rest}>
      <G fill={color || '#BBBBBF'} fillRule="evenodd" transform="rotate(45 7.707 5.293)">
        <Rect width="1.5" height="14" x="6.25" rx=".75"/>
        <Rect width="1.5" height="14" x="6.25" rx=".75" transform="rotate(90 7 7)"/>
      </G>
    </Svg>
  );
}
