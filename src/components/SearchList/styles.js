import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  bg: {
    backgroundColor: '#fff',
    width: '100%'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  searchContainer: {
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchInput: {
    borderRadius: 10,
    margin: 15,
    minHeight: 36,
    backgroundColor: 'rgba(142, 142, 147, 0.12)',
    paddingLeft: 30,
    paddingRight: 6,
    fontSize: 17
  },
  searchIcon: {
    position: 'absolute',
    left: 25,
    zIndex: 1
  },
  emptyResult: { fontSize: 17 }
});
