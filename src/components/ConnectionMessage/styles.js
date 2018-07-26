import { StyleSheet, Platform } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 99,
    position: 'absolute',
    left: 0
  },
  messageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.danger
  },
  messageWrapper: {
    paddingTop: Platform.OS === 'android' ? 14 : 22,
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

