import React from 'react';
import Svg, { Path, Rect, G } from 'react-native-svg';

export default function CarType({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 26 26" {...rest}>
      <G fill="none" fillRule="evenodd" stroke={color}>
        <Path strokeWidth="1.5" d="M9.75 19.297h6.5V15a.25.25 0 0 0-.25-.25h-6a.25.25 0 0 0-.25.25v4.297zM4.976 10.745h16.048L19.869 6.42a2.25 2.25 0 0 0-2.173-1.67H8.304a2.25 2.25 0 0 0-2.173 1.67l-1.155 4.325z"/>
        <Path strokeWidth="1.5" d="M4 10.75A2.25 2.25 0 0 0 1.75 13v6.501c0 .966.783 1.749 1.749 1.749h.55a1.2 1.2 0 0 0 1.199-1.2v-.75h15.528v.75a1.2 1.2 0 0 0 1.2 1.2h.537c.96 0 1.737-.778 1.737-1.737V13A2.25 2.25 0 0 0 22 10.75H4z"/>
        <Rect width="3" height="1" x="2.5" y="8.5" fill={color} rx=".5"/>
        <Rect width="3" height="1" x="20.5" y="8.5" fill={color} rx=".5"/>
        <Rect width="3" height="2" x="4.5" y="13.5" rx="1"/>
        <Rect width="3" height="2" x="18.5" y="13.5" rx="1"/>
      </G>
    </Svg>
  );
}
