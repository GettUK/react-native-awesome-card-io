import { StackNavigator } from 'react-navigation';
import {Login, ForgotPassword} from 'containers';

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
