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
    paddingLeft: 6,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'transparent',
    borderBottomWidth: 0
  },
  listItemWrapper: {
    backgroundColor: '#fff'
  },
  divider: {
    marginLeft: 21
  },
  avatarDivider: {
    marginLeft: 85
  },
  iconDivider: {
    marginLeft: 60
  },
  avatarContainer: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
