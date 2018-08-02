import { StyleSheet } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  timer: {
    fontWeight: 'bold',
    fontSize: 18,
    color: color.success
  },
  timerEnds: {
    color: color.danger
  }
});
