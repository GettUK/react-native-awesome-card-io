import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Sms({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 32 32" {...rest}>
      <Path
        fill={color}
        d="M19.3 17.8V20H7.2V8h6.6V7c0-.3.11-.7.22-1H7.2C5.99 6 5 6.9 5 8v16c0 1.1.99 2 2.2 2h12.1c1.21 0 2.2-.9 2.2-2v-8.2l-2.2 2zM13.8 24h-1.1c-.55 0-1.1-.5-1.1-1s.55-1 1.1-1h1.1c.66 0 1.1.5 1.1 1s-.44 1-1.1 1zM27 7v5c0 .5-.55 1-1.1 1h-4.4l-3.3 3v-3h-1.1c-.55 0-1.1-.5-1.1-1V7c0-.5.55-1 1.1-1h8.8c.66 0 1.1.4 1.1 1z"
      />
    </Svg>
  );
}
