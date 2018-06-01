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
  container: {
    backgroundColor: '#fff',
    paddingTop: 10
  },
  paymentView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10
  },
  deactivateBtn: {
    marginTop: 30,
    paddingVertical: 18,
    backgroundColor: '#fff'
  },
  deactivateBtnLabel: {
    textAlign: 'center',
    color: '#FF2600',
    fontSize: 17
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
    marginLeft: 15
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
  },
  emptyPayments: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  emptyPaymentsLabel: {
    color: '#8e8e93',
    lineHeight: 24,
    fontSize: 15,
    textAlign: 'center'
  },
  emptyPaymentsLabelSpace: {
    marginBottom: 8
  },
  checkboxWrapper: {
    marginHorizontal: 12
  }
});
