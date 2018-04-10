import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    height: '88%',
    backgroundColor: '#fff'
  },
  flex: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  pointerIcon: {
    marginHorizontal: 12
  },
  inputStyle: {
    fontSize: 18,
    color: '#000'
  },
  delimiter: {
    alignSelf: 'stretch',
    borderColor: '#d8d8d8',
    borderTopWidth: 1
  },
  list: {
    flexGrow: 1
  },
  itemAddressView: {
    marginLeft: 45,
    paddingVertical: 5
  },
  itemAddressText: {
    fontSize: 18,
    color: '#000'
  },
  indicatorView: {
    paddingVertical: 20
  }
});

export default styles;
