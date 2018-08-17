import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'theme';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    height: '88%',
    backgroundColor: color.white
  },
  flex: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  pointerIcon: {
    marginHorizontal: 12
  },
  inputStyle: {
    width: width - 60,
    fontSize: 18,
    borderBottomColor: 'transparent'
  },
  delimiter: {
    alignSelf: 'stretch',
    borderColor: color.pixelLine,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  list: {
    flexGrow: 1
  },
  itemAddressView: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: 72,
    width: '100%'
  },
  itemAddressText: {
    fontSize: 18,
    color: color.primaryText
  },
  indicatorView: {
    paddingVertical: 20
  },
  clearIcon: { paddingHorizontal: 16 },
  tabBarContainer: { height: 72 },
  tabContainer: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: color.bgSearch
  },
  activeTab: {
    borderBottomColor: color.primaryBtns
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '200',
    color: color.secondaryText
  },
  loading: {
    textAlign: 'center',
    marginTop: 24,
    color: color.secondaryText
  },
  iconSpace: { marginRight: 16 }
});

export default styles;
