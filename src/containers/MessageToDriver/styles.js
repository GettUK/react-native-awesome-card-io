import { StyleSheet } from 'react-native';
import { color } from 'theme';

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  bg: {
    backgroundColor: color.white
  },
  input: {
    marginVertical: 14,
    paddingHorizontal: 16,
    color: color.secondaryText
  },
  messageLength: {
    color: color.secondaryText,
    backgroundColor: 'transparent',
    marginLeft: 16,
    marginBottom: 13
  }
});

export default styles;
