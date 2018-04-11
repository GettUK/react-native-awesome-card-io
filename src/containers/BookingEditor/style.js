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
    padding: 5
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
    height: 140,
    margin: 5
  },
  journeyDetails: {
    marginHorizontal: 20,
    alignSelf: 'stretch'
  },
  pointList: {
    marginHorizontal: 15,
    alignSelf: 'stretch',
    justifyContent: 'flex-start'
  },
  footer: {
    position: 'absolute',
    elevation: 2,
    left: 0,
    right: 0,
    bottom: isIphoneX() ? 15 : 0,
    paddingBottom: 10
  },
  settingsBtn: {
    marginRight: 15,
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
  timeBtn: {
    marginLeft: 15,
    padding: 5
  },
  currentPositionBtn: {
    alignSelf: 'flex-start',
    marginBottom: 15,
    marginLeft: 15
  },
  currentPositionBtnContent: {
    paddingHorizontal: 15
  },
  destinationBtns: {
    flexDirection: 'row',
    paddingHorizontal: 10
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
    marginRight: 10
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
  }
});
