import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    position: 'absolute',
    elevation: 2,
    left: 0,
    right: 0,
    flexDirection: 'column',
    backgroundColor: '#fff',
    minHeight: 50,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  rowView: {
    flex: 1,
    flexDirection: 'row'
  },
  row: {
    flexDirection: 'row',
    marginVertical: 8,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickUpIcon: {
    marginRight: 15
  },
  stopPosition: {
    marginLeft: 2
  },
  pickUpText: {
    flex: 1,
    fontSize: 16
  },
  btnPlus: {
    paddingVertical: 1,
    paddingHorizontal: 10
  },
  iconContainer: {
    position: 'relative'
  },
  connecter: {
    position: 'absolute',
    top: 17,
    left: -3
  },
  pickUpConnecter: { top: 20 }
});
