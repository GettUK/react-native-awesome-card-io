import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },

  container: {
    backgroundColor: '#fff',
    paddingTop: 10
  },

  input: {
    fontSize: 17,
    borderBottomColor: '#bcbbc1',
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
    borderBottomColor: 'red'
  },

  inputLabel: {
    color: '#7f7f7f',
    marginTop: 5
  },

  dropdownItem: {
    marginLeft: 16,
    borderBottomColor: '#bcbbc1',
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
    color: '#8e8e93',
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
    color: '#284784',
    fontSize: 14
  },

  error: {
    position: 'absolute',
    color: 'red',
    bottom: 0,
    left: 15
  },
  toggleLabel: {
    color: '#284784'
  }
});

export default styles;
