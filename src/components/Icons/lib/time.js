import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Time({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 24 24" {...rest} >
      <Path
        fill={color}
        fillRule="evenodd"
        d="M11.988 0C5.364 0 0 5.376 0 12s5.364 12 11.988 12C18.624 24 24 18.624 24 12S18.624 0 11.988 0zM12 21.6A9.597 9.597 0 0 1 2.4 12c0-5.304 4.296-9.6 9.6-9.6 5.304 0 9.6 4.296 9.6 9.6 0 5.304-4.296 9.6-9.6 9.6zM12.6 6h-1.8v7.2l6.3 3.78.9-1.476-5.4-3.204V6z"
      />
    </Svg>
  );
}
