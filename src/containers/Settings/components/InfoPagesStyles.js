import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  wrapper: {
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 16
  },
  header: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    fontWeight: '900',
    marginVertical: 40
  },
  subheader: {
    fontSize: 18,
    color: '#000',
    fontWeight: '900',
    marginBottom: 21
  },
  title: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    marginBottom: 16
  },
  plain: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
    marginBottom: 16
  },
  bold: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
    marginBottom: 16,
    fontWeight: '900'
  },
  small: {
    fontSize: 12,
    color: '#8e8e93',
    lineHeight: 20,
    marginBottom: 16,
    fontWeight: '600'
  },
  date: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 40,
    marginTop: 24
  },
  important: {
    fontSize: 14,
    lineHeight: 21,
    color: '#000',
    fontWeight: '600',
    fontStyle: 'italic',
    marginBottom: 24
  },
  listWrapper: {
    marginLeft: 24
  },
  listItemWrapper: {
    flexDirection: 'row',
    flex: 1
  },
  listMarker: {
    minWidth: 24,
    height: 24,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bullet: {
    width: 4,
    height: 4,
    backgroundColor: '#000'
  },
  listLabelContainer: {
    justifyContent: 'center',
    minHeight: 24,
    flex: 1
  }
});
