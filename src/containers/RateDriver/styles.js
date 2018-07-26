import { StyleSheet } from 'react-native';
import { color, formattedColor } from 'theme';

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  wrapper: {
    backgroundColor: color.iconsSettigs
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  driverName: {
    color: color.white,
    fontSize: 20
  },
  vehicleDetails: {
    color: formattedColor.white.opacity(0.6),
    fontSize: 15
  },
  label: {
    color: color.white,
    fontSize: 15
  },
  subLabel: {
    color: formattedColor.white.opacity(0.6),
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
