import { StyleSheet } from 'react-native';

import { color } from 'theme';

import { isIphoneX } from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative'
  },
  floatButton: {
    marginRight: 20,
    marginLeft: 20
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 60
  },
  header: {
    marginTop: isIphoneX() ? 18 : 22,
    fontSize: 22,
    fontWeight: '500'
  },
  separator: {
    flex: 1
  },
  footer: {
    width: '100%'
  },
  actionContainer: {
    alignItems: 'center',
    paddingTop: 50
  },
  actionsRow: {
    flexDirection: 'row'
  },
  createBtnWrapper: {
    position: 'absolute',
    top: -60,
    right: 16,
    zIndex: 100
  },
  createNewBtn: {
    marginHorizontal: 2
  },
  createNewText: {
    color: color.primaryBtns,
    fontWeight: 'bold'
  },
  whiteText: {
    color: color.white
  }
});
