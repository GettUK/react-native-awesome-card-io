import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    zIndex: 100
  },
  headerContainer: {
    zIndex: -1
  },
  content: {
    marginTop: Platform.OS === 'ios' ? -61 : -64,
    zIndex: 1000
  },
  gradient: {
    width: '100%',
    height: 60,
    flexDirection: 'row'
  },
  tab: {
    width: '33.3%',
    height: 60,
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabLabel: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center'
  }
});

export default styles;
