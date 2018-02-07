import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent'
  },
  currentPosition: {
    position: 'absolute',
    bottom: '15%',
    left: 14,
    backgroundColor: '#fff',
    zIndex: 10,
    width: 50,
    height: 50,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(178,178,178,1)',
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {
      height: 0.5
    }
  },
  headerLeftView: {
    flexDirection: 'row'
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
