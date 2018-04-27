import React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';

export default function Arriving({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 23 22" {...rest}>
      <G transform="translate(-3 -3)" fill={color || '#284784'} fillRule="evenodd">
        <Rect x="3.333" y="22.333" width="22" height="2" rx="1"/>
        <Path d="M3.7 13.731l-.201-4.797a.645.645 0 0 1 .967-.585l.79.456c.145.084.254.22.303.38l.593 1.906 5.22 1.246-.222-7.908a.667.667 0 0 1 .782-.676l1.556.273c.25.044.454.227.525.471l2.68 9.223 5.35 1.562c1.488.525 2.125 1.214 1.911 2.067-.213.853-.885 1.216-2.016 1.088L4.216 14.353a.667.667 0 0 1-.516-.622z"/>
      </G>
    </Svg>
  );
}
