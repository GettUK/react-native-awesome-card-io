import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Message({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 24 21" {...rest}>
      <Path fill="none" stroke={color} strokeWidth="1.5" d="M9.888 17.264l-4.724 2.724a.094.094 0 0 1-.136-.114l1.312-3.627C3.14 14.81 1 12.197 1 9.207 1 4.676 5.925 1 12 1s11 3.675 11 8.208-4.925 8.207-11 8.207c-.722 0-1.428-.052-2.112-.15z"/>
    </Svg>
  );
}
