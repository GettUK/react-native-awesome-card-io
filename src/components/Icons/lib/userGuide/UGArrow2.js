import React from 'react';
import Svg, { Defs, LinearGradient, Stop, G, Path } from 'react-native-svg';

export default function UGArrow3({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 43 44" {...rest}>
      <Defs>
        <LinearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor={color || '#fff'} stopOpacity=".144"/>
          <Stop offset="100%" stopColor={color || '#fff'} />
        </LinearGradient>
      </Defs>
      <G fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <Path stroke="url(#a)" d="M20.603.061C-.487 14.274-4.657 31.977 8.091 53.171" transform="rotate(-152 16.378 24.064)"/>
        <Path stroke={color || '#fff'} d="M41.435 5.981l-4.213-4.786L33.446 6.4"/>
      </G>
    </Svg>
  );
}
