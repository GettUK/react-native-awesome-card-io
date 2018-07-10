import { StyleSheet } from 'react-native';

export const modalStyles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  content: {
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 7,
    paddingVertical: 7
  },
  closeText: {
    paddingVertical: 8,
    paddingHorizontal: 13,
    fontSize: 14,
    color: '#284784'
  },
  separator: {
    height: 16
  }
});

export const optionsModalStyle = StyleSheet.create({
  flex: {
    flex: 1
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 16
  },
  wrapper: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8
  },
  row: {
    width: '100%',
    height: 56,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d8d8d8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  rowLast: {
    borderBottomWidth: 0
  },
  label: {
    paddingHorizontal: 16,
    fontSize: 17,
    fontWeight: '600',
    color: '#284784'
  },
  cancel: {
    marginTop: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
