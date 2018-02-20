import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    zIndex: 100
  },
  header: {
    paddingBottom: 50
  },
  headerContainer: {
    zIndex: -1
  },
  content: {
    marginTop: Platform.OS === 'ios' ? -47 : -50,
    zIndex: 1000
  }
});

export default styles;
