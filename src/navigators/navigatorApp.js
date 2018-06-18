import React from 'react';
import { createStackNavigator } from 'react-navigation';
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';

import { ScreenHeader, BackBtn, Header } from 'components';

import {
  Map,
  Orders,
  MessageToDriver,
  RateDriver,
  ReasonForTravel,
  PaymentsOptions,
  References,
  FlightSettings,
  ReferenceValueSelector,
  TransitionLoading
} from 'containers';
import ordersStyles from 'containers/Orders/styles';
import styles from 'containers/Map/style';
import { SaveMessageBtn, BackMessageBtn } from 'containers/MessageToDriver';
import { SaveFlightBtn } from 'containers/FlightSettings';
import { ReferencesHeader } from 'containers/References';
import { SaveRatingBtn } from 'containers/RateDriver';
import { strings } from 'locales';

import SettingsNavigator from './navigatorSettings';

const routeConfiguration = {
  TransitionLoading: {
    screen: TransitionLoading,
    navigationOptions: { header: null }
  },
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
          half
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
      header: (
        <ScreenHeader
          navigation={navigation}
          title="Message to Driver"
          leftContent={<BackMessageBtn navigation={navigation} />}
          rightContent={<SaveMessageBtn navigation={navigation} />}
        />
      )
    })
  },
  FlightSettings: {
    screen: FlightSettings,
    navigationOptions: ({ navigation }) => ({
      header: (
        <ScreenHeader
          navigation={navigation}
          title={strings('flights.number')}
          leftContent={
            <BackBtn
              navigation={navigation}
              touchedPath="booking.flightTouched"
              color="#fff"
              containerStyle={{ paddingLeft: 0 }}
            />
          }
          rightContent={<SaveFlightBtn navigation={navigation} />}
        />
      )
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
      header: (
        <Header
          pointerEvents="box-none"
          customStyles={[styles.header, { paddingHorizontal: 0 }]}
          navigation={navigation}
          leftButton={
            <BackBtn
              color="#fff"
              navigation={navigation}
              touchedPath="booking.currentOrder.tempDriverRating"
            />
          }
          rightButton={<SaveRatingBtn navigation={navigation} />}
        />
      )
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
