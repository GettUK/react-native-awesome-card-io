import { Platform } from 'react-native';

export default function getDefaultHeaderStyle(navigation) {
  const headerStyle = {
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    height: Platform.OS === 'android' ? 80 : 50,
    borderBottomColor: navigation.state.params.theme.color.pixelLine
  };

  return { ...headerStyle, backgroundColor: navigation.state.params.theme.color.bgPrimary };
}
