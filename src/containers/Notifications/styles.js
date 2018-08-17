import { StyleSheet } from 'react-native';
import { color } from 'theme';

const styles = StyleSheet.create({
  container: StyleSheet.absoluteFillObject,
  flex: {
    flex: 1
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowMarginBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  sectionHeader: {
    marginBottom: 16,
    marginTop: 16,
    color: color.secondaryText
  },
  bodyText: {
    fontSize: 16
  },
  notificationWrapper: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: color.white
  },
  notificationDetails: {
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  notificationDate: {
    flex: 1,
    color: color.secondaryText,
    fontSize: 12
  },
  notificationLabel: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    height: 23,
    marginLeft: 8,
    justifyContent: 'center'
  },
  notificationLabelText: {
    color: color.white,
    fontWeight: '900',
    fontSize: 10
  },
  emptyLabel: {
    color: color.secondaryText,
    fontSize: 22
  }
});

export default styles;
