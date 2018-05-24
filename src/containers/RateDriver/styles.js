import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  wrapper: {
    backgroundColor: '#0076bb'
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  driverName: {
    color: '#fff',
    fontSize: 20
  },
  vehicleDetails: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 15
  },
  label: {
    color: '#fff',
    fontSize: 15
  },
  subLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  centerItems: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgesList: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 21,
    marginBottom: 18,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  divider: {
    marginVertical: 36
  }
});
