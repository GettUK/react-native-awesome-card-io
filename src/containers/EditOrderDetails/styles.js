import { StyleSheet } from 'react-native';
import { color } from 'theme';
import { isIphoneX } from 'utils';

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  labelStyle: {
    marginVertical: 6
  },
  pickUpTimeWrapper: {
    marginBottom: 30,
    paddingHorizontal: 16
  },
  pointList: {
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.pixelLine,
    marginBottom: 8
  },
  contentBlock: {
    backgroundColor: color.white,
    paddingVertical: 8
  },

  mainInfoContainer: {
    marginBottom: 30
  },

  detailsContainer: {
    marginBottom: 20
  },

  spacer: {
    height: isIphoneX() ? 86 : 66
  },

  orderRideBtnWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: color.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingBottom: isIphoneX() ? 28 : 8,
    elevation: 2,
    shadowColor: color.primaryText,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  }
});
