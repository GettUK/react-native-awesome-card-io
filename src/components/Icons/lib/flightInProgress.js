import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop, G } from 'react-native-svg';

export default function FlightInProgress({ ...rest }) {
  return (
    <Svg viewBox="0 0 174 22" {...rest}>
      <Defs>
        <LinearGradient id="a" x1="3.902%" x2="98.923%" y1="50%" y2="50%">
          <Stop offset="0%" stopColor="#FCFDFF"/>
          <Stop offset="100%" stopColor="#284784"/>
        </LinearGradient>
      </Defs>
      <G fill="none" fillRule="evenodd">
        <Path fill="url(#a)" d="M2.5 18a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm52 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm65 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm-91 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm52 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm65 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm-130 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm52 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm65 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm-91 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm65 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm-13 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm65 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm13 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" transform="translate(0 -4)"/>
        <Path fill="#0076BB" fillRule="nonzero" d="M99.514 9.139l-5.002.029L88.528.097 86.509.1l2.985 9.078-6.216.014-2.269-3.228-2.121.005 1.825 5.083-1.706 5.096 2.019-.004 2.232-3.256 6.239.008-3.01 9.075 2.02-.005 6.025-9.098 4.985-.012A1.86 1.86 0 0 0 101.374 11c-.003-1.021-.84-1.869-1.86-1.861z"/>
      </G>
    </Svg>
  );
}
