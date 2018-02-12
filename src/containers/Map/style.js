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
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  pickUpAddress: {
    marginHorizontal: 12
  },
  delimiter: {
    alignSelf: 'stretch',
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: '#D8D8D8',
    height: 1
  },
  input: {
    marginRight: 20
  },
  inputStyle: {
    fontSize: 18,
    color: '#000'
  },
  closeModalText: {
    fontSize: 14,
    color: '#284784',
    textAlign: 'right'
  },
  modalContent: {
    marginTop: 80,
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 15
  },
  modalView: {
    paddingHorizontal: 20
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
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
    paddingBottom: 15
  },
  currentPositionBtn: {
    width: 50,
    height: 50,
    marginBottom: 20,
    marginLeft: 15
  },
  destinationBtns: {
    flexDirection: 'row',
    paddingHorizontal: 15
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
