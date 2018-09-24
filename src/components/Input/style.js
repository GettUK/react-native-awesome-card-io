import { StyleSheet } from 'react-native';
import { color, formattedColor } from 'theme';

const styles = StyleSheet.create({
  container: {},
  input: {
    paddingVertical: 10,
    borderBottomColor: formattedColor.white.opacity(0.4),
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  error: {
    borderBottomColor: color.danger
  },
  withClearBtn: {
    paddingRight: 25
  },
  label: {
    position: 'absolute'
  },
  rightBtn: {
    position: 'absolute',
    right: 16
  },
  clearBtn: {
    position: 'absolute',
    right: 0,
    top: '50%',
    marginTop: -26,
    padding: 8
  },
  clearIcon: {
    width: 16,
    height: 16
  },
  errorMessage: {
    paddingTop: 4,
    color: color.danger
  },
  errorPlaceholder: {
    height: 14
  }
});

export default styles;
