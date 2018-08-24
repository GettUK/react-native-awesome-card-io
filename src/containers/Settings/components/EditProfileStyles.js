import { StyleSheet } from 'react-native';
import { color, formattedColor } from 'theme';

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    backgroundColor: color.white
  },
  avatar: {
    alignSelf: 'center',
    width: 140,
    height: 140
  },
  input: {
    fontSize: 17
  },
  inputContainer: {
    marginLeft: 16,
    paddingTop: 8
  },
  allowClearStyle: {
    paddingRight: 47
  },
  clearIcon: {
    marginRight: 20
  },
  labelStyle: {
    marginTop: 5,
    color: color.secondaryText
  },
  cameraWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    borderRadius: 100,
    overflow: 'hidden'
  },
  cameraIcon: {
    position: 'absolute'
  },
  avatarBackDrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: formattedColor.primaryText.opacity(0.3)
  }
});
