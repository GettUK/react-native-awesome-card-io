import React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

export default function OT({ ...rest }) {
  return (
    <Svg viewBox="0 0 64 64" {...rest}>
      <G fill="none" fillRule="evenodd" transform="translate(4.415 4.095)">
        <Circle cx="28" cy="28" r="29.8" fill="#284784" fillRule="nonzero" stroke="#FFF" strokeWidth="3.6"/>
        <Path fill="#FFF" d="M20.266 39c-4.703 0-8.455-2.532-8.455-9.153v-3.408c0-6.622 3.752-9.153 8.455-9.153 4.702 0 8.454 2.531 8.454 9.153v3.408c0 6.621-3.752 9.153-8.454 9.153zm3.37-12.805c0-3.432-1.145-4.893-3.533-4.893-2.412 0-3.508 1.461-3.508 4.893v3.408c0 3.433 1.12 4.893 3.508 4.893s3.533-1.46 3.533-4.893v-3.408zm19.976-4.893h-4.63v16.603c0 .316-.267.56-.56.56H34.67a.566.566 0 0 1-.56-.56V21.302h-4.654c-.317 0-.56-.219-.56-.535V17.82c0-.316.268-.535.56-.535h14.18c.317 0 .61.219.61.535v2.946a.63.63 0 0 1-.634.535z"/>
      </G>
    </Svg>
  );
}
