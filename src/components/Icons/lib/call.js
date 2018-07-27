import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Call({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 18 18" {...rest}>
      <Path fill="none" fillRule="evenodd" stroke={color || '#FFF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.532 13.268c.625.521.625 1.358-.008 1.876L14.987 16.4c-.63.515-1.773.754-2.54.491 0 0-3.096-.583-6.93-4.415C1.684 8.645 1.1 5.549 1.1 5.549c-.244-.772-.027-1.905.491-2.538L2.85 1.475c.515-.63 1.355-.634 1.877-.008l1.898 2.277c.347.416.387 1.116.084 1.57L5.864 6.58s.01 2.092 1.736 3.816c1.725 1.725 3.817 1.735 3.817 1.735l1.266-.843c.45-.301 1.157-.26 1.57.083l2.279 1.898z"/>
    </Svg>
  );
}
