import React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';

export default function Sms({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 26 26" {...rest}>
      <G fill="none" fillRule="evenodd">
        <Path fill={color} d="M18 13v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h5v1.498H4.3a.8.8 0 0 0-.8.8V22.7a.8.8 0 0 0 .8.8h11.4a.8.8 0 0 0 .8-.8V13H18z"/>
        <Rect width="1" height="1" x="9.5" y="21.5" fill={color} stroke={color} rx=".5"/>
        <Path stroke={color} strokeWidth="1.5" d="M14.35 12.19l2.84-2.84h5.51c.236 0 .55-.314.55-.55V2.3c0-.366-.184-.55-.55-.55H12.3c-.236 0-.55.314-.55.55v6.5c0 .236.314.55.55.55h2.05v2.84z"/>
      </G>
    </Svg>
  );
}
