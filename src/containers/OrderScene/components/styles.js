import { StyleSheet, Dimensions } from 'react-native';

import { color } from 'theme';

import { isIphoneX } from 'utils';

const { height, width } = Dimensions.get('window');

export const fbStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    elevation: 2,
    shadowColor: color.primaryText,
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
    backgroundColor: color.white,
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 16
  },
  listItemReference: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  activeItem: {
    elevation: 2,
    shadowColor: color.primaryText,
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
    color: color.white
  },
  subHeader: {
    flexDirection: 'row'
  },
  subHeaderTitle: {
    color: color.white
  },
  serviceId: {
    color: color.white,
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
    color: color.secondaryText,
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
    backgroundColor: color.success
  },
  rateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.warning
  },
  title: {
    color: color.secondaryText,
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
  listOptionReferenceHeader: {
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingTop: 14,
    paddingBottom: 10,
    marginVertical: 0,
    backgroundColor: color.bgSettings
  },
  receiptBtn: {
    backgroundColor: 'transparent'
  },
  receiptBtnWrapper: {
    alignSelf: 'flex-end',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.white,
    borderRadius: 8
  },
  receiptBtnText: {
    color: color.white,
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
    backgroundColor: color.white
  },
  container: {
    flex: 1,
    paddingTop: isIphoneX() ? 40 : 30,
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
    color: color.white,
    marginBottom: 10,
    textAlign: 'center'
  },
  subHeader: {
    fontSize: 14,
    color: color.white,
    textAlign: 'center'
  },
  title: {
    marginTop: 40,
    marginBottom: 25,
    fontSize: 22,
    color: color.white,
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
    backgroundColor: color.white,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 17,
    shadowColor: color.primaryText,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      height: 0
    }
  },
  reasonTitle: {
    fontSize: 17,
    color: color.primaryBtns,
    fontWeight: 'bold',
    marginLeft: 15
  }
});
