import React from 'react';
import Svg, { G, Circle, Rect } from 'react-native-svg';

export default function Add({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 26 26" {...rest}>
      <G fill="none" fillRule="evenodd" transform="translate(1 1)">
        <Circle cx="12" cy="12" r="12" stroke="#D8D8D8"/>
        <G fill="#284784" transform="translate(6 6)">
          <Rect width="1.44" height="12" x="5.28" rx=".72"/>
          <Rect width="1.44" height="12" x="5.28" rx=".72" transform="rotate(90 6 6)"/>
        </G>
      </G>
    </Svg>
  );
}
