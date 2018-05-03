import React from 'react';
import Svg, { Path, Rect, G } from 'react-native-svg';

export default function PaymentMethod({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 24 16" {...rest}>
      <G fill="none" fillRule="evenodd">
        <Rect width="22.5" height="14.5" x=".75" y=".75" stroke={color} strokeWidth="1.5" rx="2"/>
        <Path fill={color} d="M0 3h24v1.5H0zm0 3h24v1.5H0zm3 5h3v1.5H3zm4 0h3v1.5H7z"/>
      </G>
    </Svg>
  );
}
