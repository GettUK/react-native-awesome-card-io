import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  orders: {
    paddingHorizontal: 15,
    paddingTop: 20
  },
  orderWrapper: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  orderDetails: {
    paddingHorizontal: 15,
    paddingTop: 20
  },
  orderDate: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 20
  },
  orderMap: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  orderLabels: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    flexDirection: 'row'
  },
  orderLabel: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginLeft: 8,
    height: 30,
    justifyContent: 'center'
  },
  orderLabelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13
  },
  blackLabel: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  yellowLabel: {
    backgroundColor: '#f6b530'
  },
  redLabel: {
    backgroundColor: '#f00'
  },
  greenLabel: {
    backgroundColor: '#6bc11a'
  },
  orderAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 20
  },
  orderAddressIcon: {
    alignItems: 'center',
    marginRight: 14
  },
  orderStopAddressIcon: {
    marginLeft: 2,
    marginRight: 17
  },
  orderAddressGap: {
    marginBottom: 12
  },
  goToDetailsBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15
  },
  goToDetailsText: {
    color: '#5389df',
    fontSize: 17
  },
  goToDetailsIcon: {
    marginLeft: 12,
    transform: [{ rotate: '-90deg' }]
  },
  loaderWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center'
  },
  loader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: '#284784'
  },
  loaderLabel: {
    textAlign: 'center',
    color: '#fff'
  },
  connecter: {
    position: 'absolute',
    top: 15,
    left: -3
  },
  pickUpConnecter: { top: 18 }
});

export default styles;
