import React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';

export default function TrainStation({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 16 22" {...rest}>
      <G fill="none" fillFule="evenodd" stroke={color || '#D8D8D8'} strokeWidth="1.5" transform="translate(1 1)">
        <Rect width="12.6" height="17.037" x=".7" rx="2.222"/>
        <Path d="M1.4 3.222h11.732M1.4 10.852h11.732M3.822 15.186a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zM10.201 15.186a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zM4.919 16.989l-4.269 3M9.112 16.937l4.268 3"/>
      </G>
    </Svg>
  );
}
