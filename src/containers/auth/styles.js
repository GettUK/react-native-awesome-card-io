import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  image: {
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },

  logo: {
    alignSelf: 'center',
    marginBottom: 50
  },

  input: {
    marginTop: 20
  },

  inputStyle: {
    fontSize: 18,
    color: '#fff',
  },

  label: {
    color: '#fff'
  },

  btn: {
    marginTop: 40,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    padding: 13
  },

  btnText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  footer: {
    marginBottom: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },

  footerText: {
    color: '#fff',
    fontSize: 18
  },

  footerLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  footerTextGap: {
    marginRight: 15
  },

  errorContainer: {
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 5,
    paddingHorizontal: 10
  },

  errorImage: {
    display: 'none'
  }
});
