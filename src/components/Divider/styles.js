import { StyleSheet, PixelRatio } from 'react-native';
import { color } from 'theme';

export default StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginVertical: 0,
    marginRight: 0,
    padding: 0,
    borderBottomColor: color.pixelLine,
    borderBottomWidth: PixelRatio.get() * StyleSheet.hairlineWidth
  }
});
