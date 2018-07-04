import { StyleSheet } from 'react-native';

import { isIphoneX } from 'utils';

export default StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    flex: 1
  },
  orderRideBtn: {
    alignSelf: 'stretch',
    flex: 1,
    padding: 5,
    marginRight: 15
  },
  orderRideBtnView: {
    alignSelf: 'stretch',
    backgroundColor: '#284784',
    flex: 1,
    height: 50
  },
  orderRideBtnDisabled: {
    backgroundColor: '#e4e4e4'
  },
  orderBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  orderBtnTextDisabled: {
    color: '#acabab'
  },
  carItems: {
    paddingHorizontal: 15
  },
  carLoading: {
    alignSelf: 'center',
    height: 144,
    margin: 5
  },
  journeyDetails: {
    elevation: 2,
    marginHorizontal: 20,
    alignSelf: 'stretch'
  },
  pointList: {
    position: 'absolute',
    elevation: 2,
    left: 0,
    right: 0,
    marginHorizontal: 20,
    alignSelf: 'stretch',
    justifyContent: 'flex-start'
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  footerOrderInfo: {
    marginBottom: isIphoneX() ? 25 : 10,
    marginTop: 5
  },
  footerOrder: {
    paddingBottom: isIphoneX() ? 25 : 10
  },
  selectAddress: {
    elevation: 2,
    backgroundColor: '#fff',
    paddingTop: 11,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  settingsBtn: {
    marginLeft: 15,
    padding: 5
  },
  btnView: {
    width: 50,
    height: 50
  },
  rowActions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  padding: {
    padding: 5
  },
  currentPositionBtn: {
    alignSelf: 'flex-start',
    marginBottom: 15,
    marginLeft: 15
  },
  currentPositionBtnContent: {
    paddingHorizontal: 15,
    margin: 2
  },
  destinationBtnsContainer: {
    minHeight: 80,
    marginBottom: isIphoneX() ? 15 : 0,
    justifyContent: 'center'
  },
  destinationBtns: {
    flexDirection: 'row',
    padding: 10
  },
  destinationBtnsSpinner: {
    alignSelf: 'center'
  },
  searchIcon: {
    marginRight: 15
  },
  selectDestinationText: {
    color: '#8794a0',
    fontSize: 16
  },
  customDestinationText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  settingsMenuItem: {
    marginLeft: 15,
    paddingVertical: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignContent: 'center'
  },
  settingsMenuItemTitle: {
    fontSize: 17,
    color: '#000'
  },
  settingsMenuSelectedValue: {
    fontSize: 17,
    color: '#8e8e93',
    textAlign: 'right',
    marginRight: 10,
    marginLeft: 2
  },
  flex: {
    flex: 1
  },
  settingsModal: {
    paddingBottom: 15
  },
  settingsMenuSeparator: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#bcbbc1',
    marginLeft: 15
  },
  informText: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 11
  },
  iconItem: {
    marginRight: 15
  },
  labelText: {
    flex: 1,
    fontSize: 16
  },
  selectAddressView: {
    marginHorizontal: 16,
    marginTop: 15
  },
  iconContainer: {
    position: 'relative'
  },
  iconDottedLine: {
    position: 'absolute',
    top: -6,
    left: -3
  },
  pickupTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: 50,
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  pickupTime: {
    marginLeft: 17,
    flex: 1
  },
  pickupTimeLabel: {
    fontSize: 14,
    color: '#7f7f7f',
    marginBottom: 2
  },
  pickupTimeValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000'
  },
  pickupTimeEdit: {
    color: '#284784'
  },
  popupLocationTitle: {
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 0
  },
  btnStyle: {
    backgroundColor: '#fff'
  },
  btnTextStyle: {
    color: '#7f7f7f'
  },
  popupCards: {
    fontSize: 17,
    marginVertical: 8,
    marginHorizontal: 5,
    textAlign: 'center'
  }
});
