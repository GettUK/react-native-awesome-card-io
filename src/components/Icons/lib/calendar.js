import React from 'react';
import Svg, { Path, Rect, G } from 'react-native-svg';

export default function Calendar({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 26 26" {...rest}>
      <G fill="none" fillRule="evenodd" stroke={color}>
        <Rect width="22.5" height="20.5" x="1.75" y="3.75" strokeWidth="1.5" rx="4"/>
        <Rect width="1" height="5" x="7.5" y="1.5" rx=".5"/>
        <Rect width="1" height="5" x="18" y="1.5" rx=".5"/>
        <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.223 13.407l4.235 3.786 6.96-6.575"/>
      </G>
    </Svg>
  );
}
