import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    backgroundColor: '#fff'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 77,
    marginLeft: 26,
    borderBottomWidth: 1,
    borderBottomColor: '#D2DCDA',
    paddingRight: 8
  },
  button: {
    width: 46,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkPlaceholder: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#d6d6db'
  },
  image: {
    width: 110,
    resizeMode: 'contain'
  },
  label: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 17,
    lineHeight: 28,
    color: '#000'
  }
});
