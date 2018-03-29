import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export default function Warning({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 50 43" {...rest}>
      <G fillRule="evenodd">
        <Path
          fill={'transparent'}
          stroke={color || '#fcb625'}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M27.561 4.2l19.657 32.238A3 3 0 0 1 44.657 41H5.343a3 3 0 0 1-2.561-4.562L22.439 4.201a3 3 0 0 1 5.122 0z"
        />
        <Path
          fill={color || '#fcb625'}
          d="M23 23.543v-7.086c0-1.224.955-2.32 2.273-2.447 1.5-.127 2.727.97 2.727 2.32v7.34c0 1.35-1.227 2.447-2.727 2.32C23.955 25.863 23 24.767 23 23.543zM25.273 34.99C23.955 34.864 23 33.774 23 32.558v-.125c0-1.3 1.045-2.39 2.455-2.432C26.864 29.96 28 31.007 28 32.307v.377c0 1.384-1.227 2.432-2.727 2.306z"
        />
      </G>
    </Svg>
  );
}
