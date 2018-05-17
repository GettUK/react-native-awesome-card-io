import React from 'react';
import Svg, { Circle, G, Rect } from 'react-native-svg';

export default function ReasonTaxi({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 23 27" {...rest}>
      <G fill="none" fillRule="evenodd">
        <Circle cx="11.5" cy="15.5" r="10.75" stroke={color} strokeWidth="1.5"/>
        <Rect width="1.5" height="4" x="11" y="1" fill={color} rx=".75"/>
        <Rect width="1.5" height="3.473" x="18.565" y="4.017" fill={color} rx=".75" transform="rotate(30 19.315 5.754)"/>
        <Rect width="1.5" height="4" x="11" y="-1" fill={color} rx=".75" transform="rotate(90 11.75 1)"/>
        <Rect width="1.5" height="9" x="11" y="8" fill={color} rx=".75"/>
      </G>
    </Svg>
  );
}
