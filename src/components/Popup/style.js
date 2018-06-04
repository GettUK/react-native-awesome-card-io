import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  content: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
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
    color: '#284784'
  },
  description: {
    fontSize: 17,
    lineHeight: 20,
    color: '#000'
  },
  btn: {
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    },
    borderRadius: 8,
    marginHorizontal: 5,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#284784',
    height: 44
  },
  btnText: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: 20,
    fontSize: 16
  }
});
