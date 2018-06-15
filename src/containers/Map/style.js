import { StyleSheet, Dimensions } from 'react-native';

import { isIphoneX } from 'utils';

const { height, width } = Dimensions.get('window');

const iPhoneHeaderPadding = isIphoneX() ? 49 : 30;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: iPhoneHeaderPadding
  },
  headerBack: {
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    },
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  orderBtn: {
    backgroundColor: '#284784'
  },
  orderBtnText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    paddingTop: 50 + iPhoneHeaderPadding,
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
  infoMarkerContainer: {
    padding: 5
  },
  infoMarker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 7,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  infoMarkerTitle: {
    fontSize: 11,
    color: '#7f7f7f'
  },
  infoMarkerIcon: {
    marginRight: 5
  },
  infoMarkerValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000'
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
  },
  touchZone: {
    paddingVertical: 6,
    paddingRight: 8
  }
});

export default styles;
