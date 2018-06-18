import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'transparent'
  },

  image: {
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%'
  },

  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight - 2 : 0
  },

  logoRow: {
    flexDirection: 'row',
    width: 240,
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default styles;
