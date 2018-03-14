import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 5,
    width: 110,
    height: 140,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  label: {
    paddingLeft: 2,
    fontSize: 14,
    color: 'rgb(127,127,127)',
    marginBottom: 2
  },
  labelPrice: {
    paddingLeft: 2,
    fontSize: 18,
    color: 'rgb(0,0,0)',
    fontWeight: 'bold',
    marginTop: 2
  },
  labelEta: {
    fontSize: 14,
    color: 'rgb(135,148,160)'
  },
  icon: {
    marginLeft: 2,
    marginRight: 6
  },
  top: {
    paddingHorizontal: 8
  },
  middle: {
    paddingHorizontal: 8,
    flexDirection: 'row'
  },
  image: {
    width: '100%'
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255, 0.6)',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 8
  }
});
