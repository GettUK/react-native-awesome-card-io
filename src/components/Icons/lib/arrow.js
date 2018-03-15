import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Arrow({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 18 18" {...rest}>
      <Path
        fill={color || '#fff'}
        fillRule="evenodd"
        transform="rotate(90 33 19)"
        d="M23 34l-1.586 1.586 6.277 6.289H14v2.25h13.691l-6.277 6.289L23 52l9-9z"
      />
    </Svg>
  );
}
