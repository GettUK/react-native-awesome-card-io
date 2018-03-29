import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';
import { View } from 'react-native';
import { Icon } from 'components';
import NavImageButton from 'components/Common/NavImageButton';
import { Settings } from 'containers';
import {
  EditProfile,
  SaveProfileBtn,
  AddressesList,
  AddressEditor,
  DestroyFavouriteAddressBtn,
  InfoPages,
  BackBtn
} from 'containers/Settings';
import { emptyFavouriteAddress } from 'containers/Settings/utils';

import { strings } from 'locales';

const RoutesConfig = {
  Settings: {
    screen: Settings,
    navigationOptions: ({ screenProps }) => ({
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      },
      title: strings('settings.headerTitle'),
      headerBackTitle: strings('back'),
      headerLeft: (
          <View style={{ flexDirection: 'row' }}>
            <NavImageButton
              onClick={() => screenProps.rootNavigation.goBack(null)}
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
      headerTitle: strings('settings.editProfile'),
      headerLeft: <BackBtn navigation={navigation} field="profile" />,
      headerRight: <SaveProfileBtn navigation={navigation} />
    })
  },
  AddressesList: {
    screen: AddressesList,
    navigationOptions: ({ navigation }) => ({
      headerTitle: strings('settings.myAddresses'),
      headerLeft: <BackBtn navigation={navigation} />,
      headerRight: (
        <NavImageButton
          onClick={() => navigation.navigate('AddressEditor', { address: emptyFavouriteAddress })}
          styleView={{ marginRight: 10 }}
          icon={<Icon size={24} name="plus" color="#284784" />}
        />
      )
    })
  },
  AddressEditor: {
    screen: AddressEditor,
    navigationOptions: ({ navigation }) => {
      const address = navigation.state.params && navigation.state.params.address;
      return {
        headerLeft: <BackBtn navigation={navigation} field="address" />,
        headerTitle: address.id ? strings('settings.editAddress') : strings('settings.newAddress'),
        headerRight: address.passengerId ? <DestroyFavouriteAddressBtn navigation={navigation} id={address.id} /> : null
      };
    }
  },
  InfoPages: {
    screen: InfoPages
  }
};

const SettingsNavigator = StackNavigator(
  RoutesConfig,
  {
    initialRouteName: 'Settings'
  }
);

export default class SettingsNavigation extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  state = {
    currentRoute: 'Settings'
  };

  handleStateChange = (prevState, currentState) => {
    const currentRoute = currentState.routes[currentState.index];

    this.setState({ currentRoute: currentRoute.routeName });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SettingsNavigator
          onNavigationStateChange={this.handleStateChange}
          screenProps={{
            rootNavigation: this.props.navigation,
            values: Object.keys(RoutesConfig),
            currentRoute: this.state.currentRoute
          }}
        />
      </View>
    );
  }
}
