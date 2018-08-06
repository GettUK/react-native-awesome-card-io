import { StyleSheet } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  container: {
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  renderView: {
    position: 'absolute',
    backgroundColor: color.white,
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  intervalView: {
    top: 0,
    justifyContent: 'space-around'
  },
  buttonView: {
    bottom: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 2,
    shadowColor: color.primaryText,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  label: {
    color: color.primaryText,
    fontSize: 22
  },
  saveBtn: {
    alignSelf: 'stretch',
    flex: 1,
    padding: 5,
    marginHorizontal: 15
  },
  saveBtnView: {
    alignSelf: 'stretch',
    backgroundColor: color.primaryBtns,
    flex: 1,
    height: 50
  },
  saveBtnText: {
    color: color.white,
    fontWeight: 'bold',
    fontSize: 18
  }
});
