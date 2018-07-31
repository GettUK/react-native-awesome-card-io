import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'theme';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
    position: 'absolute',
    left: 0,
    zIndex: 99,
    elevation: 10
  },
  containertop: {
    top: 0
  },
  containerbottom: {
    bottom: 0
  },
  messageContainer: {
    width: width - 32,
    minHeight: 70,
    elevation: 2,
    shadowColor: color.primaryText,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    },
    backgroundColor: color.white,
    borderRadius: 10,
    padding: 16,
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  messageContainerwarning: {
    backgroundColor: color.warningLight
  },
  messageContainerinfo: {
    backgroundColor: color.infoLight
  },
  messageContainersuccess: {
    backgroundColor: color.successLight
  },
  messageContainerfailed: {
    backgroundColor: color.dangerLight
  },
  message: {
    fontSize: 14,
    flex: 1,
    paddingHorizontal: 16
  },
  title: {
    fontWeight: '900'
  },
  icon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

