import { StyleSheet } from 'react-native';
import { color as defaultColor } from 'theme';

export default color =>
  StyleSheet.create({
    wrapper: {
      flexDirection: 'column',
      backgroundColor: (color || defaultColor).bgPrimary,
      minHeight: 50,
      paddingVertical: 7,
      paddingHorizontal: 20
    },
    row: {
      flexDirection: 'row',
      marginVertical: 8,
      alignSelf: 'flex-start',
      alignItems: 'center',
      justifyContent: 'center'
    },
    labelEdit: {
      color: (color || defaultColor).primaryBtns
    },
    pickUpIcon: {
      marginRight: 15
    },
    stopPosition: {
      marginLeft: 2
    },
    pickupTextWrapper: {
      flex: 1
    },
    pickUpText: {
      flex: 1,
      fontSize: 16,
      color: (color || defaultColor).primaryText
    },
    btnPlus: {
      paddingVertical: 1,
      paddingHorizontal: 10
    },
    connector: {
      position: 'absolute',
      top: 20,
      left: -3
    },
    pickUpConnector: {
      top: -6
    },
    selectDestinationText: {
      color: (color || defaultColor).secondaryText,
      fontSize: 16
    },
    emptyDestination: {
      flex: 1,
      paddingVertical: 8,
      borderBottomColor: (color || defaultColor).pixelLine,
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    divider: {
      borderBottomColor: (color || defaultColor).pixelLine
    }
  });
