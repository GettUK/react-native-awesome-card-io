import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerWrap: {
    backgroundColor: 'transparent',
    elevation: 2,
    zIndex: 10
  },
  wrapLeftElements: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
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
    textAlign: 'center',
    marginRight: 24
  },
  rightHeaderButton: {
    color: '#000',
    fontSize: 14
  }
});

export default styles;
