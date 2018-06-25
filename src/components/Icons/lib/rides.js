import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function Rides({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 26 26" {...rest}>
      <G fill="none" fillRule="evenodd" stroke={color} strokeWidth="1.5">
        <Path d="M5.266 8.76a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20.755 24.253c.05 0 .1-.015.142-.042.131-.088 3.358-2.184 3.358-4.86a3.5 3.5 0 0 0-7 0c0 2.676 3.221 4.77 3.358 4.86a.263.263 0 0 0 .142.042z"/>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M9.084 5.718l12.9 2.283L4.945 17.34l15.648 6.869"/>
      </G>
    </Svg>
  );
}
