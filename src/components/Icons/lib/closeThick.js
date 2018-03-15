import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function CloseThick({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 20 20" {...rest}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M9.971 12.395l-7.273 7.273-2.424-2.424 7.273-7.273L.274 2.698 2.698.274l7.273 7.273L17.244.274l2.425 2.424-7.273 7.273 7.273 7.273-2.425 2.424-7.273-7.273z"
      />
    </Svg>
  );
}
