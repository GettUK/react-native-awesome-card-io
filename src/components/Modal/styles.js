import { StyleSheet } from 'react-native';
import { color } from 'theme';

export const modalStyles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  content: {
    backgroundColor: color.white
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
    color: color.primaryBtns
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
    backgroundColor: color.white,
    borderRadius: 8
  },
  row: {
    width: '100%',
    height: 56,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.pixelLine,
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
    color: color.primaryBtns
  },
  cancel: {
    marginTop: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
