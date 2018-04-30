import React from 'react';
import Svg, { Path, G, Defs, Rect, Circle, LinearGradient, Stop } from 'react-native-svg';

export default function SourceMarker({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 24 42" {...rest}>
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
        <Rect width="2" height="23" x="11" y="19" fill={color || '#0A6AAD'} rx="1"/>
        <Circle cx="12" cy="12" r="5" fill="#FFF"/>
        <Path fill="url(#a)" d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-7.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z"/>
      </G>
    </Svg>
  );
}
