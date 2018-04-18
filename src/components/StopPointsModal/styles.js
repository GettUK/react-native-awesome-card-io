import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    paddingBottom: 24
  },
  listItem: {
    height: 60,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItemLabel: {
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 16,
    flex: 1
  },
  deleteButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButton: {
    height: 40,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  addButtonLabel: {
    color: '#284784',
    fontSize: 16,
    paddingLeft: 16
  }
});
