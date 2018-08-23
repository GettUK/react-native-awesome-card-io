import { StyleSheet } from 'react-native';

import { color } from 'theme';
import { isIphoneX } from 'utils';

export default StyleSheet.create({
  container: StyleSheet.absoluteFillObject,
  flex: {
    flex: 1
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  items: {
    paddingHorizontal: 15,
    paddingTop: 20,
    marginBottom: isIphoneX() ? 20 : 0
  },
  loaderWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center'
  },
  loader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: color.primaryBtns
  },
  loaderLabel: {
    textAlign: 'center',
    color: color.white
  },
  emptyLabel: {
    color: color.secondaryText,
    fontSize: 22
  },
  loading: {
    textAlign: 'center',
    margin: 10
  }
});
