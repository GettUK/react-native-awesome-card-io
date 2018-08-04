import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { Icon, BackBtn } from 'components';
import NavImageButton from 'components/Common/NavImageButton';

import { Settings } from 'containers';
import {
  EditProfile,
  SingleInputEditor,
  PhonesList,
  AddressesList,
  AddressEditor,
  SaveAddressBtn,
  InfoPages,
  SaveProfileBtn,
  PaymentCardDetails,
  PaymentCardEditor,
  PaymentCardsList,
  PaymentCardTypes,
  SavePaymentBtn,
  CarTypesEditor,
  AddressEditorBackBtn
} from 'containers/Settings';
import { emptyFavouriteAddress } from 'containers/Settings/utils';

import { strings } from 'locales';
import { throttledAction } from 'utils';

import getDefaultHeaderStyle from './utils';

const addNewAddress = throttledAction(navigation =>
  navigation.navigate('AddressEditor', { address: emptyFavouriteAddress, theme: navigation.state.params.theme }));

const onAddPaymentCard = throttledAction(navigation =>
  navigation.navigate(
    'PaymentCardEditor',
    {
      keys: ['cardNumber', 'cvv', 'holderName', 'expirationMonth', 'expirationYear', 'expirationDate'],
      theme: navigation.state.params.theme
    }
  ));

const navigationOptions = (
  navigation,
  { headerTitle, title, headerLeft = null, headerRight = null, backOptions = {} }
) => ({
  headerTintColor: navigation.state.params.theme.color.primaryText,
  headerStyle: getDefaultHeaderStyle(navigation),
  headerTitle: headerTitle || strings(`header.title.${title}`),
  headerLeft: headerLeft || <BackBtn navigation={navigation} {...backOptions} />,
  headerRight
});

const RoutesConfig = {
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => navigationOptions(navigation, {
      title: 'settings',
      headerLeft:
        <NavImageButton
          onClick={() => navigation.goBack(null)}
          styleView={{ marginLeft: 10 }}
          icon={<Icon size={30} name="close" color={navigation.state.params.theme.color.primaryText} />}
        />
    })
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: ({ navigation }) => navigationOptions(navigation, {
      title: 'editProfile',
      headerRight: <SaveProfileBtn navigation={navigation} />,
      backOptions: { touchedPath: 'passenger.temp.profileTouched' }
    })
  },
  PaymentCardDetails: {
    screen: PaymentCardDetails,
    navigationOptions: ({ navigation }) => navigationOptions(navigation, { title: 'cardDetails' })
  },
  PaymentCardsList: {
    screen: PaymentCardsList,
    navigationOptions: ({ navigation }) => navigationOptions(navigation, {
      title: 'paymentCards',
      headerRight:
        <NavImageButton
          onClick={() => onAddPaymentCard(navigation)}
          styleView={{ marginRight: 10 }}
          icon={<Icon size={24} name="plus" color={navigation.state.params.theme.color.primaryBtns} />}
        />
    })
  },
  PaymentCardEditor: {
    screen: PaymentCardEditor,
    navigationOptions: ({ navigation }) => navigationOptions(navigation, {
      title: 'addCreditCard',
      headerRight: <SavePaymentBtn navigation={navigation} />,
      backOptions: { touchedPath: 'passenger.touched' }
    })
  },
  PaymentCardTypes: {
    screen: PaymentCardTypes,
    navigationOptions: ({ navigation }) => navigationOptions(navigation, { title: 'cardType' })
  },
  PhonesList: {
    screen: PhonesList,
    navigationOptions: ({ navigation }) => navigationOptions(navigation, { title: 'defaultPhone' })
  },
  SingleInputEditor: {
    screen: SingleInputEditor,
    navigationOptions: ({ navigation }) => navigationOptions(navigation, {
      headerTitle: navigation.state.params.label,
      headerRight: <SaveProfileBtn navigation={navigation} />,
      backOptions: { touchedPath: 'passenger.temp.profileTouched' }
    })
  },
  CarTypesEditor: {
    screen: CarTypesEditor,
    navigationOptions: ({ navigation }) => navigationOptions(navigation, {
      title: 'defaultCarType',
      headerRight: <SaveProfileBtn navigation={navigation} />,
      backOptions: { touchedPath: 'passenger.temp.profileTouched' }
    })
  },
  AddressesList: {
    screen: AddressesList,
    navigationOptions: ({ navigation }) => navigationOptions(navigation, {
      title: 'myAddresses',
      headerRight:
        <NavImageButton
          onClick={() => addNewAddress(navigation)}
          styleView={{ marginRight: 10 }}
          icon={<Icon size={24} name="plus" color={navigation.state.params.theme.color.primaryBtns} />}
        />,
      backOptions: { touchedPath: 'passenger.temp.addressTouched' }
    })
  },
  AddressEditor: {
    screen: AddressEditor,
    navigationOptions: ({ navigation }) => navigationOptions(navigation, {
      headerTitle: navigation.state.params.address.id
        ? strings('header.title.editAddress')
        : strings('header.title.newAddress'),
      headerLeft: <AddressEditorBackBtn navigation={navigation} />,
      headerRight: <SaveAddressBtn navigation={navigation} />
    })
  },
  InfoPages: {
    screen: InfoPages,
    navigationOptions: ({ navigation }) => navigationOptions(navigation, {
      headerTitle: strings(`information.${navigation.state.params.page}`)
    })
  }
};

export default createStackNavigator(
  RoutesConfig,
  {
    initialRouteName: 'Settings'
  }
);
