import { StyleSheet, Platform } from 'react-native';
import { color } from 'theme';

const isIOS = Platform.OS === 'ios';

export default StyleSheet.create({
  wrapper: {
    paddingBottom: 0,
    flex: 1,
    flexDirection: 'column'
  },
  rowWrapper: {
    height: 60,
    marginRight: 8
  },
  rowInnerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  dividerWrapper: {
    height: 1,
    width: '100%',
    paddingRight: 40
  },
  leftPanelContainer: {
    marginTop: -2,
    minHeight: 150
  },
  iconStyle: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1
  },
  plusBtnStyle: {
    color: color.primaryBtns,
    fontWeight: 'bold',
    marginTop: -1,
    fontSize: 12,
    marginLeft: isIOS ? 1.5 : 0
  },
  counterItemContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dividerLineBtnStyle: {
    marginBottom: 1,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  counterTextStyle: {
    color: color.secondaryText,
    fontSize: 10
  },
  counterRoundedWrapperStyle: {
    aspectRatio: 1,
    width: 20,
    marginBottom: 3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: color.pixelLine,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItem: {
    height: 60,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row'
  },
  listItemLabel: {
    fontSize: 16,
    color: color.primaryText,
    paddingLeft: 0,
    flex: 1,
    alignItems: 'center'
  },
  dragButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 9
  },
  deleteButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonLabel: {
    fontSize: 16,
    color: color.secondaryText,
    paddingLeft: 0,
    flex: 1
  },
  sortRowStyle: {
    elevation: 2,
    shadowColor: color.primaryText,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  }
});
