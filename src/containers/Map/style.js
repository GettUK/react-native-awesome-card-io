import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';

import { isIphoneX } from 'utils';

const { height, width } = Dimensions.get('window');

const headerPadding = Platform.OS === 'android' ? StatusBar.currentHeight + 5 : 25;
const iPhoneHeaderPadding = isIphoneX() ? 45 : headerPadding;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    paddingTop: iPhoneHeaderPadding,
    justifyContent: 'space-between'
  },
  map: {
    zIndex: -1,
    flex: 1,
    ...StyleSheet.absoluteFillObject
  },
  pickUpBtn: {
    marginHorizontal: 15,
    alignSelf: 'stretch',
    justifyContent: 'flex-start'
  },
  selectedWrapper: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 20
  },
  time: {
    fontSize: 36,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5
  },
  date: {
    color: '#000',
    fontSize: 18
  },
  TDPickerWrapper: {
    borderColor: '#cdcdcd',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    shadowColor: '#cdcdcd',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 1,
    shadowOpacity: 1
  },
  buttonContainer: {
    flex: 1
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 20,
    marginTop: 10
  },
  order: {
    color: '#284784',
    fontWeight: 'bold'
  },
  NowButton: {
    marginLeft: 16,
    marginRight: 10
  },
  TDButton: {
    backgroundColor: '#284784',
    marginLeft: 10,
    marginRight: 16
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  TDButtonText: {
    color: '#fff'
  },
  NowButtonText: {
    color: '#7f7f7f'
  },
  TDEditIcon: {
    marginBottom: -5
  },
  pickUpMarker: {
    position: 'absolute',
    left: (width / 2) - 16,
    top: ((height - 190) / 2) - 40
  },
  popupInfo: {
    fontSize: 17,
    lineHeight: 20,
    color: '#000'
  },
  popupLabel: {
    marginVertical: 12,
    fontSize: 17,
    lineHeight: 20,
    color: '#8e8e93'
  }
});

export default styles;
