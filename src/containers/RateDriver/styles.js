import { StyleSheet } from 'react-native';

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
  }
});
