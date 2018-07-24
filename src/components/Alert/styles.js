import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
    position: 'absolute',
    left: 0,
    zIndex: 99
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
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    },
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  messageContainerwarning: {
    backgroundColor: 'rgb(255, 250, 235)'
  },
  messageContainerinfo: {
    backgroundColor: 'rgb(236, 246, 253)'
  },
  messageContainersuccess: {
    backgroundColor: 'rgb(235, 248, 242)'
  },
  messageContainerfailed: {
    backgroundColor: 'rgb(254, 240, 239)'
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

