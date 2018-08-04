import { StyleSheet } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  infoMarkerContainer: {
    padding: 5
  },
  infoMarker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 7,
    elevation: 2,
    shadowColor: color.primaryText,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  infoMarkerTitle: {
    fontSize: 11,
    lineHeight: 13
  },
  infoMarkerIcon: {
    marginRight: 5
  },
  infoMarkerValue: {
    fontSize: 11,
    fontWeight: 'bold',
    lineHeight: 13
  }
});
