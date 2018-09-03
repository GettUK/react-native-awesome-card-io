import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function Wind({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 12 12" {...rest}>
      <G fill="none" fillRule="nonzero" stroke={color || '#fff'} strokeLinecap="round">
        <Path d="M4.077 4.03c2.19.003 3.81.003 4.863 0 .874 0 1.652-.324 1.652-1.2 0-.584-.434-.952-1.3-1.103M2.518 8.008c2.169-.002 3.78-.002 4.832 0 .875 0 1.652.325 1.652 1.2 0 .585-.433.952-1.3 1.103M9.188 5.987H1.396"/>
      </G>
    </Svg>
  );
}
