import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { ScreenHeader } from 'components';
import { Login, ForgotPassword, Registration, CountrySelector } from 'containers';
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
  CountrySelector: {
    screen: CountrySelector,
    navigationOptions: ({ navigation }) => ({
      header: (
        <ScreenHeader
          navigation={navigation}
          title={strings('header.title.selectCountry')}
        />
      )
    })
  },
  Registration: {
    screen: Registration,
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
      headerTitle: strings(`information.${navigation.state.params.page}`)
    })
  }
};

const stackNavigatorConfiguration = {
  headerMode: 'screen'
};

const NavigatorLogin = createStackNavigator(
  routeConfiguration,
  stackNavigatorConfiguration
);

export default NavigatorLogin;
