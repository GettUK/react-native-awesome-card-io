import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  titleStyle: {
    fontWeight: 'bold'
  },
  contentStyle: {
    alignItems: 'center'
  },
  messageWrapper: {
    width: '100%',
    marginBottom: 20
  },
  messageStyle: {
    alignSelf: 'center'
  },
  btnCancelStyle: {
    backgroundColor: '#fff'
  },
  btnTextStyle: {
    color: '#7F7F7F'
  }
});
