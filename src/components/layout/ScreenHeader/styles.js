import { Platform, StatusBar, StyleSheet, Dimensions } from 'react-native';
import { isIphoneX } from 'utils';

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
