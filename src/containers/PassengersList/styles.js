import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
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
