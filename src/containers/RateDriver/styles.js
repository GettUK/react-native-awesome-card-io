import { StyleSheet } from 'react-native';

import { isIphoneX } from 'utils';

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  wrapper: {
    backgroundColor: '#fff'
  },
  content: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20
  },
  ratingValueContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6bc11a',
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18
  },
  ratingValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
  name: {
    color: '#000',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 6
  },
  greyText: {
    color: '#8794A0',
    fontSize: 16
  },
  ratingHolder: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 10
  },
  starHolder: {
    paddingHorizontal: 5
  },
  message: {
    backgroundColor: '#d8d8d8',
    alignSelf: 'stretch',
    borderColor: '#979797',
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    height: 120,
    marginTop: 20,
    marginBottom: 30
  },
  sendBtn: {
    backgroundColor: '#284784',
    alignSelf: 'stretch'
  },
  sendBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  cancelBtn: {
    alignSelf: 'stretch'
  },
  cancelBtnText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold'
  },
  footer: {
    paddingTop: 8,
    paddingHorizontal: 20,
    paddingBottom: isIphoneX() ? 16 : 8
  }
});
