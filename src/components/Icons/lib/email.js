import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function Email({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 26 26" {...rest}>
      <G fill="none" fillRule="evenodd" stroke={color} strokeWidth="1.5">
        <Path d="M23.73 9.31l-3.448-2.523v-.779c0-.69-.56-1.25-1.25-1.25H17.51l-.198-.144-3.581-2.62a1.22 1.22 0 0 0-1.465.001l-3.72 2.72H7c-.69 0-1.25.56-1.25 1.25v.794l-.307.225L2.26 9.31a1.229 1.229 0 0 0-.511.993l.047 13.951H24.25V10.332a1.27 1.27 0 0 0-.52-1.022zM1.796 24.338z"/>
        <Path d="M5.75 13.451l5.75 5.18a2.25 2.25 0 0 0 3.007.005l5.743-5.14V6c0-.69-.56-1.25-1.25-1.25H7c-.69 0-1.25.56-1.25 1.25v7.451z"/>
        <Path d="M2.022 10.077l9.642 8.712a2 2 0 0 0 2.676.005l9.72-8.717M1.995 24.009l8.012-6.959M24.012 23.959L16 17"/>
        <Path strokeLinecap="round" d="M9 9h8.033M9 12h8.033"/>
      </G>
    </Svg>
  );
}
