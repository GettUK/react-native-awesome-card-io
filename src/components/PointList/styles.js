import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    minHeight: 50,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
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
  }
});
