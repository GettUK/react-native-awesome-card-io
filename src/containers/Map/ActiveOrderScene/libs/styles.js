import { StyleSheet, Platform } from 'react-native';

import { isIphoneX } from 'utils';

const topIPhone = isIphoneX() ? 34 : 20;

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#274d86'
  },
  animatedContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    alignSelf: 'stretch'
  },
  closeButton: {
    position: 'absolute',
    top: 16 + (Platform.OS === 'ios' ? topIPhone : 0),
    left: 16
  },
  header: {
    position: 'absolute',
    top: 44 + (Platform.OS === 'ios' ? topIPhone : 0),
    left: 16
  }
});
