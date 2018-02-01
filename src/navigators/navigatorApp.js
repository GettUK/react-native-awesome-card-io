import { StackNavigator } from 'react-navigation';
import AppView from 'containers/AppTest';

const routeConfiguration = {
  App: {
    screen: AppView,
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#F68C41',
      headerStyle: {
        backgroundColor: '#F68C41',
        shadowColor: 'rgba(178,178,178,1)',
        shadowOpacity: 1,
        shadowRadius: 0,
        shadowOffset: {
          height: 0.5
        }
      }
    }
  }
};

const stackNavigatorConfiguration = {
  headerMode: 'screen'
};

const NavigatorApp = StackNavigator(
  routeConfiguration,
  stackNavigatorConfiguration
);

export default NavigatorApp;
