import { StyleSheet, Platform } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  infoMarkerContainer: {
    ...Platform.select({
      ios: {
        padding: 5
      },
      android: {
        width: 99,
        height: 34,
        top: 5,
        left: 7
      }
    })
  },
  infoMarker: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        backgroundColor: color.white,
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 7,
        shadowColor: color.primaryText,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {
          height: 0
        }
      }
    })
  },
  infoMarkerTitle: {
    fontSize: 11,
    color: color.secondaryText,
    lineHeight: 13
  },
  infoMarkerIcon: {
    marginRight: 5
  },
  infoMarkerValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: color.primaryText,
    lineHeight: 13
  }
});
