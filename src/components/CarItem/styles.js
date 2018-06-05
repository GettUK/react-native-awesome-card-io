import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 5,
    marginTop: 15,
    width: 110,
    height: 140,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 0
    }
  },
  containerSmall: {
    height: 116
  },
  activeContainer: {
    width: 114,
    height: 144,
    margin: 0,
    marginTop: 0,
    shadowRadius: 0
  },
  activeContainerSmall: {
    height: 120
  },
  activeBackground: {
    width: 134,
    height: 164,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  },
  activeBackgroundSmall: {
    height: 130
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
    width: '100%',
    height: 40
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255, 0.6)',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 8
  }
});
