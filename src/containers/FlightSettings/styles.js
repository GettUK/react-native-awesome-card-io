import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'theme';

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
    backgroundColor: color.white
  },
  header: {
    color: color.primaryBtns,
    fontSize: 22,
    margin: 16
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16
  },
  button: {
    width: '47%',
    height: 44
  },
  buttonLeft: {
    marginRight: '6%'
  },
  cancelButtonContent: {
    flex: 1,
    width: '100%'
  },
  submitButton: {
    flex: 1,
    width: '100%',
    backgroundColor: color.primaryBtns
  },
  disabledSubmitButton: {
    opacity: 0.6
  },
  buttonLabel: {
    color: color.secondaryText,
    fontSize: 14,
    fontWeight: '600'
  },
  buttonLabelSubmit: {
    color: color.white,
    fontSize: 14,
    fontWeight: '600'
  }
});

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  bg: {
    backgroundColor: color.white
  },
  input: {
    fontSize: 16,
    borderBottomColor: color.pixelLine,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  inputContainer: {
    marginLeft: 16,
    marginTop: 26,
    marginBottom: 16
  },
  inputLabel: {
    color: color.secondaryText,
    marginTop: 5
  },

  toggler: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 8,
    height: 44,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.secondaryText,
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
    backgroundColor: color.primaryBtns
  },
  toggleIcon: {
    marginRight: 16
  },
  toggleLabel: {
    color: color.primaryBtns
  },
  toggleLabelActive: {
    color: color.white
  },
  resultsWrapper: {
    marginHorizontal: 16,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.pixelLine,
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
    color: color.secondaryText,
    width: '60%'
  },
  verifyButton: {
    width: 80,
    height: 34,
    backgroundColor: color.primaryBtns,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  verifyLabel: {
    color: color.white,
    fontSize: 16,
    fontWeight: '600'
  },
  error: {
    width: '100%'
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 24
  },
  tab: {
    borderBottomWidth: 1,
    paddingBottom: 16
  },
  tabLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabLabel: {
    textAlign: 'center',
    fontSize: 12
  },
  tabIcon: { marginHorizontal: 4 }
});
