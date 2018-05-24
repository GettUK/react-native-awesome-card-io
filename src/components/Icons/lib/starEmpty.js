import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function StarEmpty({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 30 28" {...rest}>
        <Path fill="none" fillRule="evenodd" stroke={color} d="M15 22.5l-8.817 4.635 1.684-9.817-7.133-6.953 9.858-1.433L15 0l4.408 8.932 9.858 1.433-7.133 6.953 1.684 9.817z" opacity=".6"/>
    </Svg>
  );
}
