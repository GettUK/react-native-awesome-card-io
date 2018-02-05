import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container_textinput: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30,
    backgroundColor: '#F9F0E1',
    paddingHorizontal: 15,
    ...Platform.select({
      ios: {
        paddingVertical: 14
      },
      android: {
        paddingVertical: 2,
        height: 48
      }
    })
  },
  textInput: {
    flex: 1,
    color: '#F68C41',
    fontSize: 18
    // height: 21.5
  },
  container_touch: {
    margin: 3
  }
});

export default styles;
