import { StackNavigator } from 'react-navigation';
import { Login, ForgotPassword } from 'containers';

const routeConfiguration = {
  Login: {
    screen: Login
  },
  ForgotPassword: {
    screen: ForgotPassword
  }
};

const stackNavigatorConfiguration = {
  headerMode: 'none'
};

const NavigatorLogin = StackNavigator(
  routeConfiguration,
  stackNavigatorConfiguration
);

export default NavigatorLogin;
