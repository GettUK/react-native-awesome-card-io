import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  btn: {
    flexDirection: 'column',
    backgroundColor: '#fff',
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
  rowView: {
    flex: 1,
    flexDirection: 'row'
  },
  row: {
    flexDirection: 'row',
    marginVertical: 8,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickUpIcon: {
    marginRight: 15
  },
  pickUpText: {
    flex: 1,
    fontSize: 16
  },
  delimiter: {
    alignSelf: 'stretch',
    marginVertical: 0,
    marginLeft: 33,
    marginRight: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: '#D8D8D8',
    height: 1
  },
  btnPlus: {
    paddingVertical: 1,
    paddingHorizontal: 10
  }
});
