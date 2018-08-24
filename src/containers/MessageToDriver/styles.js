import { StyleSheet } from 'react-native';
import { color } from 'theme';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  flex: {
    flex: 1
  },
  bg: {
    backgroundColor: color.white
  },
  inputStyle: {
    fontSize: 18,
    borderBottomWidth: 0
  },
  header: {
    marginLeft: 15
  },
  phrase: {
    color: color.primaryText,
    fontSize: 17,
    marginLeft: 15,
    paddingVertical: 11
  }
});

export default styles;
