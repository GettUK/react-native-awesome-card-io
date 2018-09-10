import { StyleSheet } from 'react-native';
import { color } from 'theme';

import { isIOS } from 'utils';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  blockItems: {
    marginBottom: 20
  },
  listItemRightTitle: {
    color: color.secondaryText,
    fontSize: 17
  },
  listItemTitle: {
    marginLeft: 5,
    color: color.primaryText,
    fontSize: 17
  },
  icon: {
    marginLeft: 5,
    marginRight: 10
  },
  listLabelCentered: {
    textAlign: 'center',
    color: color.danger,
    fontWeight: '600'
  },
  avatar: {
    marginLeft: 5
  },
  avatarTitle: {
    marginLeft: 15,
    fontSize: 22
  },
  listItemContainer: {
    paddingLeft: 6,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'transparent',
    borderBottomWidth: 0
  },
  listItemWrapper: {
    backgroundColor: color.white
  },
  divider: {
    marginLeft: 21
  },
  avatarDivider: {
    marginLeft: 85
  },
  iconDivider: {
    marginLeft: 60
  },
  avatarContainer: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonView: {
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.pixelLine
  },
  buttonText: {
    color: color.white,
    fontSize: 14
  },
  appVersion: {
    width: '100%',
    height: 46,
    alignItems: 'center'
  },
  appVersionText: {
    fontSize: 14,
    color: color.secondaryText
  },
  themeModeModal: {
    width: '100%',
    height: '40%'
  },
  badgeTextStyle: {
    color: color.white,
    marginTop: isIOS ? -7 : 0,
    fontSize: 9,
    lineHeight: 24
  },
  badgeContainer: {
    paddingHorizontal: 0,
    paddingVertical: 1,
    alignItems: 'center',
    width: 16,
    height: 16,
    backgroundColor: color.warning
  },
  closeTextStyle: {
    fontSize: 17
  }
});

export default styles;
