import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Home({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 19 19" {...rest}>
      <Path
        fill="none"
        fillRule="evenodd"
        stroke={color || '#D8D8D8'}
        strokeWidth="1.5"
        d="M7.955 12.59v4.637a.773.773 0 0 1-.773.773H2.93A1.93 1.93 0 0 1 1 16.066V9.497c0-.864.495-1.934 1.155-2.495L9 1.184a.773.773 0 0 1 1 0l6.845 5.818C17.506 7.564 18 8.632 18 9.497v6.569A1.93 1.93 0 0 1 16.068 18h-4.25a.773.773 0 0 1-.773-.773v-4.636h-3.09z"
      />
    </Svg>
  );
}
