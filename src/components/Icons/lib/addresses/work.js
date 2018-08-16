import React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';

export default function Work({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 20 10" {...rest}>
      <G
        fill="none"
        fillRule="evenodd"
        stroke={color || '#D8D8D8'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        transform="translate(1 1)"
      >
        <Path d="M.9 7.2h16.2v8.103A2.703 2.703 0 0 1 14.407 18H3.593A2.702 2.702 0 0 1 .9 15.303V7.2z"/>
        <Rect width="18" height="7.2" y="3.6" rx="2.7"/>
        <Path d="M4.5 1.8C4.5.806 5.299 0 6.3 0h5.4c.994 0 1.8.799 1.8 1.8v1.8h-9V1.8z"/>
        <Path d="M7.2 9h3.6v3.6H7.2z"/>
      </G>
    </Svg>
  );
}
