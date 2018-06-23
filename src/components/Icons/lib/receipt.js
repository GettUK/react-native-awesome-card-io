import React from 'react';
import Svg, { Path, Rect, G } from 'react-native-svg';

export default function Receipt({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 16 20" {...rest}>
      <G fill="none" fillRule="evenodd" transform="translate(1 1)">
        <Path stroke={color || '#fff'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M0 0l1.763.75L3.548 0l1.747.75L7.083 0l1.748.75 1.72-.75 1.718.75L14 0v18l-1.796-.75-1.69.75-1.777-.75-1.719.75-1.721-.75-1.786.75-1.667-.75L0 18z"/>
        <Rect width="8" height="1.5" x="3" y="4" fill={color || '#fff'} rx=".75"/>
        <Rect width="8" height="1.5" x="3" y="7" fill={color || '#fff'} rx=".75"/>
        <Rect width="8" height="1.5" x="3" y="10" fill={color || '#fff'} rx=".75"/>
        <Rect width="8" height="1.5" x="3" y="13" fill={color || '#fff'} rx=".75"/>
      </G>
    </Svg>
  );
}
