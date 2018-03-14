import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  blockItems: {
    marginBottom: 20
  },
  listItemRightTitle: {
    color: '#8e8e93',
    fontSize: 17
  },
  listItemTitle: {
    marginLeft: 5,
    color: '#000',
    fontSize: 17
  },
  icon: {
    marginLeft: 5,
    marginRight: 10
  },
  listLabelCentered: {
    textAlign: 'center',
    color: '#fd6c5a',
    fontWeight: '600'
  },
  avatar: {
    marginLeft: 5
  },
  avatarTitle: {
    marginLeft: 15,
    fontSize: 22
  },
  listItemContainer: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomColor: 'rgba(155, 155, 155, 0.3)'
  },
  avatarContainer: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
