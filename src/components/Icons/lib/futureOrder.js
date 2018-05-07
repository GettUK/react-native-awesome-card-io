import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function FutureOrder({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 26 26" {...rest}>
      <Path fill="none" stroke={color} strokeWidth="1.5" d="M12.988 1C6.364 1 1 6.376 1 13s5.364 12 11.988 12C19.624 25 25 19.624 25 13S19.624 1 12.988 1zM12.8 6v7.2l6.3 3.78"/>
    </Svg>
  );
}
