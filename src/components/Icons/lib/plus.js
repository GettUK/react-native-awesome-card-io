import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export default function Plus({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 14 14" {...rest}>
      <G fill={color} fillRule="evenodd">
        <Path d="M6 0h2v14H6z" />
        <Path d="M14 6v2H0V6z" />
      </G>
    </Svg>
  );
}
