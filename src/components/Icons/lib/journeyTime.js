import React from 'react';
import Svg, { G, Ellipse, Rect } from 'react-native-svg';

export default function Time({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 21 25" {...rest} >
      <G fill="none" fillRule="evenodd">
        <Ellipse cx="10.5" cy="14.352" stroke="#D8D8D8" strokeWidth="1.5" rx="9.75" ry="9.898"/>
        <Rect width="1.5" height="3.704" x="10.043" y=".926" fill={color} rx=".75"/>
        <Rect width="1.5" height="3.216" x="16.95" y="3.72" fill={color} rx=".75" transform="rotate(30 17.7 5.328)"/>
        <Rect width="1.5" height="3.704" x="10.043" y="-.926" fill={color} rx=".75" transform="rotate(90 10.793 .926)"/>
        <Rect width="1.5" height="8.333" x="10.043" y="7.407" fill={color} rx=".75"/>
      </G>
    </Svg>
  );
}
