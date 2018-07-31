import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, Platform } from 'react-native';

import { Icon, BackBtn } from 'components';
import { color } from 'theme';
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

const addNewAddress = throttledAction(navigation =>
  navigation.navigate('AddressEditor', { address: emptyFavouriteAddress }));

const onAddPaymentCard = throttledAction(navigation =>
  navigation.navigate(
    'PaymentCardEditor',
    { keys: ['cardNumber', 'cvv', 'holderName', 'expirationMonth', 'expirationYear', 'expirationDate'] }
  ));

const headerStyle = {
  backgroundColor: color.white,
  paddingTop: Platform.OS === 'android' ? 20 : 0,
  height: Platform.OS === 'android' ? 80 : 50
};

const RoutesConfig = {
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: color.primaryText,
      headerStyle,
      title: strings('header.title.settings'),
      headerBackTitle: strings('header.button.back'),
      headerLeft: (
        <View style={{ flexDirection: 'row' }}>
          <NavImageButton
            onClick={() => navigation.goBack(null)}
            styleView={{ marginLeft: 10 }}
            icon={<Icon size={30} name="close" color="#000" />}
          />
        </View>
      )
    })
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: ({ navigation }) => ({
      headerStyle,
      headerTitle: strings('header.title.editProfile'),
      headerLeft: <BackBtn navigation={navigation} touchedPath="passenger.temp.profileTouched" />,
      headerRight: <SaveProfileBtn navigation={navigation} />
    })
  },
  PaymentCardDetails: {
    screen: PaymentCardDetails,
    navigationOptions: ({ navigation }) => ({
      headerStyle,
      headerTitle: strings('header.title.cardDetails'),
      headerLeft: <BackBtn navigation={navigation} />
    })
  },
  PaymentCardsList: {
    screen: PaymentCardsList,
    navigationOptions: ({ navigation }) => ({
      headerStyle,
      headerTitle: strings('header.title.paymentCards'),
      headerLeft: <BackBtn navigation={navigation} />,
      headerRight: (
        <NavImageButton
          onClick={() => onAddPaymentCard(navigation)}
          styleView={{ marginRight: 10 }}
          icon={<Icon size={24} name="plus" color={color.primaryBtns} />}
        />
      )
    })
  },
  PaymentCardEditor: {
    screen: PaymentCardEditor,
    navigationOptions: ({ navigation }) => ({
      headerStyle,
      headerLeft: <BackBtn navigation={navigation} touchedPath="passenger.touched" />,
      headerTitle: strings('header.title.addCreditCard'),
      headerRight: <SavePaymentBtn navigation={navigation} />
    })
  },
  PaymentCardTypes: {
    screen: PaymentCardTypes,
    navigationOptions: ({ navigation }) => ({
      headerStyle,
      headerTitle: strings('header.title.cardType'),
      headerLeft: <BackBtn navigation={navigation} />
    })
  },
  PhonesList: {
    screen: PhonesList,
    navigationOptions: ({ navigation }) => ({
      headerStyle,
      headerTitle: strings('header.title.defaultPhone'),
      headerLeft: <BackBtn navigation={navigation} />
    })
  },
  SingleInputEditor: {
    screen: SingleInputEditor,
    navigationOptions: ({ navigation }) => ({
      headerStyle,
      headerTitle: navigation.state.params.label,
      headerLeft: <BackBtn navigation={navigation} touchedPath="passenger.temp.profileTouched" />,
      headerRight: <SaveProfileBtn navigation={navigation} />
    })
  },
  CarTypesEditor: {
    screen: CarTypesEditor,
    navigationOptions: ({ navigation }) => ({
      headerStyle,
      headerTitle: strings('header.title.defaultCarType'),
      headerLeft: <BackBtn navigation={navigation} touchedPath="passenger.temp.profileTouched" />,
      headerRight: <SaveProfileBtn navigation={navigation} />
    })
  },
  AddressesList: {
    screen: AddressesList,
    navigationOptions: ({ navigation }) => ({
      headerStyle,
      headerTitle: strings('header.title.myAddresses'),
      headerLeft: <BackBtn navigation={navigation} touchedPath="passenger.temp.addressTouched" />,
      headerRight: (
        <NavImageButton
          onClick={() => addNewAddress(navigation)}
          styleView={{ marginRight: 10 }}
          icon={<Icon size={24} name="plus" color={color.primaryBtns} />}
        />
      )
    })
  },
  AddressEditor: {
    screen: AddressEditor,
    navigationOptions: ({ navigation }) => {
      const address = navigation.state.params && navigation.state.params.address;
      return {
        headerStyle,
        headerLeft: <AddressEditorBackBtn navigation={navigation} />,
        headerTitle: address && address.id
          ? strings('header.title.editAddress') : strings('header.title.newAddress'),
        headerRight: <SaveAddressBtn navigation={navigation} />
      };
    }
  },
  InfoPages: {
    screen: InfoPages,
    navigationOptions: ({ navigation }) => ({
      headerStyle,
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
