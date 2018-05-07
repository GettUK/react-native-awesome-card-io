import React from 'react';
import Svg, { Path, Circle, G } from 'react-native-svg';

export default function TripReason({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 25 24" {...rest}>
      <G fill="none" fillRule="evenodd" stroke={color} strokeWidth="1.5" transform="translate(1 1)">
        <Circle cx="3.5" cy="3.5" r="3.5"/>
        <Path d="M19.358 21.358a.263.263 0 0 0 .284 0c.131-.088 3.358-2.184 3.358-4.86a3.5 3.5 0 0 0-7 0c0 2.676 3.221 4.77 3.358 4.86"/>
        <Path strokeLinecap="round" strokeLinejoin="round" d="M7.334 3.452L19.894 4.7 2.945 15.34l16.042 5.798"/>
      </G>
    </Svg>
  );
}
