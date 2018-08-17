import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Account({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 18 22" {...rest}>
      <Path fill="none" fillRule="evenodd" stroke={color || '#D8D8D8'} strokeWidth="1.5" d="M1.01 3L1 19c0 1.1.89 2 1.99 2H15c1.1 0 2-.9 2-2V7l-6-6H3c-1.1 0-1.99.9-1.99 2zm15.265 4.254h-5.5v-5.5"/>
    </Svg>
  );
}
