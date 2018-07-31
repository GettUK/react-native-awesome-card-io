
import { StyleSheet } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  headerBack: {
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: color.white,
    borderRadius: 6
  },
  touchZone: {
    paddingVertical: 6,
    paddingLeft: 3,
    paddingRight: 8
  },
  shadow: {
    elevation: 2,
    shadowColor: color.primaryText,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  btnContainer: {
    padding: 3
  },
  btn: {
    elevation: 2,
    shadowColor: color.primaryText,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  orders: {
    backgroundColor: color.primaryBtns
  },
  ordersText: {
    color: color.white,
    fontWeight: 'bold'
  },
  createNewText: {
    color: color.primaryBtns,
    fontWeight: 'bold'
  }
});
