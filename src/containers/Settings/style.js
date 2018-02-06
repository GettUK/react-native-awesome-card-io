import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  blockItems: {
    marginBottom: 20
  },
  listItemRightTitle: {
    color: '#8E8E93',
    fontSize: 17
  },
  listItemTitle: {
    marginLeft: 4,
    color: '#000000',
    fontSize: 17
  },
  avatarTitle: {
    marginLeft: 8
  },
  listItemTitleContainer: {},
  listItemContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomColor: 'rgba(155,155,155,0.3)'
  },
  avatarContainer: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
