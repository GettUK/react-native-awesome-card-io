import React from 'react';
import Svg, { Path, Circle, G } from 'react-native-svg';

export default function CheckOn({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 46 44" {...rest}>
        <G fill="none" fillRule="evenodd">
          <Path fill="#fff" d="M0 0h46v44H0z"/>
          <G transform="translate(12 12)">
            <Circle cx="11" cy="11" r="11" fill={color || '#6bc11a'}/>
            <Path stroke="#fff" d="M4.5 11.5L8 15l8-8"/>
          </G>
        </G>
    </Svg>
  );
}
