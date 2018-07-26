import { StyleSheet } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  wrapper: {
    width: '100%',
    backgroundColor: color.white,
    paddingHorizontal: 16
  },
  header: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    color: color.primaryText,
    fontWeight: '900',
    marginVertical: 40
  },
  subheader: {
    fontSize: 18,
    color: color.primaryText,
    fontWeight: '900',
    marginBottom: 21
  },
  title: {
    fontSize: 18,
    color: color.primaryText,
    fontWeight: '600',
    marginBottom: 16
  },
  plain: {
    fontSize: 14,
    color: color.primaryText,
    lineHeight: 20,
    marginBottom: 16
  },
  bold: {
    fontSize: 14,
    color: color.primaryText,
    lineHeight: 20,
    marginBottom: 16,
    fontWeight: '900'
  },
  small: {
    fontSize: 12,
    color: color.secondaryText,
    lineHeight: 20,
    marginBottom: 16,
    fontWeight: '600'
  },
  date: {
    fontSize: 14,
    color: color.secondaryText,
    marginBottom: 40,
    marginTop: 24
  },
  important: {
    fontSize: 14,
    lineHeight: 21,
    color: color.primaryText,
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
    backgroundColor: color.primaryText
  },
  listLabelContainer: {
    justifyContent: 'center',
    minHeight: 24,
    flex: 1
  },
  link: { color: color.iconsSettigs }
});
