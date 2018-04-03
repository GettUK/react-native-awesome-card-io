import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
      android: {
        paddingTop: 10
      }
    }),
    paddingBottom: 10
  },
  headerBack: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    },
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  layout: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  itemAddressView: {
    marginLeft: 46,
    paddingVertical: 5
  },
  itemAddressText: {
    fontSize: 18,
    color: '#000'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  pickUpAddress: {
    marginHorizontal: 12
  },
  indicatorView: {
    paddingVertical: 20
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
    width: '100%',
    height: '88%',
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
    paddingTop: 75,
    justifyContent: 'space-between'
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
  },
  selectedWrapper: {
    paddingHorizontal: 20
  },
  time: {
    fontSize: 36,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5
  },
  date: {
    color: '#000',
    fontSize: 18
  },
  TDPickerWrapper: {
    marginTop: 20,
    shadowColor: '#cdcdcd',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 1,
    shadowOpacity: 1
  },
  TDButton: {
    backgroundColor: '#284784',
    alignSelf: 'stretch',
    marginHorizontal: 15,
    marginVertical: 20
  },
  TDButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  TDEditIcon: {
    marginBottom: -5
  }
});

export default styles;
