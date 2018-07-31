import { StyleSheet } from 'react-native';
import { color } from 'theme';
import { isIphoneX } from 'utils';

export default StyleSheet.create({
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

  listOption: {
    paddingHorizontal: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  titleContainer: {
    flex: 1,
    paddingRight: 12,
    justifyContent: 'center',
    height: 45
  },
  iconGap: {
    paddingLeft: 12
  },
  title: {
    color: color.secondaryText
  },
  emptyValueTitle: {
    fontSize: 17
  },
  value: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '900'
  },
  valueWithError: {
    color: color.danger
  },
  divider: {
    marginLeft: -16,
    marginRight: -16,
    marginVertical: 8
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
  },
  errorDot: {
    position: 'absolute',
    marginLeft: -10,
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: color.danger
  }
});
