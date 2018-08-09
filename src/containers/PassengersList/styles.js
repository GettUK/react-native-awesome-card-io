import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'theme';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  passengerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 68
  },
  titleContainer: {
    width: width - 64,
    flexDirection: 'row',
    height: 67,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.pixelLine,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 30
  },
  titleName: {
    fontSize: 17,
    fontWeight: '600',
    color: color.primaryText
  },
  titlePhone: {
    fontSize: 14,
    color: color.secondaryText,
    marginTop: 4
  },
  avatar: {
    marginHorizontal: 12,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: color.pixelLine,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }
});

export default styles;
