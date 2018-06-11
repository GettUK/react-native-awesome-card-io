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
  leftContent: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 10,
    left: 0
  },
  rightContent: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 10,
    right: 0
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
