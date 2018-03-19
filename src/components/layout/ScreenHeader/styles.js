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

const iPhoneSpace = isIphoneX() ? 40 : 20;
const topSpace = (Platform.OS === 'ios' ? iPhoneSpace : StatusBar.currentHeight) + 5;

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  header: {
    paddingTop: topSpace,
    paddingHorizontal: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: 'white',
    fontSize: 17
  },
  backBtn: {
    flexDirection: 'row',
    position: 'absolute',
    top: topSpace + 1,
    left: 10,
    zIndex: 10
  },
  backIcon: {
    marginRight: 3
  },
  rightContent: {
    position: 'absolute',
    top: topSpace + 1,
    right: 10,
    zIndex: 10
  }
});
