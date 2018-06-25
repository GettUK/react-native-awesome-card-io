import React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';

export default function Work({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 26 26" {...rest}>
      <G fill="none" fillRule="evenodd" stroke={color} strokeWidth="1.5">
        <Path d="M2.75 14.255v7.755a2.247 2.247 0 0 0 2.251 2.24H21a2.245 2.245 0 0 0 2.251-2.24v-7.755h-8v2h-4.5v-2h-8zM7.75 7.747h10.5V5.75a2.003 2.003 0 0 0-2.003-1.999H9.753A2.005 2.005 0 0 0 7.75 5.749v1.998z"/>
        <Rect width="4.5" height="4.5" x="10.75" y="11.75" rx="1"/>
        <Path d="M10.75 14.25v-2.497h4.495v2.497H23c.69 0 1.25-.56 1.25-1.25V9c0-.69-.56-1.25-1.25-1.25H3c-.69 0-1.25.56-1.25 1.25v4c0 .69.56 1.25 1.25 1.25h7.75z"/>
      </G>
    </Svg>
  );
}
