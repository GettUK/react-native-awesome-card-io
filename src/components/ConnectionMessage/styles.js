import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 99
  },
  messageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff0000'
  },
  messageWrapper: {
    paddingTop: Platform.OS === 'android' ? 0 : 22,
    flex: 1,
    paddingHorizontal: 16
  },
  message: {
    fontSize: 12,
    color: 'white'
  },
  icon: {
    width: 40,
    height: 40,
    paddingTop: 22,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

