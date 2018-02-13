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
    backgroundColor: "#fff",
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
    alignItems: 'center'
  },
  orderAddressIcon: {
    alignItems: 'center',
    marginRight: 14,
  },
  orderStopAddressIcon: {
    marginLeft: 3,
    marginRight: 17,
  },
  orderAddressGap: {
    marginBottom: 12
  }
});

export default styles;
