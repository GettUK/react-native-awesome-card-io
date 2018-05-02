import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'transparent'
  },

  image: {
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%'
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30
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
    color: '#fff'
  },

  label: {
    color: '#fff'
  },

  btnContainer: {
    marginTop: 40,
    marginLeft: 0,
    marginRight: 0,
    borderWidth: 2,
    borderRadius: 26,
    borderColor: 'rgba(255, 255, 255, 0.5)'
  },

  btn: {
    borderRadius: 26,
    backgroundColor: 'transparent'
  },

  btnText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  disabledBtnContainer: {
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },

  disabledBtn: {
    backgroundColor: 'transparent',
    opacity: 0.5
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
    textDecorationLine: 'underline'
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
  },

  error: {
    paddingLeft: 0
  }
});

export default styles;
