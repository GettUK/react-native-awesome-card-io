import React from 'react';
import Svg, { Path, G, Rect } from 'react-native-svg';

export default function ReasonTaxi({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 29 15" {...rest}>
      <G fill="none" fillRule="evenodd" stroke={color} strokeWidth="1.5">
        <Path d="M6.28.75a3.25 3.25 0 0 0-3.188 2.613l-1.4 7A3.25 3.25 0 0 0 4.88 14.25h19.242a3.25 3.25 0 0 0 3.187-3.887l-1.4-7A3.25 3.25 0 0 0 22.72.75H6.279z"/>
        <Rect width="3.5" height="3.5" x="4.75" y="7.75" rx="1"/>
        <Rect width="3.5" height="3.5" x="8.75" y="3.75" rx="1"/>
        <Rect width="3.5" height="3.5" x="12.75" y="7.75" rx="1"/>
        <Rect width="3.5" height="3.5" x="16.75" y="3.75" rx="1"/>
        <Rect width="3.5" height="3.5" x="20.75" y="7.75" rx="1"/>
      </G>
    </Svg>
  );
}
