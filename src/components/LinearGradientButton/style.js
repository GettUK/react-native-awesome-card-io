import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container_button: {
    borderRadius: 20,
    marginTop: 3,
    marginBottom: 3,
    marginRight: 30,
    marginLeft: 30,
    backgroundColor: 'transparent',
    alignSelf: 'stretch'
  },
  button_gradient: {
    borderRadius: 20
  },
  button_view: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 14,
    ...Platform.select({
      ios: {},
      android: {
        height: 49
      }
    })
  },
  button_text: {
    color: '#fff',
    fontSize: 18
  }
});

export default styles;
