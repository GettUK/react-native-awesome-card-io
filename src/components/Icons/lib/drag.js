import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Drag({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 24 19" {...rest}>
      <Path
        fill={color || '#D8D8D8'}
        fillRule="evenodd"
        d="M6.5 16h16a1.5 1.5 0 0 1 0 3h-16a1.5 1.5 0 0 1 0-3zm0-16h16a1.5 1.5 0 0 1 0 3h-16a1.5 1.5 0 0 1 0-3zm-5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 8h16a1.5 1.5 0 0 1 0 3h-16a1.5 1.5 0 0 1 0-3zm-5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm0 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
      />
    </Svg>
  );
}
