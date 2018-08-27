import { StyleSheet } from 'react-native';
import { color as defaultColor } from 'theme';

export default color =>
  StyleSheet.create({
    wrapper: {
      flexDirection: 'column',
      backgroundColor: (color || defaultColor).bgPrimary,
      paddingVertical: 7,
      paddingHorizontal: 20
    },
    row: {
      flexDirection: 'row',
      marginVertical: 0,
      alignSelf: 'flex-start',
      alignItems: 'center',
      justifyContent: 'center'
    },
    labelEdit: {
      color: (color || defaultColor).primaryBtns
    },
    editIcon: {
      marginLeft: 10
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
    },
    emptyDivider: {
      height: 1,
      marginBottom: 5,
      width: '100%',
      paddingRight: 15
    },
    wrapperStyleModifier: {
      marginTop: -8,
      marginBottom: 8
    },
    emptyStops: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    stopsRow: {
      flexDirection: 'row',
      marginBottom: 7
    },
    leftPanelContainer: {
      marginLeft: -1.5,
      alignItems: 'center',
      zIndex: -1
    },
    addStopTextWrapper: {
      flex: 1,
      justifyContent: 'center',
      marginLeft: 12,
      alignSelf: 'flex-end'
    },
    addStopTextWrapperLast: {
      flex: 1,
      justifyContent: 'center',
      marginLeft: 12
    },
    addStopText: {
      fontSize: 15,
      color: color.primaryBtns
    }
  });
