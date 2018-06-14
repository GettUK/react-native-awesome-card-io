import React from 'react';
import Svg, { Defs, LinearGradient, Stop, G, Path } from 'react-native-svg';

export default function UGArrow2({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 34 52" {...rest}>
      <Defs>
        <LinearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor={color || '#fff'} stopOpacity=".144"/>
          <Stop offset="100%" stopColor={color || '#fff'}/>
        </LinearGradient>
      </Defs>
      <G fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <Path stroke="url(#a)" d="M20.603.061C-.487 14.274-4.657 31.977 8.091 53.171" transform="rotate(135 15.351 27.697)"/>
        <Path stroke={color || '#fff'} d="M6.771 1.314L1.326 4.632l4.47 4.623"/>
      </G>
    </Svg>
  );
}
