import React from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import NavImageButton from 'components/Common/NavImageButton';
import { strings } from 'locales';

import { Map, Settings } from 'containers';

import assets from 'assets';

const routeConfiguration = {
  MapView: {
    screen: Map,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      },
      header: <View style={{ marginTop: 20, height: 0 }} />
    })
  },
  SettingsView: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      },
      title: strings('settings.headerTitle'),
      headerLeft: (
        <View style={{ flexDirection: 'row' }}>
          <NavImageButton
            onClick={() => navigation.goBack(null)}
            styleContainer={{ justifyContent: 'center' }}
            styleView={{ marginLeft: 10 }}
            styleImage={{ width: 21, height: 20 }}
            source={assets.close}
          />
        </View>
      )
    })
  }
};

const stackNavigatorConfiguration = {
  headerMode: 'screen',
  transitionConfig: () => ({
    screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid
  })
};

const NavigatorApp = StackNavigator(
  routeConfiguration,
  stackNavigatorConfiguration
);

export default NavigatorApp;
