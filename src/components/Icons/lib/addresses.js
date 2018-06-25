import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Addresses({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 26 26" {...rest}>
      <Path fill="none" fillRule="evenodd" stroke={color} strokeWidth="1.5" d="M13.115 23.89C12.744 23.656 4 18.17 4 11.163 4 6.103 8.253 2 13.499 2c5.247 0 9.5 4.102 9.501 9.163 0 7.007-8.758 12.496-9.115 12.727a.732.732 0 0 1-.77 0zM13.5 15a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
    </Svg>
  );
}
