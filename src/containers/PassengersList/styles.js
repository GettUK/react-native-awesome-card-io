import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  bg: {
    backgroundColor: '#fff'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingLeft: 15,
    paddingRight: 30
  },
  reasonName: {
    color: '#000',
    fontSize: 17,
    fontWeight: '500',
    marginRight: 33
  },
  reasonNameSelected: {
    marginRight: 20
  },
  separator: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#bcbbc1',
    marginLeft: 15
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

  passengerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 68
  },
  titleContainer: {
    width: width - 64,
    flexDirection: 'row',
    height: 67,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#bcbbc1',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 12
  },
  titleName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000'
  },
  titlePhone: {
    fontSize: 14,
    color: '#8794a0',
    marginTop: 4
  },
  avatar: {
    marginHorizontal: 12,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#d8d8d8',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
