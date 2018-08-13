import { StyleSheet } from 'react-native';
import { color } from 'theme';

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
  tabIcon: {
    marginHorizontal: 4
  },
  saveButton: {
    paddingRight: 0
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
