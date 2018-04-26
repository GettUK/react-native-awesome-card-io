import React from 'react';
import Svg, { Path, Circle, G } from 'react-native-svg';

export default function PickUpField({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 16 19" {...rest}>
      <G fill="none" fillRule="evenodd">
        <Circle cx="8" cy="9" r="6" fill="#FFF" />
        <Path
          fill={color || 'red'}
          fillRule="evenodd"
          d="M7.676 18.905C7.363 18.703 0 13.965 0 7.913 0 3.543 3.582.001 8 0c4.417 0 8 3.543 8 7.913 0 6.052-7.375 10.793-7.676 10.992a.605.605 0 0 1-.648 0zm.341-7.876a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
        />
      </G>
    </Svg>
  );
}
