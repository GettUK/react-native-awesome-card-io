import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Sms({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 20 21" {...rest}>
      <Path
        fill={color}
        d="M13 11.816v2.2H2V2.014h6v-1c0-.3.1-.7.2-1H2c-1.1 0-2 .9-2 2v16.003c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V9.815l-2 2zm-5 6.2H7c-.5 0-1-.5-1-1s.5-1 1-1h1c.6 0 1 .5 1 1s-.4 1-1 1zM20 1.015v5c0 .5-.5 1-1 1h-4l-3 3.001v-3h-1c-.5 0-1-.5-1-1V1.013c0-.5.5-1 1-1h8c.6 0 1 .4 1 1z"
      />
    </Svg>
  );
}
