import { StyleSheet } from 'react-native';
import { color, formattedColor } from 'theme';

export default StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100
  },
  flex: {
    flex: 1
  },
  backdrop: {
    backgroundColor: formattedColor.primaryBtns.opacity(0.7),
    zIndex: 0,
    overflow: 'visible'
  },
  row: {
    flexDirection: 'row',
    zIndex: 1,
    overflow: 'visible'
  },
  holeWrapper: {
    zIndex: 1,
    overflow: 'hidden',
    bottom: 0
  },
  hole: {
    backgroundColor: 'transparent',
    borderWidth: 10,
    borderRadius: 20,
    borderColor: formattedColor.primaryBtns.opacity(0.7),
    overflow: 'hidden'
  },
  skipBtn: {
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 20
  },
  skipBtnText: {
    color: color.white,
    fontSize: 18
  },
  pointer: {
    marginBottom: 10
  },
  hintText: {
    fontSize: 20,
    color: color.white
  },
  step1: {
    zIndex: 1,
    position: 'absolute',
    bottom: 173,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 12
  },
  step2: {
    position: 'absolute',
    top: 85,
    right: 35,
    alignItems: 'center',
    paddingTop: 20
  },
  step3: {
    position: 'absolute',
    top: 45,
    left: 55,
    alignItems: 'center',
    zIndex: 1,
    paddingTop: 60
  },
  arrow1: {
    position: 'absolute',
    left: 25,
    bottom: 0
  },
  arrow2: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  arrow3: {
    position: 'absolute',
    left: 13,
    top: 0
  }
});
