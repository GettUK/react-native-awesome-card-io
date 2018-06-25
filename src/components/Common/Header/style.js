import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  headerWrap: {
    backgroundColor: 'transparent',
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    ...Platform.select({
      android: {
        height: 76
      }
    })
  },
  headerTitle: {
    fontSize: 17,
    color: '#fff',
    marginLeft: 0,
    textAlignVertical: 'top',
    lineHeight: 20,
    fontWeight: '600'
  },
  headerTitleCenter: {
    flex: 1,
    textAlign: 'center'
  },
  rightHeaderButton: {
    color: '#000',
    fontSize: 14
  }
});

export default styles;
