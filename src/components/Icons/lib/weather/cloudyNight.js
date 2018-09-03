import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export default function CloudyNight({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 33 33" {...rest}>
      <G fill="none" fillRule="nonzero">
        <Path fill={color || '#FFC74A'} d="M22.173 10.64c-.01.089-.015.144-.02.199-.05.564 0 1.147.236 1.781l-1.315.49a5.332 5.332 0 0 1-.319-2.396l.022-.21c.27-2.774 2.457-5.16 5.074-5.508l1.232-.163-.497 1.14c-.146.335-.208.48-.289.688-.674 1.731-.714 3.226.242 4.768.527.85 1.212 1.403 2.04 1.73.792.314 1.462.384 2.623.382h1.226l-.513 1.017c-.33.653-1.563 1.913-2.574 2.495-.409.235-.922.465-1.543.695l-.488-1.315a9.037 9.037 0 0 0 1.332-.597c.38-.218.82-.581 1.195-.943a6.239 6.239 0 0 1-1.774-.429c-1.101-.436-2.026-1.183-2.716-2.295-1.102-1.777-1.174-3.517-.584-5.376-1.375.707-2.428 2.191-2.59 3.848z"/>
        <Path fill={color || '#8FD6FF'} d="M8.505 14.468C5.423 14.72 3 17.325 3 20.5c0 3.343 2.686 6.053 6 6.053.202 0 .403-.01.6-.03l13.2.03c.197-.012.397 0 .6 0 2.982 0 5.4-2.44 5.4-5.448 0-3.008-2.418-5.447-5.4-5.447-.634 0-1.242.11-1.807.312a6.83 6.83 0 0 0 .007-.312C21.6 11.98 18.645 9 15 9c-3.242 0-5.939 2.359-6.495 5.468zM15 7.5c3.972 0 7.272 2.878 7.966 6.671.144-.009.289-.013.434-.013 3.814 0 6.9 3.113 6.9 6.947 0 3.528-2.612 6.445-6 6.89l-16.2.058c-3.72-.502-6.6-3.691-6.6-7.553 0-3.559 2.455-6.574 5.792-7.356C8.352 9.837 11.432 7.5 15 7.5z"/>
      </G>
    </Svg>
  );
}
