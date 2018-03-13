import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Camera({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 32 24" {...rest}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M3 4h4.169a1.5 1.5 0 0 0 1.272-.705L9.619 1.41A3 3 0 0 1 12.163 0h7.674a3 3 0 0 1 2.544 1.41l1.178 1.885A1.5 1.5 0 0 0 24.831 4H29a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm13 16a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0 1.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM3.5 1.5H6a.5.5 0 0 1 .5.5v1H3V2a.5.5 0 0 1 .5-.5zm22 6.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"
      />
    </Svg>
  );
}
