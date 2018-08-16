import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export default function Restaurant({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 18 21" {...rest}>
      <G fill="none" fillFule="evenodd" stroke={color || '#D8D8D8'} strokeWidth="1.5">
        <Path d="M16.905 19.292c-.14.621-.528.932-1.164.932-.637 0-1.028-.31-1.173-.932v-7.368l-1.192-1.057c-.25-.169-.376-.789-.376-1.86V7.598c0-.311.214-3.315 2.374-6.4.166-.199.365-.435.844-.435.415.02.644.276.687.766v17.763zM1 0v6.99c0 1.268.648 1.902 1.945 1.902-.011 1.455-.011 4.75 0 9.886.044.975.557 1.463 1.54 1.463s1.475-.488 1.475-1.463V8.892c1.364-.049 2.034-.683 2.01-1.902V0M4.487 0v6.737"/>
      </G>
    </Svg>
  );
}
