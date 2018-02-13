import { Platform, StatusBar, StyleSheet, Dimensions } from 'react-native';

function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    paddingTop: (Platform.OS === 'ios' ? (isIphoneX() ? 40 : 20) : StatusBar.currentHeight) + 5,
    paddingHorizontal: 15,
    paddingBottom: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
    marginRight: 24
  },
  content: {
    marginTop: -47
  }
});

export default styles;
