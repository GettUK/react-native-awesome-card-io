import React from 'react';
import Svg, { Rect, G, Path } from 'react-native-svg';

export default function Cash({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 24 16" {...rest}>
      <G fill="none" fillRule="nonzero" transform="translate(-1 -5)">
        <Rect width="19.5" height="11.5" x="1.75" y="8.75" stroke={color || '#D8D8D8'} strokeWidth="1.5" rx="2"/>
        <Path stroke={color || '#D8D8D8'} strokeWidth="1.5" d="M4.75 8.747h14.708a1.75 1.75 0 0 1 1.75 1.738l.04 5.765H23c.69 0 1.25-.56 1.25-1.25V7c0-.69-.56-1.25-1.25-1.25H6c-.69 0-1.25.56-1.25 1.25v1.747zM11.72 16.64a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
        <Path fill={color || '#D8D8D8'} d="M3.75 11.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zM3.75 18.99a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zM18.75 11.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zM18.75 18.99a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>
      </G>
    </Svg>
  );
}
