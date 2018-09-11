import { StyleSheet } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  containerWrapper: {
    marginHorizontal: 10,
    paddingTop: 2
  },
  container: {
    zIndex: 0,
    width: 98,
    height: 119,
    borderRadius: 10,
    paddingTop: 11,
    paddingBottom: 9,
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
  activeContainer: {
    shadowRadius: 0
  },
  activeBackground: {
    width: 118,
    height: 139,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingTop: 4
  },
  label: {
    paddingLeft: 2,
    fontSize: 14,
    color: color.secondaryText,
    marginVertical: 2
  },
  labelPrice: {
    paddingLeft: 2,
    fontSize: 17,
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
  badgeWrapper: {
    width: '100%',
    position: 'absolute',
    top: -8,
    left: 0,
    zIndex: 1,
    overflow: 'visible',
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
  badgeTextStyle: {
    color: color.white,
    fontSize: 12,
    lineHeight: 14
  }
});
