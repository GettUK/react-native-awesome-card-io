import { StyleSheet } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 13,
    width: 104,
    height: 124,
    borderRadius: 10,
    paddingTop: 11,
    paddingBottom: 9,
    elevation: 2,
    shadowColor: color.primaryText,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  containerSmall: {
    marginTop: 12,
    height: 124
  },
  activeContainer: {
    width: 104,
    height: 124,
    margin: 0,
    marginTop: 0,
    shadowRadius: 0
  },
  activeContainerSmall: {
    marginTop: 0,
    height: 124
  },
  activeBackground: {
    width: 120,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 4
  },
  label: {
    paddingLeft: 2,
    fontSize: 14,
    color: color.secondaryText,
    marginVertical: 2
  },
  labelPrice: {
    paddingLeft: 2,
    fontSize: 18,
    color: color.primaryText,
    fontWeight: 'bold',
    marginVertical: 2
  },
  top: {
    paddingHorizontal: 8,
    paddingTop: 4
  },
  image: {
    alignSelf: 'center'
  },
  deselected: {
    opacity: 0.6
  },
  badgeWrapper: {
    width: '100%',
    position: 'absolute',
    top: -10,
    alignItems: 'center'
  },
  badgeStyle: {
    backgroundColor: color.arrowRight,
    flexDirection: 'row',
    paddingHorizontal: 11,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.white
  },
  badgeActiveStyle: {
    backgroundColor: color.iconsSettigs
  },
  badgeTextStyle: {
    color: color.white,
    fontSize: 12,
    lineHeight: 14
  }
});
