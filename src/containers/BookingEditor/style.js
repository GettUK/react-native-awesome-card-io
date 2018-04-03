import { StyleSheet } from 'react-native';

import { isIphoneX } from 'utils';

export default StyleSheet.create({
  orderRideBtn: {
    backgroundColor: '#284784',
    flex: 1,
    height: 50,
    marginRight: 10,
    marginLeft: 10
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
    paddingBottom: 15
  },
  settingsBtn: {
    width: 50,
    height: 50,
    marginRight: 20
  },
  rowActions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5
  },
  timeBtn: {
    width: 50,
    height: 50,
    marginLeft: 20
  },
  currentPositionBtn: {
    width: 50,
    height: 50,
    marginBottom: 20,
    marginLeft: 15
  },
  destinationBtns: {
    flexDirection: 'row',
    paddingHorizontal: 15
  },
  destinationBtn: {
    marginRight: 10
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
  },
});
