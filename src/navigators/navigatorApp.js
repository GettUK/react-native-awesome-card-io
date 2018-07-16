import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';

import { ScreenHeader, BackBtn } from 'components';
import { color } from 'theme';

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
  TransitionLoading,
  PassengersList,
  Receipt,
  EditOrderDetails,
  DateRange
} from 'containers';
import { HeaderSearch } from 'containers/Orders';
import { ClearBtn } from 'containers/DateRange';
import { SaveMessageBtn, BackMessageBtn } from 'containers/MessageToDriver';
import { SaveFlightBtn } from 'containers/FlightSettings';
import { ReferencesHeader } from 'containers/References';
import { ReceiptHeader } from 'containers/Receipt';
import { SavePassengerBtn } from 'containers/PassengersList';
import { SaveTravelReasonIdBtn } from 'containers/ReasonForTravel';
import { SavePaymentMethodBtn } from 'containers/PaymentsOptions';
import { strings } from 'locales';

import SettingsNavigator from './navigatorSettings';

const headerStyle = {
  backgroundColor: color.white,
  paddingTop: Platform.OS === 'android' ? 20 : 0,
  height: Platform.OS === 'android' ? 80 : 50
};

const routeConfiguration = {
  TransitionLoading: {
    screen: TransitionLoading,
    navigationOptions: { header: null }
  },
  MapView: {
    screen: Map,
    navigationOptions: () => ({
      headerTintColor: color.primaryText,
      headerStyle: {
        backgroundColor: color.white
      },
      header: null
    })
  },
  EditOrderDetails: {
    screen: EditOrderDetails,
    navigationOptions: ({ navigation }) => ({
      headerStyle,
      headerTitle: strings('order.text.orderDetails'),
      headerLeft: <BackBtn navigation={navigation} />
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
  PassengersList: {
    screen: PassengersList,
    navigationOptions: ({ navigation }) => ({
      header: (
        <ScreenHeader
          navigation={navigation}
          title="Employees"
          leftContent={
            <BackBtn
              navigation={navigation}
              touchedPath="booking.passengerIdTouched"
              color={color.white}
              containerStyle={{ paddingLeft: 0 }}
            />
          }
          rightContent={<SavePassengerBtn navigation={navigation} />}
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
          title={strings('flight.label.flightNumber')}
          leftContent={
            <BackBtn
              navigation={navigation}
              touchedPath="booking.flightTouched"
              color={color.white}
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
          title="Reason for travel"
          leftContent={
            <BackBtn
              navigation={navigation}
              touchedPath="booking.travelReasonIdTouched"
              color={color.white}
              containerStyle={{ paddingLeft: 0 }}
            />
          }
          rightContent={<SaveTravelReasonIdBtn navigation={navigation} />}
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
          leftContent={
            <BackBtn
              navigation={navigation}
              touchedPath="booking.paymentMethodTouched"
              color={color.white}
              containerStyle={{ paddingLeft: 0 }}
            />
          }
          rightContent={<SavePaymentMethodBtn navigation={navigation} />}
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
