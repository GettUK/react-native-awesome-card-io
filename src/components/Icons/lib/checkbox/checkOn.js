import React from 'react';
import Svg, { Path, Circle, G } from 'react-native-svg';

export default function CheckOn({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 22 22" {...rest}>
      <G fill="none" fillRule="evenodd">
        <Circle cx="11" cy="11" r="11" fill={color || '#6bc11a'}/>
        <Path stroke="#FFF" d="M4.5 11.5L8 15l8-8"/>
      </G>
    </Svg>
  );
}
