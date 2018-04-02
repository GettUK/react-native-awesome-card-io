import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';

import { getPassengerData, changeToggleValue } from 'actions/passenger';
import { logout } from 'actions/ui/logout';
import { deleteToken } from 'actions/app/pushNotifications';

import {
  prepareProfileBlock,
  prepareAddressesBlock,
  prepareSwitchersBlock,
  prepareHistoryBlock,
  prepareInfoBlock,
  prepareLogoutBlock
} from './utils';

import SettingsListItem from './SettingsListItem';

import styles from './style';

class Settings extends Component {
  componentDidMount() {
    this.props.getPassengerData();
  }

  handleLogout = async () => {
    if (!this.props.logoutProgress) {
      // TODO: uncommit when API update (route - /user-devices)
      // await this.props.deleteToken();

      this.props.logout();
    }
  };

  goToEditProfile = () => {
    this.props.navigation.navigate('EditProfile');
  };

  goToAddressesList = () => {
    this.props.navigation.navigate('AddressesList');
  };

  goToAddressEditor = (predefinedType) => {
    const { navigation, passengerData } = this.props;
    const address = passengerData.passenger[`${predefinedType}Address`];
    navigation.navigate('AddressEditor', { address, predefinedType });
  };

  goToMyRides = () => {
    this.props.screenProps.rootNavigation.navigate('OrdersView');
  };

  goToInfoPage = (page) => {
    this.props.navigation.navigate('InfoPages', { page });
  };

  renderBlock = (data, index) => (
    <View key={index} style={styles.blockItems}>
      {data.map((listItem, indexItem) => <SettingsListItem key={indexItem} {...listItem} />)}
    </View>
  );

  render() {
    const { passengerData: data, changeToggleValue, logoutProgress } = this.props;

    const settingsBlocks = [
      prepareProfileBlock(data, { goToEditProfile: this.goToEditProfile }),
      prepareAddressesBlock(data, {
        goToAddressesList: this.goToAddressesList,
        goToAddressEditor: this.goToAddressEditor
      }),
      prepareSwitchersBlock(data, { handleToggleChange: changeToggleValue }),
      prepareHistoryBlock(data, { goToMyRides: this.goToMyRides }),
      prepareInfoBlock(data, { goToInfoPage: this.goToInfoPage }),
      prepareLogoutBlock({ isLoading: logoutProgress }, { onLogout: this.handleLogout })
    ];

    return (
      <ScrollView style={styles.container}>
        {settingsBlocks.map(this.renderBlock)}
      </ScrollView>
    );
  }
}

Settings.propTypes = {
  // navigation: PropTypes.object.isRequired,
  getPassengerData: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

Settings.defaultProps = {};

const select = ({ passenger, ui }) => ({
  passengerData: passenger.data,
  logoutProgress: ui.logout.busy
});

const bindActions = {
  logout,
  getPassengerData,
  changeToggleValue,
  deleteToken
};

export default connect(select, bindActions)(Settings);
