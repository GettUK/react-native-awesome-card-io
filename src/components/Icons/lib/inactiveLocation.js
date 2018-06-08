import React from 'react';
import Svg, { Path, Rect, G } from 'react-native-svg';

export default function InactiveLocation({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 20 21" {...rest}>
      <G transform="translate(-2 -4)">
        <Path fill={color} d="M11.188 24.855a.844.844 0 0 1-.54-.707l-.961-6.733-6.418-.791c-.376-.045-.673-.359-.73-.755-.056-.396.131-.823.482-1.013L19.903 4.99c.351-.19.777-.152 1.041.125.265.276.325.723.163 1.085l-8.794 18.14c-.19.375-.55.587-.947.534-.057.028-.118.005-.178-.018zm-.525-9.206c.294.113.531.376.571.71l.749 4.516 6.193-12.618-12.218 6.716 4.487.617c.071.002.134.026.218.059z"/>
        <Rect width="24.2" height="2" x=".163" y="12.263" fill="#FFF" rx="1" transform="rotate(45 12.263 13.263)"/>
        <Rect width="24.2" height="1.473" y="14" fill="red" rx=".736" transform="rotate(45 12.1 14.736)"/>
      </G>
    </Svg>
  );
}
