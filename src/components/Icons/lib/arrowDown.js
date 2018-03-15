import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ArrowDown({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 34 10" {...rest}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M17 5.187L3.3.152C2.06-.302.645.294.163 1.495-.32 2.704.306 4.04 1.556 4.5l14.55 5.347c.293.107.596.156.894.152.298.004.601-.045.894-.152L32.444 4.5c1.25-.46 1.877-1.797 1.392-3.006C33.354.295 31.939-.302 30.7.152L17 5.187z"
      />
    </Svg>
  );
}
