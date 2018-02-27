import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  bg: {
    backgroundColor: '#fff'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingLeft: 15,
    paddingRight: 30
  },
  reasonName: {
    color: '#000',
    fontSize: 17,
    fontWeight: '500',
    marginRight: 33
  },
  reasonNameSelected: {
    marginRight: 20
  },
  separator: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#bcbbc1',
    marginLeft: 15
  }
});

export default styles;
