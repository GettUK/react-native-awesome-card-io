import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Info({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 22 22" {...rest} >
      <Path
        fill={color || '#979797'}
        fillRule="evenodd"
        d="M11 22C4.925 22 0 17.075 0 11S4.925 0 11 0s11 4.925 11 11-4.925 11-11 11zm0-1c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10zM9 8.5h3v8h1v.5H9v-.5h1V9H9v-.5zM10.75 7a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"
      />
    </Svg>
  );
}
