import { StyleSheet, StatusBar, Platform } from 'react-native';
import { isIphoneX } from 'utils';
import { color, formattedColor } from 'theme';

const iPhoneSpace = isIphoneX() ? 40 : 20;
const topSpace = (Platform.OS === 'ios' ? iPhoneSpace : StatusBar.currentHeight) + 5;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    zIndex: 100
  },
  headerContainer: {
    width: '100%',
    zIndex: -1
  },
  content: {
    marginTop: Platform.OS === 'ios' ? -61 : -64,
    zIndex: 1000
  },
  gradient: {
    width: '100%',
    height: 60,
    flexDirection: 'row'
  },
  tab: {
    width: '33.3%',
    height: 60,
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabLabel: {
    color: color.white,
    fontSize: 12,
    textAlign: 'center'
  },
  searchBarContainer: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  searchBarInput: {
    minHeight: 32,
    margin: 0,
    marginHorizontal: 7,
    paddingLeft: 30,
    backgroundColor: formattedColor.white.opacity(0.15),
    color: color.white
  },
  searchBarIcon: {
    left: 15
  },
  iconLeftBtn: {
    paddingLeft: 5
  },
  iconRightBtn: {
    paddingRight: 5
  },
  activeCalendarFilter: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 0 : 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: color.warning
  },
  search: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 99,
    marginTop: topSpace + 6,
    paddingLeft: 4,
    paddingRight: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftPlaceholder: {
    height: 31
  }
});

export default styles;
