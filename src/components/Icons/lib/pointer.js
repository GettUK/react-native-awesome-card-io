import React from 'react';
import Svg, { Path, LinearGradient, Defs, G, Rect, Stop } from 'react-native-svg';

export default function Pointer({ ...rest }) {
  return (
    <Svg viewBox="0 0 32 32" {...rest}>
      <Defs>
        <LinearGradient id="map_pointer-a" x1="3.681%" x2="101.516%" y1="101.484%" y2="2.681%">
          <Stop offset="0" stopColor="#0076BB"/>
          <Stop offset="1" stopColor="#284784"/>
        </LinearGradient>
      </Defs>
      <G fill="none" fillRule="evenodd">
        <Path fill="url(#map_pointer-a)" d="M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z M16,22 C19.3137085,22 22,19.3137085 22,16 C22,12.6862915 19.3137085,10 16,10 C12.6862915,10 10,12.6862915 10,16 C10,19.3137085 12.6862915,22 16,22 Z"/>
        <Rect width="12" height="12" x="10" y="10" fill="#FFF" rx="6"/>
      </G>
    </Svg>
  );
}
