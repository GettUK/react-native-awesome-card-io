import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { Login, ForgotPassword } from 'containers';
import { InfoPages } from 'containers/Settings';

import { strings } from 'locales';

const routeConfiguration = {
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      header: null
    }
  },
  InfoPages: {
    screen: InfoPages,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 20 : 0,
        height: Platform.OS === 'android' ? 80 : 50
      },
      headerTitle: strings(`settings.${navigation.state.params.page}`)
    })
  }
};

const stackNavigatorConfiguration = {
  headerMode: 'screen'
};

const NavigatorLogin = StackNavigator(
  routeConfiguration,
  stackNavigatorConfiguration
);

export default NavigatorLogin;
