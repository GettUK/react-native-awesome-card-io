import React from 'react';
import Svg, { Defs, Rect, G, Use, Circle, Ellipse } from 'react-native-svg';

export default function ReasonDriver({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 24 29" {...rest}>
      <Defs>
        <Rect id="a" width="24" height="16" y="13" rx="6"/>
        <Rect id="b" width="14" height="6" x="5" rx="3"/>
      </Defs>
      <G fill="none" fillRule="evenodd">
        <Use href="#a"/>
        <Rect width="22.5" height="14.5" x=".75" y="13.75" stroke={color} strokeWidth="1.5" rx="6"/>
        <Circle cx="12" cy="10" r="7" stroke={color} strokeWidth="1.5"/>
        <Ellipse cx="12" cy="5" stroke={color} strokeWidth="1.5" rx="5" ry="4"/>
        <G>
          <Use href="#b"/>
          <Rect width="12.5" height="4.5" x="5.75" y=".75" stroke={color} strokeWidth="1.5" rx="2.25"/>
        </G>
      </G>
    </Svg>
  );
}
