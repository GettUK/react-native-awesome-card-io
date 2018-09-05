import { StyleSheet } from 'react-native';
import { color } from 'theme';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  commonContainer: {
    marginLeft: 7,
    paddingTop: 5,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  dividerStyle: {
    marginRight: -15
  },
  listView: {
    width: '100%'
  },
  icon: {
    marginRight: 7
  },
  checkboxWrapper: {
    marginHorizontal: 12
  },
  lineView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10
  },
  label: {
    color: color.black,
    fontSize: 17,
    marginHorizontal: 3
  },
  viewItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    marginHorizontal: 12
  },
  themeInfoWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16
  },
  themeInfoTitle: {
    color: color.primaryText,
    fontSize: 22
  },
  themeInfoText: {
    color: color.secondaryText,
    fontSize: 17.5,
    paddingTop: 16
  }
});

export default styles;
