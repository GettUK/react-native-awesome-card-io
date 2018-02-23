import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Star({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 53.867 53.867" {...rest}>
      <Path fill={color} d="M26.934 1.318l8.322 16.864 18.611 2.705L40.4 34.013l3.179 18.536-16.645-8.751-16.646 8.751 3.179-18.536L0 20.887l18.611-2.705z" />
    </Svg>
  );
}
