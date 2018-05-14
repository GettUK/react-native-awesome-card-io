import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default ({ children, style }) => {
  const gradientColors = ['#0076bb', '#284784'];
  const gradientStart = { x: 0, y: 1 };
  const gradientEnd = { x: 1, y: 1 };

  return (
    <LinearGradient
      style={style}
      start={gradientStart}
      end={gradientEnd}
      colors={gradientColors}
    >
      {children}
    </LinearGradient>
  );
};
