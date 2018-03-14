import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  orderRideBtn: {
    backgroundColor: '#284784',
    flex: 1,
    height: 50,
    marginRight: 10,
    marginLeft: 10
  },
  orderBtnBottomText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
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
    bottom: 0,
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
});
