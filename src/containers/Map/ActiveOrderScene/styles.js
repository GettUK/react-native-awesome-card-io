import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative'
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 60
  },
  header: {
    fontSize: 26,
    fontWeight: '600'
  },
  separator: {
    flex: 1
  },
  actionsRow: {
    flexDirection: 'row'
  },
  createNewBtn: {
    alignSelf: 'center',
    marginTop: 12
  },
  createNewText: {
    color: '#284784',
    fontWeight: 'bold'
  }
});

export const fbStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  label: {
    marginTop: 8
  }
});

export const onMyWayStyles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  button: {
    alignSelf: 'flex-end',
    padding: 16
  },
  buttonText: {
    color: '#5d75a1',
    fontWeight: '600'
  },
  listItem: {
    width: width - 32,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6'
  },
  listItemTitle: {
    fontSize: 16
  }
});

export const orderPanelStyles = StyleSheet.create({
  activeContainer: {
    padding: 16,
    paddingVertical: 6
  },
  listItem: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 16
  },
  activeItem: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header: {
    fontSize: 32,
    fontWeight: '600',
    paddingVertical: 12,
    color: '#fff'
  },
  subHeader: {
    flexDirection: 'row'
  },
  subHeaderTitle: {
    color: '#fff'
  },
  serviceId: {
    color: '#fff',
    fontWeight: '900',
    paddingLeft: 5
  },
  driverContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4
  },
  roundContainer: {
    width: 44,
    height: 44,
    borderRadius: 22
  },
  driverTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 8
  },
  driverSubtitle: {
    fontSize: 16
  },
  callButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6ebe2d'
  },
  rateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6b530'
  },
  title: {
    color: '#a4a4a4',
    marginBottom: 4
  },
  name: {
    fontSize: 18,
    fontWeight: '900'
  },
  priceLabel: {
    width: 100,
    textAlign: 'right'
  },
  rating: {
    borderRadius: 6,
    height: 21,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6b530'
  },
  ratingLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    paddingRight: 3
  },
  pointList: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    paddingVertical: 0,
    shadowRadius: 0,
    shadowColor: 'transparent'
  },
  journeyDetails: {
    shadowRadius: 0,
    shadowColor: 'transparent',
    marginVertical: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 12
  },
  divider: {
    marginLeft: -16,
    marginRight: -16,
    marginVertical: 8
  },
  listOption: {
    alignSelf: 'stretch',
    marginVertical: 4
  }
});

export const pointerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: (width / 2) - 100,
    top: (height / 2) - 200,
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shadow: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    position: 'absolute',
    top: 85,
    left: 85
  }
});
