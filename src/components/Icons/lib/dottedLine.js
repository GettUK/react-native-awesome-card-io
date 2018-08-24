import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function DottedLine({ pointsNum = 4, gradientColorStart, gradientColorStop, ...rest }) {
  const applyColor = () => (
    <Defs>
      <LinearGradient id="a" x1="1.809%" x2="1.809%" y1="0%" y2="100%">
        <Stop offset="0%" stopColor={gradientColorStart || '#48B5FF'} />
        <Stop offset="100%" stopColor={gradientColorStop || '#615FFF'} />
      </LinearGradient>
    </Defs>
  );

  const render4Dots = () => (
    <Svg viewBox="0 0 2 14" {...rest}>
      {applyColor()}
      <Path
        fill="url(#a)"
        fillRule="evenodd"
        d="M8 23a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        transform="translate(-7 -23)"
      />
    </Svg>
  );

  const render5Dots = () => (
    <Svg width="2" height="18" {...rest}>
      {applyColor()}
      <Path
        fill="url(#a)"
        fillRule="evenodd"
        d="M32 114a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-16a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        transform="translate(-31 -98)"
      />
    </Svg>
  );

  const render9Dots = () => (
    <Svg viewBox="0 0 2 24" {...rest}>
      {applyColor()}
      <Path
        d="M1 74a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-32a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        transform="translate(0 -58)"
        fill="url(#a)"
        fillRule="evenodd"
      />
    </Svg>
  );

  if (pointsNum === 5) {
    return render5Dots();
  } else if (pointsNum === 9) {
    return render9Dots();
  }
  return render4Dots();
}
