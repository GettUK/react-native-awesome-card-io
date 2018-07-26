import { StyleSheet } from 'react-native';
import { color } from 'theme';
import { isIphoneX } from 'utils';

export default StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    flex: 1
  },
  nextStepBtn: {
    alignSelf: 'stretch',
    flex: 1,
    padding: 5,
    marginHorizontal: 15
  },
  bookingBtnView: {
    alignSelf: 'stretch',
    backgroundColor: color.primaryBtns,
    flex: 1,
    height: 50
  },
  bookingBtnDisabled: {
    backgroundColor: color.bgSearch
  },
  bookingBtnText: {
    color: color.white,
    fontWeight: 'bold',
    fontSize: 18
  },
  bookingBtnTextDisabled: {
    color: color.arrowRight
  },
  bookingBtnLoading: {
    alignSelf: 'center',
    height: 144,
    margin: 5
  },
  floatedPointList: {
    position: 'absolute',
    elevation: 2,
    shadowColor: color.primaryText,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    },
    left: 0,
    right: 0,
    marginHorizontal: 20,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    borderRadius: 10
  },
  pointList: {
    paddingVertical: 0
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
    backgroundColor: color.white,
    paddingTop: 11,
    shadowColor: color.primaryText,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  btnView: {
    width: 50,
    height: 50
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
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  destinationBtnsSpinner: {
    alignSelf: 'center'
  },
  customDestinationText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  flex: {
    flex: 1
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
  },
  btnStyle: {
    backgroundColor: color.white
  },
  btnTextStyle: {
    color: color.secondaryText
  },
  popupCards: {
    fontSize: 17,
    marginVertical: 8,
    marginHorizontal: 5,
    textAlign: 'center'
  },
  pickUpTimeWrapper: {
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
    shadowColor: color.primaryText,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  serviceSuspendedTitle: {
    textAlign: 'center',
    fontWeight: '600'
  },
  serviceSuspendedDescription: {
    fontSize: 17,
    lineHeight: 20,
    color: color.primaryText
  },
  serviceSuspendedGreeting: {
    marginBottom: 10
  },
  serviceSuspendedSign: {
    marginVertical: 12,
    fontSize: 17,
    fontStyle: 'italic',
    lineHeight: 20,
    color: color.secondaryText
  }
});
