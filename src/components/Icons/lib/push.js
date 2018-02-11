import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Push({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 32 32" {...rest}>
      <Path
        fill={color}
        stroke={color}
        d="M14.821 27.004C7.111 27.004 5 24.893 5 17.18s2.111-9.823 9.821-9.823c.53 0 1.026.012 1.502.032a.393.393 0 0 1-.033.786 33.95 33.95 0 0 0-1.469-.033c-7.262 0-9.035 1.774-9.035 9.038s1.773 9.037 9.035 9.037c7.263 0 9.036-1.773 9.036-9.037 0-.518-.012-1.003-.032-1.47a.394.394 0 0 1 .376-.409c.217.004.4.16.409.376.02.477.033.972.033 1.503 0 7.712-2.111 9.823-9.822 9.823zm7.465-12.574a4.715 4.715 0 1 1 0-9.43 4.715 4.715 0 0 1 0 9.43z"
      />
    </Svg>
  );
}
