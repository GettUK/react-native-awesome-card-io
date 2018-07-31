import { StyleSheet } from 'react-native';
import { color, formattedColor } from 'theme';

export default StyleSheet.create({
  container: {
    margin: 5,
    marginTop: 15,
    width: 110,
    height: 140,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: color.white,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 6,
    elevation: 2,
    shadowColor: color.primaryText,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  containerSmall: {
    marginTop: 10,
    height: 116
  },
  activeContainer: {
    width: 114,
    height: 144,
    margin: 0,
    marginTop: 0,
    shadowRadius: 0
  },
  activeContainerSmall: {
    height: 120
  },
  activeBackground: {
    width: 134,
    height: 164,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  },
  activeBackgroundSmall: {
    height: 130
  },
  label: {
    paddingLeft: 2,
    fontSize: 14,
    color: color.secondaryText,
    marginBottom: 2
  },
  labelPrice: {
    paddingLeft: 2,
    fontSize: 18,
    color: color.primaryText,
    fontWeight: 'bold',
    marginTop: 2
  },
  labelEta: {
    fontSize: 14,
    color: color.secondaryText
  },
  icon: {
    marginLeft: 2,
    marginRight: 6
  },
  top: {
    paddingHorizontal: 8
  },
  middle: {
    paddingHorizontal: 8,
    flexDirection: 'row'
  },
  image: {
    width: 110,
    height: 42
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: formattedColor.white.opacity(0.6),
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 8
  }
});
