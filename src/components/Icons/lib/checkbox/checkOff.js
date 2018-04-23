import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function CheckOff({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 46 44" {...rest}>
        <G fill="none" fillRule="evenodd">
            <Path fill="#fff" d="M0 0h46v44H0z"/>
            <Path fill={color || '#c7c7cd'} d="M23 34c-6.075 0-11-4.925-11-11s4.925-11 11-11 11 4.925 11 11-4.925 11-11 11zm0-1c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z"/>
        </G>
    </Svg>
  );
}
