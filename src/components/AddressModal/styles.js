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
    marginLeft: 45,
    paddingVertical: 5
  },
  itemAddressText: {
    fontSize: 18,
    color: color.primaryText
  },
  indicatorView: {
    paddingVertical: 20
  },
  clearIcon: { paddingHorizontal: 16 }
});

export default styles;
