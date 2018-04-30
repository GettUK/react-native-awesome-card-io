import React from 'react';
import Svg, { G, Defs, Rect, LinearGradient, Stop, Circle } from 'react-native-svg';

export default function CurrentLocation({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 18 18" {...rest}>
      <Defs>
        <LinearGradient
          id="a"
          x1="3.681%"
          x2="101.516%"
          y1="101.484%"
          y2="2.681%">
          <Stop offset="0%" stopColor="#0076BB" />
          <Stop offset="100%" stopColor="#284784" />
        </LinearGradient>
      </Defs>
      <G fill="none" fillRule="evenodd">
        <Rect width="18" height="18" fill="#FFF" rx="9"/>
        <Circle cx="9" cy="9" r="6" fill={color || 'url(#a)'} />
      </G>
    </Svg>
  );
}
