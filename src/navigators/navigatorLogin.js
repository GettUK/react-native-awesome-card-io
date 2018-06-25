import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { ScreenHeader, BackBtn, Header } from 'components';
import { Login, ForgotPassword, Registration, CountrySelector } from 'containers';
import { InfoPages } from 'containers/Settings';
import styles from 'containers/Map/style';

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
          title={strings('login.selectCountryTitle')}
        />
      )
    })
  },
  Registration: {
    screen: Registration,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header
          pointerEvents="box-none"
          customStyles={[styles.header, { paddingHorizontal: 0 }]}
          navigation={navigation}
          titleCenter
          title={strings('login.signupTitle')}
          leftButton={ <BackBtn color="#fff" navigation={navigation}/>}
        />
      )
    })
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

const NavigatorLogin = createStackNavigator(
  routeConfiguration,
  stackNavigatorConfiguration
);

export default NavigatorLogin;
