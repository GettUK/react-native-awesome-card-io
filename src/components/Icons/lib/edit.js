import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function Edit({ color, ...rest }) {
  return (
    <Svg width="13" height="16" {...rest}>
      <G fill="none" fillRule="evenodd" stroke={color || '#BBBBBF'}>
        <Path d="M1.864 10.545l2.882 2.252 7.178-9.188a.998.998 0 0 0-.172-1.402l-1.308-1.022a.998.998 0 0 0-1.401.172l-7.179 9.188z"/>
        <Path d="M6.579 4.51l1.34-1.716 2.882 2.252-1.34 1.716zM1.517 11.509l-.615 3.237 2.993-1.38-2.378-1.857z"/>
      </G>
    </Svg>
  );
}
