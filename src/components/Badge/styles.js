import { StyleSheet } from 'react-native';
import { color, formattedColor } from 'theme';

export default StyleSheet.create({
  badgeContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: formattedColor.white.opacity(0.6),
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginHorizontal: 5,
    marginVertical: 5
  },
  activeContainer: {
    backgroundColor: color.color
  },
  activeText: {
    color: color.primaryBtns
  },
  badgeText: {
    color: color.white,
    fontSize: 14,
    lineHeight: 24
  }
});
