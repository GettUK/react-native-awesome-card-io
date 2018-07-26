import { StyleSheet } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  rating: {
    borderRadius: 6,
    height: 21,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.warning
  },
  ratingLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: color.white,
    paddingRight: 3
  }
});
