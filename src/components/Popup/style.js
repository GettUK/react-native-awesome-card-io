import { StyleSheet } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  content: {
    alignSelf: 'stretch',
    backgroundColor: color.white,
    marginHorizontal: 12,
    padding: 20,
    minHeight: 50,
    borderRadius: 10
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  title: {
    marginBottom: 12,
    fontSize: 22,
    lineHeight: 30,
    color: color.primaryBtns
  },
  description: {
    fontSize: 17,
    lineHeight: 20,
    color: color.primaryText
  },
  btn: {
    elevation: 1,
    shadowColor: color.primaryText,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    },
    borderRadius: 8,
    marginHorizontal: 5,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: color.primaryBtns,
    height: 44
  },
  btnText: {
    alignSelf: 'center',
    color: color.white,
    fontWeight: 'bold',
    lineHeight: 20,
    fontSize: 16
  }
});
