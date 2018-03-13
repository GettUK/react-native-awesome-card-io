import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    backgroundColor: '#fff'
  },
  avatar: {
    alignSelf: 'center',
    width: 140,
    height: 140
  },
  input: {
    borderBottomColor: '#bcbbc1',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 17,
    marginLeft: 15,
    paddingVertical: 17
  },
  clearIcon: {
    marginRight: 20
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  }
});
