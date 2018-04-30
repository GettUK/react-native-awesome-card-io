// https://github.com/facebook/react-native/issues/15114
import React from 'react';
import { Platform, Text } from 'react-native';

if (Platform.OS === 'android') {
  const oldRender = Text.prototype.render;
  Text.prototype.render = function render(...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [{ fontFamily: 'Roboto' }, origin.props.style]
    });
  };
}
