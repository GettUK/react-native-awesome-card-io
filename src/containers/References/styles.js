import { StyleSheet } from 'react-native';
import { color } from 'theme';

const styles = StyleSheet.create({
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
  inputLabel: {
    color: color.secondaryText,
    marginTop: 5
  },

  costCentre: {
    position: 'absolute',
    top: 0,
    right: 15
  },
  costCentreTitle: {
    color: color.primaryBtns,
    fontSize: 14
  }
});

export default styles;
