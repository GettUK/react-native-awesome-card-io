import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  infoMarkerContainer: {
    padding: 5
  },
  infoMarker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 7,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  infoMarkerTitle: {
    fontSize: 11,
    color: '#7f7f7f'
  },
  infoMarkerIcon: {
    marginRight: 5
  },
  infoMarkerValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000'
  }
});
