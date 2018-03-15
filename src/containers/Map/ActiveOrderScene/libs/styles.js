import { StyleSheet } from 'react-native';

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
    top: 16,
    left: 16
  },
  header: {
    position: 'absolute',
    top: 44,
    left: 16
  }
});
