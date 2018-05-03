import React from 'react';
import Svg, { Path, G, Circle } from 'react-native-svg';

export default function Distance({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 26 14" {...rest} >
      <G fill="none" fillRule="evenodd">
        <Path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.62 11.894l8.432-8.432 5.602 5.602 6.631-6.632"/>
        <Circle cx="2" cy="12" r="2" fill={color}/>
        <Circle cx="11" cy="4" r="2" fill={color}/>
        <Circle cx="17" cy="9" r="2" fill={color}/>
        <Circle cx="24" cy="2" r="2" fill={color}/>
      </G>
    </Svg>
  );
}
