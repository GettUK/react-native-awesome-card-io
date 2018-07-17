
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerBack: {
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  touchZone: {
    paddingVertical: 6,
    paddingRight: 8
  },
  shadow: {
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  btn: {
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  orders: {
    backgroundColor: '#284784'
  },
  ordersText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  createNewText: {
    color: '#284784',
    fontWeight: 'bold'
  }
});
