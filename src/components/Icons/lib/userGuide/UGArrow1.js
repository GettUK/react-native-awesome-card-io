import React from 'react';
import Svg, { Defs, LinearGradient, Stop, G, Path } from 'react-native-svg';

export default function UGArrow1({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 32 47" {...rest}>
      <Defs>
        <LinearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor={color || '#fff'} stopOpacity=".144"/>
          <Stop offset="100%" stopColor={color || '#fff'}/>
        </LinearGradient>
      </Defs>
      <G fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <Path stroke="url(#a)" d="M29.675.525C4.572 4.315-3.623 18.863 5.091 44.17" transform="translate(1 1)"/>
        <Path stroke={color || '#fff'} d="M1 42.604l5.37 3.44L8.563 40"/>
      </G>
    </Svg>
  );
}
