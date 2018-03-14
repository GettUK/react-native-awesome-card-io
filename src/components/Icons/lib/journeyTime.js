import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function JourneyTime({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 20 24" {...rest} >
      <Path
        fill={color}
        fillRule="nonzero"
        d="M17.89 8.524l1.745-1.676-1.768-1.696-1.744 1.675a10.154 10.154 0 0 0-4.872-1.943V2.4h2.5V0H6.25v2.4h2.5v2.483C3.825 5.477 0 9.513 0 14.4 0 19.693 4.486 24 10 24s10-4.307 10-9.6c0-2.215-.792-4.252-2.11-5.876zM10 21.6c-4.136 0-7.5-3.23-7.5-7.2S5.864 7.2 10 7.2s7.5 3.23 7.5 7.2-3.364 7.2-7.5 7.2zM8.75 8.4h2.5v6h-2.5v-6z"
      />
    </Svg>
  );
}
