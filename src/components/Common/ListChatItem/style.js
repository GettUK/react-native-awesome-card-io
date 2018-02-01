import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 96,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(155,155,155,0.3)'
  },
  left_item: {
    margin: 16
  },
  image_view: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F0E1',
    borderRadius: 30,
    height: 60,
    width: 60
  },
  image: {
    width: '100%',
    height: '100%'
  },
  inner_loader: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 5
  },
  status_off: {
    position: 'absolute',
    right: 0,
    bottom: -2,
    backgroundColor: '#9B9B9B',
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFF'
  },
  status_on: {
    position: 'absolute',
    right: 0,
    bottom: -2,
    backgroundColor: '#8EE635',
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#F9F0E1'
  },
  center_item: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  time: {
    color: '#89888A',
    fontSize: 15,
    lineHeight: 22,
    marginRight: 16
  },
  label_title: {
    flex: 1,
    color: '#F68C41',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    marginRight: 5
  },
  label_subTitle: {
    flex: 1,
    color: '#89888A',
    fontSize: 18,
    lineHeight: 22,
    marginRight: 5
  },
  badge_wrapper: {
    marginRight: 16
  },
  badge: {
    backgroundColor: '#F68C41'
  },
  badge_text: {
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '500',
    fontSize: 16
  }
});

export default styles;
