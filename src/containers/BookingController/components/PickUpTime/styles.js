import { StyleSheet } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  pickupTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: 50,
    paddingVertical: 7,
    paddingHorizontal: 20
  },
  pickupTime: {
    marginLeft: 17,
    flex: 1
  },
  pickupTimeLabel: {
    fontSize: 14,
    color: color.secondaryText,
    marginBottom: 2
  },
  pickupTimeValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: color.primaryText
  },
  pickUpBtn: {
    marginHorizontal: 15,
    alignSelf: 'stretch',
    justifyContent: 'flex-start'
  },
  selectedWrapper: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 20
  },
  time: {
    fontSize: 36,
    color: color.primaryText,
    fontWeight: 'bold',
    marginBottom: 5
  },
  date: {
    color: color.primaryText,
    fontSize: 18
  },
  TDPickerWrapper: {
    borderColor: color.pixelLine,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    shadowColor: color.pixelLine,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 1,
    shadowOpacity: 1
  },
  buttonContainer: {
    flex: 1
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 20,
    marginTop: 10
  },
  NowButton: {
    marginLeft: 16,
    marginRight: 10
  },
  TDButton: {
    backgroundColor: color.primaryBtns,
    marginLeft: 10,
    marginRight: 16
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  TDButtonText: {
    color: color.white
  },
  NowButtonText: {
    color: color.secondaryText
  },
  TDEditIcon: {
    marginBottom: -5
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
