import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  orderBtn: {
    backgroundColor: '#284784'
  },
  orderBtnText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: 75
  },
  map: {
    zIndex: -1,
    flex: 1,
    ...StyleSheet.absoluteFillObject
  },
  pickUpBtn: {
    marginHorizontal: 15,
    alignSelf: 'stretch',
    justifyContent: 'flex-start'
  },
  pickUpIcon: {
    marginRight: 15
  },
  pickUpText: {
    flex: 1,
    fontSize: 16
  },
  footer: {
    backgroundColor: 'transparent',
    padding: 15
  },
  currentPositionBtn: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  destinationBtns: {
    flexDirection: 'row'
  },
  destinationBtn: {
    marginRight: 10
  },
  searchIcon: {
    marginRight: 15
  },
  selectDestinationText: {
    color: '#8794a0',
    fontSize: 16
  },
  customDestinationText: {
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default styles;
