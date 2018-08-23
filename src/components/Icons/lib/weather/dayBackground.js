import React from 'react';
import Svg, { Path, LinearGradient, Stop, Defs } from 'react-native-svg';

export default function DayBackground({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 316 83" {...rest}>
      <Defs>
        <LinearGradient id="a" x1="38.782%" x2="72.603%" y1="35.043%" y2="76.446%">
          <Stop offset="0%" stopColor="#FFF" stopOpacity=".148"/>
          <Stop offset="100%" stopColor="#FFF" stopOpacity=".118"/>
        </LinearGradient>
      </Defs>
      <Path fill="url(#a)" fillRule="nonzero" d="M.998 67.99c59.02 30.796 111.43-10.561 171.592 4.06 67.309 16.357 92.117 53.868 143.415 50.837V151H.998V67.99z" transform="translate(-1 -68)"/>
    </Svg>
  );
}
