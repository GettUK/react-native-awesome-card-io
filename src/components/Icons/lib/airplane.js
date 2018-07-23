import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Airplane({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 12 12" {...rest}>
      <Path fill={color || '#8E8E93'} fillRule="nonzero" d="M10.757 5.07l-2.5.014L5.263.548l-1.01.003L5.748 5.09l-3.108.007-1.134-1.614-1.061.002.912 2.541-.852 2.549 1.009-.003 1.116-1.628 3.12.005-1.505 4.537 1.01-.002 3.012-4.55 2.492-.005a.93.93 0 0 0-.001-1.86z" opacity=".5"/>
    </Svg>
  );
}
