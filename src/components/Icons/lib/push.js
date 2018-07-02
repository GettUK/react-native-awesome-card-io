import React from 'react';
import Svg, { Path, G, Circle } from 'react-native-svg';

export default function Push({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 26 26" {...rest}>
      <G fill="none" fillRule="evenodd">
        <Path fill={color} d="M22 13v8a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h8v1.501H5.009c-1.527 0-2.512 1.056-2.512 2.509v12.987c0 1.111.806 2.53 2.512 2.53h13.004c1.23 0 2.464-.6 2.464-2.53V13H22z"/>
        <Circle cx="20" cy="6" r="4.25" stroke={color} strokeWidth="1.5"/>
      </G>
    </Svg>
  );
}
