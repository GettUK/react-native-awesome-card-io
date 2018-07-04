import { StyleSheet, Platform, StatusBar } from 'react-native';

import { isIphoneX } from 'utils';

const headerPadding = Platform.OS === 'android' ? StatusBar.currentHeight + 5 : 25;
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
    color: '#fff',
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
    color: '#000',
    fontSize: 14
  },
  prorderHeader: {
    backgroundColor: 'transparent',
    paddingTop: 0,
    paddingHorizontal: 16
  }
});

export default styles;
