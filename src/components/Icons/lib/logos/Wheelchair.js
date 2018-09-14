import React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

export default function Wheelchair({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 34 34" {...rest}>
      <G fill="none" fillRule="evenodd" stroke="#FFF" transform="translate(2 2)">
        <Circle cx="15" cy="15" r="16" fill="#284784" strokeWidth="2"/>
        <G strokeWidth="1.3" transform="translate(7 8)">
          <Path strokeLinecap="round" d="M.696 0h2.386l1.024 6.187c.91-.217 1.77-.198 2.585.058.813.255 1.548.706 2.204 1.35h3.706l.755 4.894h2.288"/>
          <Circle cx="5.217" cy="10.783" r="4.567"/>
          <Circle cx="5.217" cy="10.783" r="1.043"/>
          <Path strokeLinecap="round" strokeLinejoin="round" d="M4.278 3.478h5.366"/>
          <Path d="M13.054 11.13H9.739"/>
        </G>
      </G>
    </Svg>
  );
}
