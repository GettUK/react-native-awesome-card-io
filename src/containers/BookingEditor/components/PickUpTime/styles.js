import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  pickupTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: 50,
    backgroundColor: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 20
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
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5
  },
  date: {
    color: '#000',
    fontSize: 18
  },
  TDPickerWrapper: {
    borderColor: '#cdcdcd',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    shadowColor: '#cdcdcd',
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
    backgroundColor: '#284784',
    marginLeft: 10,
    marginRight: 16
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  TDButtonText: {
    color: '#fff'
  },
  NowButtonText: {
    color: '#7f7f7f'
  },
  TDEditIcon: {
    marginBottom: -5
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
