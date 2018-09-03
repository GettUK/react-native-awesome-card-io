import { StyleSheet, StatusBar } from 'react-native';
import { color } from 'theme';

import { isIphoneX, isIOS } from 'utils';

const headerPadding = !isIOS ? StatusBar.currentHeight + 5 : 25;
const iPhoneHeaderPadding = isIphoneX() ? 45 : headerPadding;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  headerWrap: {
    paddingTop: iPhoneHeaderPadding,
    paddingBottom: 15,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  headerTitle: {
    fontSize: 17,
    color: color.white,
    marginLeft: 0,
    textAlignVertical: 'top',
    lineHeight: 20,
    fontWeight: '600'
  },
  headerTitleCenter: {
    flex: 1,
    textAlign: 'center'
  },
  rightHeaderButton: {
    color: color.primaryText,
    fontSize: 14
  },
  prorderHeader: {
    backgroundColor: 'transparent',
    paddingTop: 0,
    paddingHorizontal: 16
  },
  badgeWrapperStyle: {
    position: 'absolute',
    top: 2,
    right: 6,
    width: 16,
    height: 16
  },
  badgeStyle: {
    width: 16,
    height: 16,
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: color.warning,
    borderRadius: 18,
    borderWidth: 0,
    marginHorizontal: 0,
    marginVertical: 0
  },
  badgeTextStyle: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
    color: color.white,
    fontSize: 8.5,
    borderRadius: 16,
    borderWidth: 0,
    marginTop: isIOS ? -7 : 0,
    marginLeft: isIOS ? 2 : 0
  }
});

export default styles;
