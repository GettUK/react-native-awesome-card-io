import { createSwitchNavigator } from 'react-navigation';

import { AuthLoading } from 'containers';

import NavigatorLogin from './navigatorLogin';
import NavigatorApp from './navigatorApp';

function getEmptyHeaderOptions() {
  return { header: null };
}

const routeConfiguration = {
  NavigatorLogin: {
    screen: NavigatorLogin,
    navigationOptions: getEmptyHeaderOptions()
  },
  App: {
    screen: NavigatorApp,
    navigationOptions: getEmptyHeaderOptions()
  },
  AuthLoading: {
    screen: AuthLoading,
    navigationOptions: getEmptyHeaderOptions()
  }
};

const NavigatorRoot = createSwitchNavigator(routeConfiguration, { initialRouteName: 'AuthLoading' });

export default NavigatorRoot;
