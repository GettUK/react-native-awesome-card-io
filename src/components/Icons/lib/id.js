import React from 'react';
import Svg, { G, Path, Rect } from 'react-native-svg';

export default function Id({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 24 24" {...rest}>
      <G fill="none" fillRule="evenodd">
        <Rect width="24" height="24" fill={color || '#e6e6e6'} rx="12"/>
        <Path
          fill="#FFF"
          d="M8.138 17.375H6V7h2.138v10.375zm1.98 0V7h3.193c.912 0 1.728.205 2.448.616.72.411 1.281.996 1.685 1.753.404.758.606 1.619.606 2.583v.478c0 .964-.199 1.822-.595 2.572a4.261 4.261 0 0 1-1.679 1.746c-.722.413-1.536.622-2.444.627H10.12zm2.138-8.643v6.926h1.034c.836 0 1.475-.273 1.916-.82.442-.546.668-1.327.677-2.344v-.549c0-1.054-.218-1.854-.655-2.398-.437-.543-1.076-.815-1.917-.815h-1.055z"
        />
      </G>
    </Svg>
  );
}
