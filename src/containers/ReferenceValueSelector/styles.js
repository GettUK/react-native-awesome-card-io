import { StyleSheet } from 'react-native';
import { color } from 'theme';

const styles = StyleSheet.create({
  flex: {
    flex: 1
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
