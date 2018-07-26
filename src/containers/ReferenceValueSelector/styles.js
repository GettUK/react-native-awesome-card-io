import { StyleSheet } from 'react-native';
import { color, formattedColor } from 'theme';

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },

  container: {
    backgroundColor: color.white
  },

  searchContainer: {
    backgroundColor: color.bgSettings,
    flexDirection: 'row',
    alignItems: 'center'
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

  searchIcon: {
    position: 'absolute',
    left: 25,
    zIndex: 1
  },

  separator: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: color.pixelLine,
    marginLeft: 15
  },

  valueName: {
    color: color.primaryText,
    fontSize: 17,
    marginRight: 33
  },

  valueNameSelected: {
    marginRight: 20
  },

  referenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingLeft: 15,
    paddingRight: 30
  }
});

export default styles;
