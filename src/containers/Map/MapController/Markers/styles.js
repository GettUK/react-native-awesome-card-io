import { StyleSheet, Platform } from 'react-native';

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
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 7,
        shadowColor: '#000',
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
    color: '#7f7f7f',
    lineHeight: 13
  },
  infoMarkerIcon: {
    marginRight: 5
  },
  infoMarkerValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 13
  }
});
