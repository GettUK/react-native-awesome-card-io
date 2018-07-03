import React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

export default function OT({ ...rest }) {
  return (
    <Svg viewBox="0 0 34 34" {...rest}>
      <G fill="none" fillRule="evenodd">
        <Circle cx="15" cy="15" r="16" stroke="#FFF" fill="#2a4982" stroke-width="2" transform="translate(2 2)"/>
        <Path fill="#FFF" d="M12.692 23C10.082 23 8 21.6 8 17.942v-1.884C8 12.4 10.082 11 12.692 11c2.61 0 4.692 1.4 4.692 5.058v1.884c0 3.659-2.082 5.058-4.692 5.058zm1.87-7.076c0-1.897-.635-2.704-1.96-2.704-1.339 0-1.947.807-1.947 2.704v1.883c0 1.897.622 2.704 1.947 2.704 1.325 0 1.96-.807 1.96-2.704v-1.883zm11.086-2.704H23.08v9.175c0 .175-.148.309-.31.309h-2.083a.314.314 0 0 1-.31-.31V13.22h-2.584c-.175 0-.31-.121-.31-.296v-1.628c0-.175.148-.296.31-.296h7.87c.176 0 .338.121.338.296v1.628a.35.35 0 0 1-.352.296z"/>
      </G>
    </Svg>
  );
}
