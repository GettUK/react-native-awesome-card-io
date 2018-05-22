import React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';

export default function Arriving({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 23 20" {...rest}>
      <G transform="translate(-3 -3)" fill={color || '#284784'} fillRule="evenodd">
        <Rect width="22" height="2" x="1.333" y="17.333" rx="1"/>
        <Path d="M3.867 13.657L1.294 9.603a.645.645 0 0 1 .544-.99h.913c.168 0 .33.063.453.177l1.466 1.355 5.144-1.532-4.146-6.738A.667.667 0 0 1 6.007.9L7.491.358a.667.667 0 0 1 .69.145l6.933 6.648 5.414-1.323c1.55-.29 2.447-.011 2.688.835.242.846-.159 1.496-1.202 1.95l-17.39 5.324a.667.667 0 0 1-.757-.28z"/>
      </G>
    </Svg>
  );
}
