import { StyleSheet } from 'react-native';
import { color } from 'theme';
import { isIphoneX } from 'utils';

const topIPhone = isIphoneX() ? 34 : 20;

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: color.primaryBtns
  },
  animatedContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    alignSelf: 'stretch'
  },
  closeButton: {
    position: 'absolute',
    top: 16 + topIPhone,
    left: 16
  },
  header: {
    position: 'absolute',
    top: 40 + topIPhone,
    left: 16,
    right: 16
  }
});
