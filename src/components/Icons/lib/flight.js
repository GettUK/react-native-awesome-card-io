import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Flight({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 21 21" {...rest}>
      <Path fill="none" stroke={color} strokeWidth="1.5" d="M6.687 14.338l-3.752-1.713 1.21-1.21 3.185.277L9.961 9.06 2 5.48l1.462-1.462L14.02 5.052l3.104-3.105c1.075-.983 1.946-1.2 2.612-.654.634.658.415 1.527-.657 2.606l-3.105 3.104 1.034 10.558-1.463 1.462-3.579-7.961-2.632 2.63.277 3.186-1.21 1.21-1.714-3.75z"/>
    </Svg>
  );
}
