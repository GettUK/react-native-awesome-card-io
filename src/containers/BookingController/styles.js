import { StyleSheet } from 'react-native';

import { isIphoneX } from 'utils';

export default StyleSheet.create({
  listOption: {
    paddingHorizontal: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  titleContainer: {
    flex: 1,
    paddingRight: 12,
    justifyContent: 'center',
    height: 45
  },
  iconGap: {
    paddingLeft: 12
  },
  title: {
    color: '#a4a4a4'
  },
  emptyValueTitle: {
    fontSize: 17
  },
  value: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '900'
  },
  valueWithError: {
    color: '#f00'
  },
  divider: {
    marginLeft: -16,
    marginRight: -16,
    marginVertical: 8
  },
  errorDot: {
    position: 'absolute',
    marginLeft: -10,
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#f00'
  },

  bookingBtnView: {
    alignSelf: 'stretch',
    backgroundColor: '#284784',
    flex: 1,
    height: 50
  },
  bookingBtnDisabled: {
    backgroundColor: '#e4e4e4'
  },
  bookingBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  bookingBtnTextDisabled: {
    color: '#acabab'
  },
  bookingBtnLoading: {
    alignSelf: 'center',
    height: 144,
    margin: 5
  },
  footerOrderInfo: {
    marginBottom: isIphoneX() ? 25 : 10,
    marginTop: 5
  },
  informText: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21
  },
  popupLocationTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 0,
    marginBottom: 0
  }
});
