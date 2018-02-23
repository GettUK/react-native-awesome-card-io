import React from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import NavImageButton from 'components/Common/NavImageButton';
import { strings } from 'locales';
import { has } from 'lodash';
import { Icon, ScreenHeader } from 'components';

import { Map, Settings, Orders, MessageToDriver, RateDriver, ReasonForTravel } from 'containers';
import ordersStyles from 'containers/Orders/styles';
import { MessageToDriverHeader } from 'containers/MessageToDriver';

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
            icon={<Icon size={30} name="close" color="#000" />}
          />
        </View>
      )
    })
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
