import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Home({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 26 26" {...rest}>
      <Path fill="none" fillRule="evenodd" stroke={color} strokeWidth="1.5" d="M10.068 23.91v-7.296h5.864v7.295c0 .188.152.341.34.341h6a1.976 1.976 0 0 0 1.978-1.981v-9.273c0-1.002-.6-2.3-1.366-2.951L13.22 1.83a.34.34 0 0 0-.442 0l-9.663 8.214c-.764.649-1.366 1.95-1.366 2.951v9.273c0 1.097.882 1.981 1.974 1.981h6.003a.34.34 0 0 0 .341-.34z"/>
    </Svg>
  );
}
