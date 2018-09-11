import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function comeBack({ color, ...rest }) {
  return (
    <Svg width="23" height="22" {...rest}>
      <G
        fill="none"
        fill-rule="evenodd"
        stroke={color || '#284784'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5">
        <Path d="M1.724 7.26h12.799c2.59 0 7.146.862 7.146 6.933s-5.215 6.933-7.146 6.933H4.8"/>
        <Path d="M5.774 1.43l-5 5.846 5 6.155"/>
      </G>
    </Svg>
  );
}
