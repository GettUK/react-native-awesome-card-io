import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const modalStyles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    height: height * 0.75,
    borderRadius: 16,
    backgroundColor: '#fff'
  },
  header: {
    color: '#284784',
    fontSize: 22,
    margin: 16
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16
  },
  cancelButton: {
    flex: 1,
    marginRight: 16,
    height: 44
  },
  cancelButtonContent: {
    width: '100%'
  },
  submitButton: {
    flex: 1,
    height: 44,
    backgroundColor: '#284784',
    width: '100%'
  },
  disabledSubmitButton: {
    opacity: 0.6
  },
  buttonLabel: {
    color: '#7f7f7f',
    fontSize: 14,
    fontWeight: '600'
  },
  buttonLabelSubmit: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  }
});

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  bg: {
    backgroundColor: '#fff'
  },
  input: {
    fontSize: 16,
    borderBottomColor: '#bcbbc1',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  inputContainer: {
    marginLeft: 16,
    marginTop: 26,
    marginBottom: 16
  },
  inputLabel: {
    color: '#7f7f7f',
    marginTop: 5
  },

  toggler: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 8,
    height: 44,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#7f7f7f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  toggleButton: {
    height: 44,
    borderRadius: 8,
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  toggleButtonActive: {
    backgroundColor: '#2a4982'
  },
  toggleIcon: {
    marginRight: 16
  },
  toggleLabel: {
    color: '#2a4982'
  },
  toggleLabelActive: {
    color: '#fff'
  },
  resultsWrapper: {
    marginHorizontal: 16,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e6e6e6',
    borderRadius: 10
  },
  results: {
    flexDirection: 'row',
    minHeight: 36,
    alignItems: 'center'
  },
  resultTitle: {
    fontWeight: '600',
    width: '30%'
  },
  resultLabel: {
    color: '#929297',
    width: '60%'
  },
  verifyButton: {
    width: 80,
    height: 34,
    backgroundColor: '#284784',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  verifyLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  error: {
    width: '100%'
  }
});
