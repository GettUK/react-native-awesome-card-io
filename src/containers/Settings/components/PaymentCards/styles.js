import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  viewItemDetails: {
    flexDirection: 'column'
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerCardDetails: {
    paddingTop: 10
  },
  container: {
    backgroundColor: '#fff',
    paddingTop: 10
  },
  btnDelete: {
    textAlign: 'center',
    color: '#fd6c5a',
    fontWeight: '600'
  },
  paymentView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10
  },
  btnContainer: {
    marginTop: 15
  },
  block: {
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#bcbbc1'
  },
  paymentCardLabel: {
    fontSize: 14,
    color: '#8e8e93',
    marginVertical: 3
  },
  paymentCardText: {
    color: '#000',
    fontSize: 17
  },
  chevronIcon: {
    paddingHorizontal: 20
  },
  checkIcon: {
    paddingRight: 40,
    paddingLeft: 20
  },
  paymentText: {
    color: '#8e8e93',
    fontSize: 17,
    marginHorizontal: 3
  },
  input: {
    borderBottomColor: '#bcbbc1',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 17,
    paddingVertical: 17
  },
  commonContainer: {
    marginLeft: 15,
    borderBottomColor: '#bcbbc1',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  paymentWrapper: {
    paddingTop: 5,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  paymentCardWrapper: {
    marginBottom: 15,
    marginTop: 5,
    paddingTop: 8
  },
  inputContainer: {
    marginTop: 8,
    marginLeft: 15
  },
  error: {
    marginLeft: 0,
    paddingLeft: 0
  },
  inputLabel: {
    color: '#7f7f7f',
    marginTop: 5
  },
  helpIcon: {
    marginRight: 16
  },
  clearIcon: {
    marginRight: 20
  },
  bold: {
    fontWeight: 'bold'
  },
  buttonView: {
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#bcbbc1'
  },
  buttonText: {
    color: '#fff',
    fontSize: 14
  },
  infoView: {
    marginTop: 18,
    marginBottom: 41,
    marginHorizontal: 16
  },
  infoUnderView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoLabel: {
    color: '#000',
    fontSize: 22,
    marginBottom: 10
  },
  infoText: {
    color: '#8e8e93',
    fontSize: 17,
    flex: 1
  },
  infoImage: {
    width: 96,
    height: 55,
    marginLeft: 28
  }
});
