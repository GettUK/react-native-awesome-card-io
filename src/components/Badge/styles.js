import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  badgeContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginHorizontal: 5,
    marginVertical: 5
  },
  activeContainer: {
    backgroundColor: '#fff'
  },
  activeText: {
    color: '#284784'
  },
  badgeText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 24
  }
});
