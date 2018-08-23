import { StyleSheet, Dimensions } from 'react-native';

import { color } from 'theme';

import { isIphoneX } from 'utils';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    flex: 1
  },
  actionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  nextStepBtn: {
    alignSelf: 'stretch',
    flex: 1,
    padding: 5,
    marginHorizontal: 15
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
    opacity: 0,
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
    height: 50,
    paddingHorizontal: 15,
    margin: 2
  },
  padding: {
    padding: 5
  },
  btnWrapper: {
    paddingTop: 10,
    marginBottom: 15
  },
  badgeWrapper: {
    position: 'absolute',
    top: 2,
    right: 11,
    width: 18,
    height: 18
  },
  badgeStyle: {
    paddingHorizontal: 3,
    paddingTop: 5,
    paddingBottom: 4,
    backgroundColor: color.warning,
    borderRadius: 18,
    borderWidth: 0,
    marginHorizontal: 0,
    marginVertical: 0
  },
  badgeTextStyle: {
    fontSize: 9,
    lineHeight: 9,
    fontWeight: 'bold'
  },
  leftActionsBar: {
    marginLeft: 15
  },
  futureOrderBtn: {
    marginRight: 15
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
  pickUpMarker: {
    position: 'absolute',
    left: (width / 2) - 16,
    top: ((height - 190) / 2) - 40
  }
});
