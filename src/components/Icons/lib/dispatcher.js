import React from 'react';
import Svg, { Rect, Ellipse, Path, G } from 'react-native-svg';

export default function dispatcher({ color, ...rest }) {
  return (
      <Svg width="21px" height="26px" viewBox="0 0 21 26" {...rest}>
        <G transform="translate(1 1)" strokeWidth="1.5" stroke="#6BC11A" fill="none" fillRule="evenodd">
          <Path d="M9.122 23.98c4.81 0 6.26-1.932 7.471-5.498 1.13-.263 1.746-.925 2.171-2.482.284-1.038.142-2.063-.425-3.075 1.028-3.736.629-6.822-1.198-9.256C15.313 1.234 12.804.01 9.61 0l-.697.734C4.289.919 1.554 2.73.709 6.167c-.845 3.437-.845 5.69 0 6.758C0 13.737-.177 14.762.177 16c.355 1.238 1.074 2.065 2.16 2.482 1.316 3.666 3.577 5.498 6.785 5.498z" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M.612 12.935c.268-1.676 1.063-3.033 2.383-4.07 1.98-1.558 2.654-1.003 4.57-1.417 1.277-.276 2.46-.841 3.55-1.695 1.336-.038 2.805.7 4.408 2.213 1.604 1.514 2.513 3.17 2.728 4.969 1.002-3.742.602-6.833-1.202-9.274C15.245 1.221 12.739 0 9.531 0l-.7.735C4.168.941 1.428 2.748.612 6.157c-.816 3.409-.816 5.668 0 6.778z" strokeLinecap="round" strokeLinejoin="round"/>
          <Path d="M16.344 19.908l-4.944.252"/>
          <Rect x="10.25" y="19.95" width="1.502" height="1" rx=".5"/>
          <Ellipse cx="5.463" cy="13.2" rx="1" ry="1"/>
          <Ellipse cx="13.063" cy="13.2" rx="1" ry="1"/>
        </G>
      </Svg>
  );
}
