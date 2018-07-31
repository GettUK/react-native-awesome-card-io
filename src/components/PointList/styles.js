import { StyleSheet } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    backgroundColor: color.white,
    minHeight: 50,
    paddingVertical: 7,
    paddingHorizontal: 20
  },
  row: {
    flexDirection: 'row',
    marginVertical: 8,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelEdit: {
    color: color.primaryBtns
  },
  pickUpIcon: {
    marginRight: 15
  },
  stopPosition: {
    marginLeft: 2
  },
  pickupTextWrapper: {
    flex: 1
  },
  pickUpText: {
    flex: 1,
    fontSize: 16
  },
  btnPlus: {
    paddingVertical: 1,
    paddingHorizontal: 10
  },
  connector: {
    position: 'absolute',
    top: 20,
    left: -3
  },
  pickUpConnector: {
    top: -6
  },
  selectDestinationText: {
    color: color.secondaryText,
    fontSize: 16
  },
  emptyDestination: {
    flex: 1,
    paddingVertical: 8,
    borderBottomColor: color.pixelLine,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
