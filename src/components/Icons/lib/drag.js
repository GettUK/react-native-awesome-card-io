import React from 'react';
import Svg, { G, Rect } from 'react-native-svg';

export default function Drag({ color, ...rest }) {
  return (
    <Svg width="14" height="8" {...rest}>
      <G fill={color || '#D8D8D8'} fillRule="nonzero">
        <Rect width="14" height="1.5" rx=".75"/>
        <Rect width="14" height="1.5" y="3" rx=".75"/>
        <Rect width="14" height="1.5" y="6" rx=".75"/>
      </G>
    </Svg>
  );
}
