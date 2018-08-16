import { StyleSheet } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  content: {
    alignSelf: 'stretch',
    backgroundColor: color.white,
    marginHorizontal: 12,
    padding: 20,
    minHeight: 50,
    borderRadius: 10
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  title: {
    marginBottom: 12,
    fontSize: 22,
    lineHeight: 30,
    color: color.primaryBtns
  },
  description: {
    fontSize: 17,
    lineHeight: 20,
    color: color.primaryText
  },
  btn: {
    elevation: 1,
    shadowColor: color.primaryText,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    },
    borderRadius: 8,
    marginHorizontal: 5,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: color.primaryBtns,
    height: 44
  },
  btnText: {
    alignSelf: 'center',
    color: color.white,
    fontWeight: 'bold',
    lineHeight: 20,
    fontSize: 16
  },

  serviceSuspendedTitle: {
    textAlign: 'center',
    fontWeight: '600'
  },
  serviceSuspendedDescription: {
    fontSize: 17,
    lineHeight: 20,
    color: color.primaryText
  },
  serviceSuspendedGreeting: {
    marginBottom: 10
  },
  serviceSuspendedSign: {
    marginVertical: 12,
    fontSize: 17,
    fontStyle: 'italic',
    lineHeight: 20,
    color: color.secondaryText
  },

  popupLocationTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 0,
    marginBottom: 0
  },
  btnStyle: {
    backgroundColor: color.white
  },
  btnTextStyle: {
    color: color.secondaryText
  },
  popupCards: {
    fontSize: 17,
    marginVertical: 8,
    marginHorizontal: 5,
    textAlign: 'center'
  },

  popupInfo: {
    fontSize: 17,
    lineHeight: 20,
    color: color.primaryText,
    marginBottom: 20,
    textAlign: 'center'
  },
  titleStyle: {
    fontWeight: '600'
  },
  contentWraperStyle: {
    alignItems: 'center'
  },

  futureOrderTitle: {
    fontSize: 22,
    color: color.primaryBtns,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: '600'
  },
  futureOrderDescription: {
    fontSize: 17,
    color: color.primaryText,
    textAlign: 'center',
    marginBottom: 30
  },
  futureOrderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  futureOrderTime: {
    fontSize: 15,
    color: color.secondaryText
  },
  futureOrderImage: {
    width: '100%',
    height: 169,
    resizeMode: 'cover'
  },
  futureOrderContainer: {
    padding: 0,
    overflow: 'hidden'
  },
  futureOrderInnerContainer: {
    paddingHorizontal: 20
  },
  futureOrderFooter: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  futureOrderDivider: {
    width: '100%',
    height: 22
  }
});
