import { StyleSheet } from 'react-native';
import { color, formattedColor } from 'theme';

export default StyleSheet.create({
  searchContainer: {
    backgroundColor: color.bgSearch,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    left: 25,
    zIndex: 1
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
  }
});
