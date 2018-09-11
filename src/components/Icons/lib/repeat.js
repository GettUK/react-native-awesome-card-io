import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function repeat({ color, ...rest }) {
  return (
    <Svg width="21" height="22" {...rest}>
      <G fill="none" fillRule="evenodd" stroke={color || '#284784'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <Path stroke={color || '#284784'} d="M17.359 1.107l.315 4.21-4.251.318"/>
        <Path stroke={color || '#284784'} d="M16.733 4.33a9.5 9.5 0 1 0 .937 13.403 9.483 9.483 0 0 0 1.691-2.801 9.499 9.499 0 0 0 .634-3.745"/>
      </G>
    </Svg>
  );
}
