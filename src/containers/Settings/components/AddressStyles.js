import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    backgroundColor: '#fff',
    paddingTop: 10
  },
  predefinedAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15
  },
  addressWrapper: {
    marginLeft: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#bcbbc1',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  predefinedAddressWrapper: {
    alignSelf: 'stretch'
  },
  addressName: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5
  },
  predefinedAddressName: {
    width: 60,
    marginBottom: 0
  },
  chevronIcon: {
    paddingHorizontal: 20
  },
  addAddressIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#e7e7e7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden'
  },
  addressValue: {
    color: '#8e8e93',
    fontSize: 17
  },
  input: {
    fontSize: 17,
    borderBottomColor: '#bcbbc1',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  inputContainer: {
    marginLeft: 15,
    paddingRight: 20,
    marginBottom: 15,
    marginTop: 5,
    paddingTop: 8
  },
  inputLabel: {
    color: '#7f7f7f',
    marginTop: 5
  },
  clearIcon: {
    marginRight: 20
  },
  submitBtn: {
    backgroundColor: '#244c8a',
    borderRadius: 0,
    alignSelf: 'stretch'
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
