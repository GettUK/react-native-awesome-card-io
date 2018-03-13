import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Plus({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 15 14" {...rest}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M8.375 6.125h5.25a.875.875 0 1 1 0 1.75h-5.25v5.25a.875.875 0 1 1-1.75 0v-5.25h-5.25a.875.875 0 1 1 0-1.75h5.25V.875a.875.875 0 1 1 1.75 0v5.25z"
      />
    </Svg>
  );
}
