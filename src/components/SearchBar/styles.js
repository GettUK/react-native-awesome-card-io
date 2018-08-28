import { StyleSheet } from 'react-native';
import { color, formattedColor } from 'theme';

export default StyleSheet.create({
  searchContainer: {
    backgroundColor: color.bgSearch,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalSearchContainer: {
    marginLeft: 15,
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    left: 25,
    zIndex: 1
  },
  modalSearchIcon: {
    marginRight: 5
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  flex: {
    flex: 1
  },
  searchInput: {
    borderRadius: 10,
    margin: 15,
    minHeight: 36,
    backgroundColor: formattedColor.secondaryText.opacity(0.12),
    paddingLeft: 30,
    paddingRight: 6,
    fontSize: 17
  },
  modalSearchInput: {
    fontSize: 18,
    color: color.primaryText,
    borderBottomWidth: 0
  },
  inputWrapper: {
    marginRight: 10
  }
});
