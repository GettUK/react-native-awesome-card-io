import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Call({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 18 18" {...rest}>
      <Path
        fill={color}
        d="M3.788 2c-.05 0-.11.04-.167.108L2.364 3.645c-.304.371-.455 1.15-.312 1.604a.877.877 0 0 1 .028.115c.005.022.615 2.88 4.143 6.406 3.528 3.526 6.386 4.135 6.415 4.141.043.009.091.022.132.036.424.145 1.208-.013 1.582-.32l1.537-1.257c.07-.057.11-.117.11-.165 0-.049-.04-.112-.109-.168l-2.278-1.898c-.073-.061-.295-.072-.376-.02l-1.265.843c-.166.111-.32.19-.56.168-.102 0-2.527-.035-4.52-2.027-1.993-1.992-2.028-4.416-2.028-4.519a.998.998 0 0 1 .168-.56l.843-1.264c.057-.084.045-.298-.02-.376L3.956 2.108C3.9 2.039 3.838 2 3.788 2m9.375 16c-.343 0-.676-.045-.978-.141-.533-.12-3.653-.953-7.376-4.675C1.06 9.435.24 6.296.13 5.799-.19 4.713.1 3.253.816 2.378L2.074.842C2.51.31 3.13.003 3.78 0h.01c.645 0 1.265.301 1.704.827l1.898 2.277c.63.757.694 1.946.147 2.766l-.65.977a4.984 4.984 0 0 0 1.417 2.841 5.062 5.062 0 0 0 2.846 1.417l.975-.65c.82-.547 2.01-.484 2.766.147L17.17 12.5c.53.44.831 1.065.828 1.714-.002.648-.31 1.269-.843 1.704l-1.536 1.257c-.644.528-1.58.825-2.456.825"
      />
    </Svg>
  );
}
