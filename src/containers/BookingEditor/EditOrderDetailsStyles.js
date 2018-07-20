import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  pickUpTimeWrapper: {
    marginBottom: 30,
    paddingHorizontal: 16
  },
  pointList: {
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#efefef',
    marginBottom: 8
  },
  contentBlock: {
    backgroundColor: '#fff',
    paddingVertical: 8
  },

  mainInfoContainer: {
    marginBottom: 30
  },
  detailsContainer: {
    marginBottom: 66
  },

  listOption: {
    paddingHorizontal: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 12
  },
  title: {
    color: '#a4a4a4',
    marginBottom: 4
  },
  name: {
    fontSize: 18,
    fontWeight: '900'
  },
  divider: {
    marginLeft: -16,
    marginRight: -16,
    marginVertical: 8
  },
  orderRideBtnWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  }
});
