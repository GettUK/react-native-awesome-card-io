import { StyleSheet } from 'react-native';

import { isIphoneX } from 'utils';

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  orders: {
    paddingHorizontal: 10,
    paddingTop: 20,
    marginBottom: isIphoneX() ? 20 : 0
  },
  orderWrapper: {
    marginBottom: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  orderDetails: {
    paddingHorizontal: 15,
    paddingVertical: 20
  },
  orderDate: {
    flex: 1,
    color: '#8e8e93',
    fontSize: 12
  },
  orderMap: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  orderLabel: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    height: 23,
    marginLeft: 8,
    justifyContent: 'center'
  },
  orderLabelText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 10
  },
  blueLabel: {
    backgroundColor: '#cdecfe'
  },
  greenLabel: {
    backgroundColor: '#d9f7eb'
  },
  redLabel: {
    backgroundColor: '#feccd6'
  },
  blackLabel: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  blueLabelText: {
    color: '#0174b9'
  },
  greenLabelText: {
    color: '#00c46b'
  },
  redLabelText: {
    color: '#ff0030'
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
  connector: {
    position: 'absolute',
    top: 15,
    left: -3
  },
  pickUpConnector: {
    top: 18
  },
  emptyLabel: {
    color: '#7f7f7f',
    fontSize: 22
  }
});

export default styles;
