import { StyleSheet } from 'react-native';
import { color, formattedColor } from 'theme';

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 20,
    marginLeft: 0,
    marginRight: 0,
    borderWidth: 2,
    borderRadius: 26,
    borderColor: formattedColor.white.opacity(0.5)
  },

  btn: {
    borderRadius: 26,
    backgroundColor: 'transparent'
  },

  btnText: {
    color: color.white,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  disabledBtn: {
    backgroundColor: 'transparent',
    opacity: 0.5
  }
});

export default styles;
