import { StyleSheet, Dimensions } from 'react-native';

import { isIphoneX } from 'utils';

const { height, width } = Dimensions.get('window');

export const screenStyles = StyleSheet.create({
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
    color: '#284784',
    fontWeight: 'bold'
  },
  whiteText: {
    color: '#fff'
  }
});

export const fbStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  label: {
    marginTop: 8
  }
});

export const onMyWayStyles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  button: {
    alignSelf: 'flex-end',
    padding: 16
  },
  buttonText: {
    color: '#5d75a1',
    fontWeight: '600'
  },
  listItem: {
    width: width - 32,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6'
  },
  listItemTitle: {
    fontSize: 16
  }
});

export const orderPanelStyles = StyleSheet.create({
  flex: {
    flex: 1
  },
  activeContainer: {
    padding: 16,
    paddingVertical: 6
  },
  listItem: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 16
  },
  activeItem: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  row: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    fontSize: 32,
    fontWeight: '600',
    paddingVertical: 12,
    color: '#fff'
  },
  subHeader: {
    flexDirection: 'row'
  },
  subHeaderTitle: {
    color: '#fff'
  },
  serviceId: {
    color: '#fff',
    fontWeight: '900',
    paddingLeft: 5
  },
  driverContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginTop: 4
  },
  roundContainer: {
    width: 44,
    height: 44,
    borderRadius: 22
  },
  driverCarInfo: {
    color: '#7F7F7F',
    fontSize: 14,
    marginBottom: 5,
    lineHeight: 17
  },
  driverLicense: {
    fontSize: 17,
    fontWeight: '900'
  },
  callButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6ebe2d'
  },
  rateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6b530'
  },
  title: {
    color: '#a4a4a4',
    marginBottom: 4
  },
  name: {
    fontSize: 18,
    fontWeight: '900'
  },
  priceLabel: {
    textAlign: 'right'
  },
  pointList: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  journeyDetails: {
    shadowRadius: 0,
    shadowColor: 'transparent',
    marginVertical: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 12
  },
  divider: {
    marginLeft: -16,
    marginRight: -16,
    marginVertical: 8
  },
  listOption: {
    alignSelf: 'stretch',
    marginVertical: 4
  },
  receiptBtn: {
    backgroundColor: 'transparent'
  },
  receiptBtnWrapper: {
    alignSelf: 'flex-end',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#fff',
    borderRadius: 8
  },
  receiptBtnText: {
    color: '#fff',
    marginHorizontal: 10
  },
  carImage: { width: 90, height: 38 }
});

const circleSize = width * 0.6;

export const pointerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: (width / 2) - (circleSize / 2),
    top: (height / 2) - circleSize,
    height: circleSize,
    width: circleSize,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    position: 'absolute'
  }
});

export const cancelReasonStyles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 15
  },
  closeIcon: {
    alignSelf: 'flex-end'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40
  },
  header: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center'
  },
  subHeader: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center'
  },
  title: {
    marginTop: 40,
    marginBottom: 25,
    fontSize: 22,
    color: '#fff',
    textAlign: 'center'
  },
  list: {
    alignSelf: 'stretch',
    paddingBottom: 10
  },
  reason: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 17,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      height: 0
    }
  },
  reasonTitle: {
    fontSize: 17,
    color: '#284784',
    fontWeight: 'bold',
    marginLeft: 15
  }
});
