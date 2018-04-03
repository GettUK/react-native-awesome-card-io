import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalContainer: {
    zIndex: 999,
    flex: 1,
    ...StyleSheet.absoluteFillObject
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'transparent'
  },
  activityIndicatorWrapper: {
    backgroundColor: 'rgba(40,71,132,0.6)',
    height: 120,
    width: 120,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
