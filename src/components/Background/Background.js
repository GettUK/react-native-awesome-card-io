import React from 'react';
import { ImageBackground } from 'react-native';

import assets from 'assets';

import { isIphoneX } from 'utils';

import styles from './styles';

export default function Background({ children, style = {} }) {
  return (
    <ImageBackground style={[styles.image, style]} source={assets[`loginBg${isIphoneX() ? 'X' : ''}`]}>
      {children}
    </ImageBackground>
  );
}
