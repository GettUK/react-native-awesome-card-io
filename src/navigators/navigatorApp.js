import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import { ScreenHeader, BackBtn } from 'components';

import {
  Map,
  Orders,
  MessageToDriver,
  RateDriver,
  ReasonForTravel,
  PaymentsOptions,
  References,
  ReferenceValueSelector
} from 'containers';
import ordersStyles from 'containers/Orders/styles';
import { MessageToDriverHeader } from 'containers/MessageToDriver';
import { ReferencesHeader } from 'containers/References';
import { SaveRatingBtn } from 'containers/RateDriver';
import { strings } from 'locales';

import SettingsNavigator from './navigatorSettings';

const routeConfiguration = {
  MapView: {
    screen: Map,
    navigationOptions: () => ({
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      },
      header: null
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
          onBackPress={navigation.state.params && navigation.state.params.fromSettings
            ? () => {
              navigation.goBack();
              navigation.navigate('Settings', { onGoToRides: navigation.state.params.onGoToRides });
            }
            : null
          }
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
  PaymentsOptions: {
    screen: PaymentsOptions,
    navigationOptions: ({ navigation }) => ({
      header: (
        <ScreenHeader
          navigation={navigation}
          title="Available payment methods"
        />
      )
    })
  },
  References: {
    screen: References,
    navigationOptions: ({ navigation }) => ({
      header: <ReferencesHeader navigation={navigation} />
    })
  },
  ReferenceValueSelector: {
    screen: ReferenceValueSelector,
    navigationOptions: ({ navigation }) => {
      const reference = navigation.state.params && navigation.state.params.reference;
      return {
        header: (
          <ScreenHeader
            navigation={navigation}
            title={reference.name}
          />
        )
      };
    }
  },
  RateDriver: {
    screen: RateDriver,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 20 : 0,
        height: Platform.OS === 'android' ? 80 : 50
      },
      headerTitle: strings('rateYourDriver'),
      headerLeft: <BackBtn navigation={navigation} touchedPath="bookings.currentOrder.tempDriverRating" />,
      headerRight: <SaveRatingBtn navigation={navigation} />
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
