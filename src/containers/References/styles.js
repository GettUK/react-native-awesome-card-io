import { StyleSheet } from 'react-native';
import { color } from 'theme';

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },

  container: {
    backgroundColor: color.white,
    paddingTop: 10
  },

  input: {
    fontSize: 17,
    borderBottomColor: color.pixelLine,
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  inputWrapper: {
    marginBottom: 20,
    marginTop: 5,
    paddingTop: 8
  },

  inputContainer: {
    marginLeft: 16
  },

  errorBorder: {
    borderBottomColor: color.danger
  },

  inputLabel: {
    color: color.secondaryText,
    marginTop: 5
  },

  dropdownItem: {
    marginLeft: 16,
    borderBottomColor: color.pixelLine,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignContent: 'center',
    paddingVertical: 15,
    paddingRight: 15,
    marginBottom: 20
  },

  dropdownItemTitle: {
    fontSize: 17
  },

  dropdownItemValue: {
    fontSize: 17,
    color: color.secondaryText,
    textAlign: 'right',
    marginRight: 10
  },

  dropdownItemIcon: {
    alignSelf: 'center'
  },

  costCentre: {
    position: 'absolute',
    top: 0,
    right: 15
  },

  costCentreTitle: {
    color: color.primaryBtns,
    fontSize: 14
  },

  error: {
    position: 'absolute',
    color: color.danger,
    bottom: 0,
    left: 15
  },
  toggleLabel: {
    color: color.primaryBtns
  }
});

export default styles;
