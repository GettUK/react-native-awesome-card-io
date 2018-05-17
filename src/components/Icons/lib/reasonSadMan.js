import React from 'react';
import Svg, { Path, G, Circle } from 'react-native-svg';

export default function ReasonSadMan({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 26 26" {...rest}>
      <G fill="none" fillRule="evenodd" stroke={color} strokeWidth="1.5">
        <Circle cx="13" cy="13" r="12.25"/>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M5.571 8.357l4.643 1.857-4.643 1.857m14.857-3.714l-4.643 1.857 4.643 1.857m-10.04 7.443h5.506"/>
      </G>
    </Svg>
  );
}
