import React from 'react';
import Svg, { Path, G, Use, Defs, Rect } from 'react-native-svg';

export default function CurrentLocation({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 20 20" {...rest}>
      <Defs>
        <Rect id="a" width="20" height="20" rx="10"/>
      </Defs>
      <G fill="none" fillRule="evenodd">
        <Use fill="#88A9EC" href="#a"/>
        <Path
          fill="#FFF"
          fillRule="nonzero"
          d="M15.485 15.505c.502.54.819 1.304.8 2.124v1.061a8.824 8.824 0 0 1-5.95 2.31 8.769 8.769 0 0 1-6.62-2.999v-.372c0-.839.297-1.584.799-2.124S6.838 14.127 10 14.127c3.16 0 4.983.838 5.485 1.378zm-5.467-2.086a4.206 4.206 0 0 1-4.202-4.21A4.206 4.206 0 0 1 10.018 5a4.206 4.206 0 0 1 4.203 4.21 4.206 4.206 0 0 1-4.203 4.21z"
        />
      </G>
    </Svg>
  );
}
