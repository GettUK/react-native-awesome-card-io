import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Clock({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 16 16" {...rest}>
      <Path
        fill={color}
        fillRule="evenodd"
        transform="translate(0 -3)"
        d="M7.992 3C3.576 3 0 6.584 0 11s3.576 8 7.992 8C12.416 19 16 15.416 16 11s-3.584-8-8.008-8zM8.5 18A6.498 6.498 0 0 1 2 11.5C2 7.909 4.909 5 8.5 5S15 7.909 15 11.5 12.091 18 8.5 18zM8.25 7H7v4.59L11.375 14l.625-.941-3.75-2.043V7z"
      />
    </Svg>
  );
}
