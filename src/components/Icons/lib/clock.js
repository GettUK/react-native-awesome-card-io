import React from 'react';
import Svg, { Path, Circle, G } from 'react-native-svg';

export default function Clock({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 16 16" {...rest} >
      <G fill="none" fillRule="evenodd" stroke={color || '#d8d8d8'}>
        <Circle cx="8" cy="8" r="7.5" />
        <Path d="M7.313 4.341v4.55l3.838 2.202" />
      </G>
    </Svg>
  );
}
