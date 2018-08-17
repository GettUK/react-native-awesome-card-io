import React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

export default function Hotel({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 20 14" {...rest}>
      <G fill="none" fillRule="evenodd">
        <Path fill={color || '#D8D8D8'} d="M0 0h1.5v14H0zM18 9h1.5v5H18z"/>
        <Path stroke={color || '#D8D8D8'} strokeWidth="1.5" d="M10.75 2.75v6.865h8V5.66a2.91 2.91 0 0 0-2.91-2.91h-5.09z"/>
        <Path fill={color || '#D8D8D8'} d="M0 10.5V9h19v1.5z"/>
        <Circle cx="5.5" cy="4.5" r="2.5" stroke={color || '#D8D8D8'} strokeWidth="1.5"/>
      </G>
    </Svg>
  );
}
