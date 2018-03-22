import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop, Circle, G } from 'react-native-svg';

export default function PickUpField({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 32 32" {...rest}>
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
        <Path
          fill={color || 'url(#a)'}
          fillRule="evenodd"
          d="M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z M16,22 C19.3137085,22 22,19.3137085 22,16 C22,12.6862915 19.3137085,10 16,10 C12.6862915,10 10,12.6862915 10,16 C10,19.3137085 12.6862915,22 16,22 Z"

        />
        <Circle cx="16" cy="16" r="6" fill="#FFF" />
      </G>
    </Svg>
  );
}
