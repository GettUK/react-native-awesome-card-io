import React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';

export default function CalendarRange({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 26 26" {...rest}>
      <G fill="none" fillRule="evenodd">
        <Rect width="22.5" height="20.5" x="1.75" y="3.75" stroke={color || '#FFF'} strokeWidth="1.5" rx="4"/>
        <Rect width="1" height="5" x="7.5" y="1.5" stroke={color || '#FFF'} rx=".5"/>
        <Rect width="1" height="5" x="18" y="1.5" stroke={color || '#FFF'} rx=".5"/>
        <Path fill={color || '#FFF'} d="M18 10h2v2h-2zM18 14h2v2h-2zM14 10h2v2h-2zM14 14h2v2h-2zM14 18h2v2h-2zM10 10h2v2h-2zM10 14h2v2h-2zM10 18h2v2h-2zM6 14h2v2H6zM6 18h2v2H6z"/>
      </G>
    </Svg>
  );
}
