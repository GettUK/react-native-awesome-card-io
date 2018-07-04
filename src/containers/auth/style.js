import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'transparent'
  },

  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    padding: 30
  },

  containerView: {
    flex: 1,
    padding: 30
  },

  logo: {
    alignSelf: 'center',
    margin: 30
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

  disabledBtnContainer: {
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },

  footer: {
    marginVertical: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },

  footerText: {
    color: '#fff',
    fontSize: 18
  },

  btnForgot: {
    marginBottom: 10
  },

  forgotText: {
    paddingVertical: 5,
    marginTop: -5,
    textAlign: 'right',
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline'
  },

  footerLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlign: 'center'
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
  },
  empty: {
    paddingBottom: 60
  },
  countryView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingTop: 7,
    paddingBottom: 10
  },
  countryText: {
    color: '#FFF',
    fontSize: 17
  },
  chevronIcon: {
    paddingLeft: 20
  },
  dividerStyle: {
    borderBottomColor: 'rgba(255,255,255, 0.4)',
    borderBottomWidth: 2
  },
  flex: {
    flex: 1
  },
  labelDefault: {
    fontSize: 14,
    color: 'rgba(255,255,255, 0.7)',
    marginTop: 13
  },
  marginTop: {
    marginTop: 13
  },
  popupInfo: {
    fontSize: 17,
    lineHeight: 20,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center'
  },
  titleStyle: {
    fontWeight: '600'
  },
  contentWraperStyle: {
    alignItems: 'center'
  },
  labelTitle: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 30,
    marginBottom: 11
  }
});

export default styles;
