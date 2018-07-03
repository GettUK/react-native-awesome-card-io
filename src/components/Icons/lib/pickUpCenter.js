import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop, G } from 'react-native-svg';

export default function PickUpCenter(props) {
  return (
    <Svg viewBox="0 0 32 52" {...props}>
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
        <Path fill="#88A9EC" d="M16 52L0 16h32z" />
        <Path
          fill="url(#a)"
          d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm0-10a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
        />
      </G>
    </Svg>
  );
}
