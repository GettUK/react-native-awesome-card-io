import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function CloseThick({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 20 20" {...rest}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M76.6848485,28.256277 L86.9705627,28.256277 L86.9705627,31.6848485 L76.6848485,31.6848485 L76.6848485,41.9705627 L73.256277,41.9705627 L73.256277,31.6848485 L62.9705627,31.6848485 L62.9705627,28.256277 L73.256277,28.256277 L73.256277,17.9705627 L76.6848485,17.9705627 L76.6848485,28.256277 Z"
        transform="rotate(135 46.613 6.509)"
      />
    </Svg>
  );
}
