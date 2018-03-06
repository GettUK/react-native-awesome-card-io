import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 5,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingTop: 8,
    paddingBottom: 7,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  icon: {
    marginRight: 20
  },
  blockItem: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textLines: {
    flexWrap: 'wrap',
    flex: 1
  },
  label: {
    fontSize: 14,
    color: 'rgb(127,127,127)',
    marginBottom: 1
  },
  labelBold: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'rgb(0,0,0)',
    marginTop: 1
  },
  loading: {
    marginTop: 2,
    alignSelf: 'center'
  },
  delimiter: {
    alignSelf: 'stretch',
    margin: 0,
    padding: 0,
    borderWidth: 0,
    marginLeft: 10,
    marginRight: 20,
    backgroundColor: '#D8D8D8',
    width: 1
  }
});
