import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function DottedLine({ ...rest }) {
  return (
    <Svg viewBox="0 0 2 14" {...rest}>
      <Defs>
        <LinearGradient id="a" x1="1.809%" x2="1.809%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor="#48B5FF"/>
          <Stop offset="100%" stopColor="#615FFF"/>
        </LinearGradient>
      </Defs>
      <Path
        fill="url(#a)"
        fillRule="evenodd"
        d="M8 23a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        transform="translate(-7 -23)"
      />
    </Svg>
  );
}
