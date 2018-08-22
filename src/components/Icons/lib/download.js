import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function download({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 21 30" {...rest}>
      <G fill="none" fillRule="evenodd">
        <Path stroke={color || '#fff'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.031 9H20v20H1V9.067h6.059"/>
        <Path fill={color || '#fff'} d="M10.528 2.627L7.17 5.985a.75.75 0 0 1-1.061-1.06l3.889-3.89a.75.75 0 0 1 1.06 0l3.89 3.89a.75.75 0 1 1-1.06 1.06l-3.36-3.358z"/>
      </G>
    </Svg>
  );
}
