import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function MyLocation({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 20 21" {...rest}>
      <Path
        fill={color}
        d="M9.188 20.855a.844.844 0 0 1-.54-.707l-.961-6.733-6.418-.791c-.376-.045-.673-.359-.73-.755-.056-.396.13-.823.482-1.013L17.903.99c.35-.19.776-.151 1.041.125.265.276.325.724.163 1.086l-8.794 18.138c-.19.376-.55.588-.947.535-.057.028-.118.005-.178-.018zm-.525-9.206c.294.113.53.376.571.71l.749 4.516 6.193-12.618-12.218 6.716 4.487.617c.071.002.134.027.218.059z"
      />
    </Svg>
  );
}
