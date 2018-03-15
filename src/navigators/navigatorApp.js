import React from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import { ScreenHeader } from 'components';

import { Map, Orders, MessageToDriver, RateDriver, ReasonForTravel } from 'containers';
import ordersStyles from 'containers/Orders/styles';
import { MessageToDriverHeader } from 'containers/MessageToDriver';
import SettingsNavigator from './navigatorSettings';

const routeConfiguration = {
  MapView: {
    screen: Map,
    navigationOptions: () => ({
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      },
      header: <View style={{ marginTop: 20, height: 0 }} />
    })
  },
  Settings: {
    screen: SettingsNavigator,
    navigationOptions: {
      header: null
    }
  },
  OrdersView: {
    screen: Orders,
    navigationOptions: ({ navigation }) => ({
      header: (
        <ScreenHeader
          navigation={navigation}
          title="Your Orders"
          headerStyle={ordersStyles.header}
          headerContainerStyle={ordersStyles.headerContainer}
        />
      )
    })
  },
  MessageToDriver: {
    screen: MessageToDriver,
    navigationOptions: ({ navigation }) => ({
      header: <MessageToDriverHeader navigation={navigation} />
    })
  },
  ReasonForTravel: {
    screen: ReasonForTravel,
    navigationOptions: ({ navigation }) => ({
      header: (
        <ScreenHeader
          navigation={navigation}
          title="Reason for Travel"
        />
      )
    })
  },
  RateDriver: {
    screen: RateDriver,
    navigationOptions: {
      header: null
    }
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
