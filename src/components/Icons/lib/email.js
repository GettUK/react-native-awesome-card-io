import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Email({ color, ...rest }) {
  return (
    <Svg viewBox="0 0 32 32" {...rest}>
      <Path fill={color} d="M28.995 13.317c-.005-.643-.328-1.229-.89-1.612l-3.26-2.202v-.756c0-1.101-.973-1.999-2.166-1.999h-1.914l-3.49-2.358a2.278 2.278 0 0 0-2.55 0L11.23 6.748H9.316c-1.193 0-2.165.898-2.165 1.999v.756l-3.266 2.202c-.557.378-.88.96-.885 1.598v.018l.051 14.017c0 .369.323.666.722.666h24.505c.4 0 .722-.297.722-.666V13.321c-.005 0-.005 0-.005-.004zm-4.15-2.16l2.41 1.626c.19.127.297.326.297.538a.642.642 0 0 1-.297.54l-2.41 1.625v-4.329zm-9.27-5.69a.756.756 0 0 1 .84 0l1.898 1.286h-4.642l1.904-1.286zM8.59 8.752c0-.369.322-.667.722-.667h13.363c.4 0 .722.298.722.667v7.717l-6.981 4.716a.762.762 0 0 1-.845 0L8.584 16.47V8.752h.005zm-3.854 4.03l2.41-1.625v4.334l-2.41-1.63a.647.647 0 0 1-.292-.535.633.633 0 0 1 .292-.543zm-.287 2.538l7.273 4.91-7.237 5.643-.036-10.553zm1.244 11.356l7.227-5.633 1.807 1.22c.378.255.824.382 1.269.382.445 0 .89-.127 1.274-.382l1.802-1.22 7.227 5.633H5.692zm21.86-.77l-7.278-5.676 7.278-4.914v10.59zM10.759 12.24c-.4 0-.727-.297-.722-.666 0-.369.323-.666.722-.666h10.477c.399 0 .721.297.721.666 0 .369-.322.666-.721.666H10.759zm11.198 2.836c0 .368-.327.666-.721.666H10.759c-.4 0-.722-.298-.722-.666 0-.369.323-.667.722-.667h10.477c.399 0 .721.298.721.667z" />
    </Svg>
  );
}
