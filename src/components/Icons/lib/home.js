import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Home({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 22 22" {...rest}>
      <Path
        fill={color}
        d="M9 15v6a1 1 0 0 1-1 1H2.497A2.497 2.497 0 0 1 0 19.497v-8.5c0-1.12.64-2.504 1.495-3.23L10.352.238a1 1 0 0 1 1.296 0l8.857 7.53C21.361 8.493 22 9.875 22 10.996v8.5A2.499 2.499 0 0 1 19.5 22H14a1 1 0 0 1-1-1v-6H9zm6 5h4.5c.278 0 .5-.222.5-.503v-8.5c0-.534-.381-1.359-.79-1.706L11 2.312 2.79 9.291c-.407.346-.79 1.173-.79 1.706v8.5c0 .281.221.503.497.503H7v-6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6z"
      />
    </Svg>
  );
}
