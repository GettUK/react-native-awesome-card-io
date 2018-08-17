import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Favorites({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 20 18" {...rest}>
      <Path
        fill="none"
        fillRule="evenodd"
        stroke={color || '#D8D8D8'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10 14.5l-5.29 2.781 1.01-5.89-4.28-4.172 5.915-.86L10 1l2.645 5.359 5.915.86-4.28 4.172 1.01 5.89z"
      />
    </Svg>
  );
}
