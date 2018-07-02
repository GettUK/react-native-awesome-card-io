import React from 'react';
import Svg, { Rect, G } from 'react-native-svg';

export default function Phone({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 26 26" {...rest}>
      <G fill="none" fillRule="evenodd">
        <Rect width="14.5" height="22.5" x="5.75" y="1.75" stroke={color} strokeWidth="1.5" rx="2"/>
        <Rect width="1" height="1" x="12.5" y="21.5" fill={color} stroke="#0076BB" rx=".5"/>
      </G>
    </Svg>
  );
}
