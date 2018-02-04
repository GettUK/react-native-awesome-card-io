import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'ios' ? 20 + 44 : 20 + 44
  },
  container_up: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container_bottom: {
    flex: 0.75
  },
  view_items: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  view_logoLabel: {
    marginLeft: 10
  },
  text_label_forgot: {
    fontSize: 15,
    color: '#89888A'
  },
  text_label: {
    fontSize: 17,
    color: '#89888A',
    backgroundColor: 'transparent'
  },
  text_label_end: {
    fontSize: 17,
    color: '#F68C41',
    backgroundColor: 'transparent'
  },
  label_absolute: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center'
  },
  label: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 25
  },
  label_unner: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 30,
    marginRight: 30,
    marginLeft: 30,
    alignSelf: 'stretch'
  },
  delimiter: {
    alignSelf: 'stretch',
    marginRight: 30,
    marginLeft: 30,
    padding: 0,
    borderWidth: 0,
    backgroundColor: 'rgba(155,155,155,0.3)',
    height: 1
  },
  error_view: {
    marginVertical: 5
  }
});

export default styles;
