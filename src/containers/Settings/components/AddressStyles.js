import { StyleSheet } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    backgroundColor: color.white,
    paddingTop: 10
  },
  containerGrey: {
    backgroundColor: color.bgSettings
  },
  scrollContainer: {
    marginBottom: 50,
    borderBottomColor: color.pixelLine,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  predefinedAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15
  },
  addressWrapper: {
    marginLeft: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.pixelLine,
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
    backgroundColor: color.pixelLine,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden'
  },
  addressValue: {
    color: color.secondaryText,
    fontSize: 17
  },
  input: {
    fontSize: 17,
    borderBottomColor: color.pixelLine,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  inputLast: {
    borderBottomColor: 'transparent'
  },
  allowClearStyle: {
    paddingRight: 47
  },
  inputContainer: {
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 5,
    paddingTop: 8
  },
  lastItem: {
    marginBottom: 0
  },
  inputLabel: {
    color: color.secondaryText,
    marginTop: 5
  },
  clearIcon: {
    marginRight: 20
  },
  submitBtn: {
    backgroundColor: color.primaryBtns,
    borderRadius: 0,
    alignSelf: 'stretch'
  },
  submitBtnText: {
    color: color.white,
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonIcon: {
    marginLeft: 11
  },
  deleteButton: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 16,
    backgroundColor: color.white
  },
  deleteLabel: {
    fontSize: 17,
    color: color.danger
  },
  tip: {
    color: color.secondaryText,
    fontSize: 15,
    flex: 1,
    textAlign: 'center',
    margin: 24,
    opacity: 0.6
  }
});
