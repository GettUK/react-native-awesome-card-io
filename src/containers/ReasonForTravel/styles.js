import { StyleSheet } from 'react-native';
import { color } from 'theme';

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  bg: {
    backgroundColor: color.white
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingLeft: 15,
    paddingRight: 30
  },
  reasonName: {
    color: color.primaryText,
    fontSize: 17,
    fontWeight: '500',
    marginRight: 33
  },
  reasonNameSelected: {
    marginRight: 20
  }
});

export default styles;
