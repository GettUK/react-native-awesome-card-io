import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});

export default styles;
