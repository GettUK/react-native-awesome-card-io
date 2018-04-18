import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {},
  input: {
    paddingVertical: 10,
    borderBottomColor: 'rgba(255, 255, 255, 0.4)',
    borderBottomWidth: 2
  },
  error: {
    borderBottomColor: '#f00'
  },
  withClearBtn: {
    paddingRight: 25
  },
  label: {
    position: 'absolute'
  },
  clearBtn: {
    position: 'absolute',
    right: 0,
    top: '50%',
    marginTop: -16,
    padding: 8
  },
  clearIcon: {
    width: 16,
    height: 16
  },
  errorMessage: {
    paddingLeft: 16,
    paddingTop: 4,
    color: 'red'
  },
  errorPlaceholder: {
    height: 14
  }
});

export default styles;
