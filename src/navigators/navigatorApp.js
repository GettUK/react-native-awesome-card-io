import React from 'react';
import { createStackNavigator } from 'react-navigation';
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';

import { ScreenHeader, BackBtn } from 'components';
import { color } from 'theme';

import {
  Map,
  Orders,
  RateDriver,
  TransitionLoading,
  Receipt,
  EditOrderDetails,
  DateRange,
  Notifications
} from 'containers';
import { HeaderSearch } from 'containers/Orders';
import { ClearBtn } from 'containers/DateRange';
import { ReceiptHeader } from 'containers/Receipt';
import { strings } from 'locales';

import SettingsNavigator from './navigatorSettings';

import getDefaultHeaderStyle from './utils';

const onBackReturnable = navigation => (
  navigation.state.params && navigation.state.params.fromSettings
    ? () => {
      navigation.goBack();
      navigation.navigate('Settings', {
        onGoToRides: navigation.state.params.onGoToRides,
        onGoToNotifications: navigation.state.params.onGoToNotifications,
        theme: navigation.state.params.theme
      });
    }
    : null
);

const routeConfiguration = {
  TransitionLoading: {
    screen: TransitionLoading,
    navigationOptions: { header: null }
  },
  MapView: {
    screen: Map,
    navigationOptions: () => ({
      headerTintColor: color.primaryText,
      header: null
    })
  },
  EditOrderDetails: {
    screen: EditOrderDetails,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: navigation.state.params.theme.color.primaryText,
      headerStyle: getDefaultHeaderStyle(navigation),
      headerTitle: strings('order.text.orderDetails'),
      headerLeft: <BackBtn
        navigation={navigation}
        backAction={navigation.state.params && navigation.state.params.restoreFutureOrder}
      />
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
        <HeaderSearch navigation={navigation} />
      )
    })
  },
  DateRange: {
    screen: DateRange,
    navigationOptions: ({ navigation }) => ({
      header: (
        <ScreenHeader
          navigation={navigation}
          title={strings('header.title.dateRange')}
          rightContent={<ClearBtn navigation={navigation} />}
        />
      )
    })
  },
  NotificationsView: {
    screen: Notifications,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: navigation.state.params.theme.color.primaryText,
      headerStyle: getDefaultHeaderStyle(navigation),
      headerTitle: 'Notifications History',
      headerLeft: <BackBtn handlePress={onBackReturnable(navigation)} />
    })
  },
  RateDriver: {
    screen: RateDriver,
    navigationOptions: {
      header: null
    }
  },
  Receipt: {
    screen: Receipt,
    navigationOptions: ({ navigation }) => ({
      header: <ReceiptHeader navigation={navigation} />
    })
  }
};

const loadTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({ inputRange, outputRange: [0, 1, 1] });

  return { opacity };
};

const stackNavigatorConfiguration = {
  headerMode: 'screen',
  initialRouteName: 'TransitionLoading',
  transitionConfig: () => ({
    screenInterpolator: (sceneProps) => {
      const { position, scene } = sceneProps;
      const { index, route } = scene;
      const params = route.params || {};
      const transition = params.transition || 'default';

      return {
        loadTransition: loadTransition(index, position),
        default: StackViewStyleInterpolator.forFadeFromBottomAndroid(sceneProps)
      }[transition];
    }
  })
};

const NavigatorApp = createStackNavigator(
  routeConfiguration,
  stackNavigatorConfiguration
);

export default NavigatorApp;
