import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export default function PointOfInterest({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 16 19" {...rest}>
      <G fill="none" fill-rule="evenodd">
        <Path stroke={color || '#D8D8D8'} stroke-width="1.5" d="M.75.75v8.5h13.995L12.459 5 14.745.75H.75z"/>
        <Path fill={color || '#D8D8D8'} d="M0 0h1.5v19H0z"/>
      </G>
    </Svg>
  );
}
