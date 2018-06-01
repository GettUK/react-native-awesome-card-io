import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    backgroundColor: '#fff'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 77,
    marginLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D2DCDA',
    paddingRight: 8
  },
  button: {
    marginHorizontal: 12
  },
  image: {
    width: 110,
    resizeMode: 'contain'
  },
  label: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 17,
    lineHeight: 28,
    color: '#000'
  },
  modalWrapper: {
    height: 320,
    paddingHorizontal: 16
  },
  modalHeader: {
    fontSize: 20,
    marginTop: 8
  },
  modalCarImage: {
    height: 70,
    width: 160,
    marginVertical: 8
  },
  modalDesc: { fontSize: 14 },
  featuresBlock: { paddingVertical: 8 },
  featuresItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4
  },
  featuresLabel: {
    fontSize: 14,
    paddingLeft: 12
  },
  feesDesc: {
    color: 'grey',
    fontSize: 11,
    marginTop: 8
  }
});
