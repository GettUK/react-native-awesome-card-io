import React from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';

export default function Wheelchair({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 26 26" {...rest}>
      <G fill="none" fillRule="evenodd" stroke={color} strokeWidth="1.5">
        <Path strokeLinecap="round" d="M1.783 2.081h3.43l1.473 8.894c1.307-.312 2.545-.285 3.715.083 1.17.367 2.226 1.015 3.17 1.942h5.326l1.085 7.034h3.29"/>
        <Circle cx="8.5" cy="17.5" r="6.75"/>
        <Circle cx="8.5" cy="17.5" r="1.5"/>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M6.093 7.028h8.993"/>
        <Path d="M19.707 18.185h-4.764"/>
      </G>
    </Svg>
  );
}
