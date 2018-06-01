import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function CheckOff({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 22 22" {...rest}>
      <Path fill={color || '#c7c7cd'} fillRule="evenodd" d="M11 22C4.925 22 0 17.075 0 11S4.925 0 11 0s11 4.925 11 11-4.925 11-11 11zm0-1c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10z"/>
    </Svg>
  );
}
