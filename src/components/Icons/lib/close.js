import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Close({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 32 32" {...rest}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M17.491 16.002l8.2-8.202a1.055 1.055 0 0 0-1.49-1.491L16 14.51 7.8 6.309A1.054 1.054 0 1 0 6.309 7.8l8.2 8.202-8.2 8.202a1.055 1.055 0 0 0 1.49 1.49l8.201-8.2 8.2 8.202a1.054 1.054 0 1 0 1.491-1.491l-8.2-8.202z"
      />
    </Svg>
  );
}
