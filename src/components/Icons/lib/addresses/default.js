import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Default({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 18 21" {...rest}>
      <Path
        fill="none"
        fillRule="evenodd"
        stroke={color || '#D8D8D8'}
        strokeWidth="1.5"
        d="M8.676 19.905C8.363 19.703 1 14.965 1 8.913 1 4.543 4.582 1.001 9 1c4.417 0 8 3.543 8 7.913 0 6.052-7.375 10.793-7.676 10.992a.605.605 0 0 1-.648 0zm.341-7.876a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
      />
    </Svg>
  );
}
