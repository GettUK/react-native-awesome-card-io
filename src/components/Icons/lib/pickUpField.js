import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function PickUpField(props) {
  return (
    <Svg viewBox="0 0 16 16" {...props}>
      <Defs>
        <LinearGradient
          id="a"
          x1="3.681%"
          x2="101.516%"
          y1="101.484%"
          y2="2.681%"
        >
          <Stop offset="0%" stopColor="#0076BB" />
          <Stop offset="100%" stopColor="#284784" />
        </LinearGradient>
      </Defs>
      <Path
        fill="url(#a)"
        fillRule="evenodd"
        d="M22 33a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
        transform="translate(-14 -17)"
      />
    </Svg>
  );
}
