import { StyleSheet } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  bg: {
    backgroundColor: color.white,
    width: '100%'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white
  },
  listView: {
    paddingHorizontal: 0,
    paddingTop: 0
  }
});
