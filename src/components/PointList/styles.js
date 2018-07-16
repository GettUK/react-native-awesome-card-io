import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    backgroundColor: '#fff',
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
    color: '#284784'
  },
  pickUpIcon: {
    marginRight: 15
  },
  stopPosition: {
    marginLeft: 2
  },
  pickUpText: {
    flex: 1,
    fontSize: 16
  },
  pickUpTextLoading: {
    color: '#8794a0'
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
    color: '#8794a0',
    fontSize: 16
  },
  emptyDestination: {
    flex: 1,
    paddingVertical: 8,
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
