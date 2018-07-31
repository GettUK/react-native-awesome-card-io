import { StyleSheet } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  container: {
    marginBottom: 5,
    marginHorizontal: 15,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: color.white,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: color.primaryText,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: {
      height: 0
    }
  },
  icon: {
    marginTop: 5,
    marginBottom: 14
  }
});

