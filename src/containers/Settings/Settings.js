import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, View, StatusBar } from 'react-native';

import { getPassengerData, changeToggleValue, sendPredefinedAddress } from 'actions/passenger';
import { logout, resetGuide } from 'actions/session';
import { deleteToken } from 'actions/app/pushNotifications';
import { changeDevSettingField } from 'actions/app/devSettings';
import { AddressModal, Divider } from 'components';
import { has } from 'lodash';
import { throttledAction, isDevMode } from 'utils';

import {
  prepareProfileBlock,
  prepareAddressesBlock,
  prepareSwitchersBlock,
  prepareHistoryBlock,
  prepareInfoBlock,
  prepareDevBlock,
  prepareLogoutBlock,
  emptyAddress
} from './utils';

import SettingsListItem from './SettingsListItem';

import styles from './style';

class Settings extends Component {
  state = {
    logoutLoading: false
  };

  componentDidMount() {
    this.props.getPassengerData();
  }

  handleLogout = async () => {
    if (!this.state.logoutLoading && this.props.isConnected) {
      const { deleteToken, logout, navigation } = this.props;

      this.setState({ logoutLoading: true });
      await deleteToken();

      logout();
      navigation.navigate('Login', { disableAnimation: true });
    }
  };

  goToEditProfile = throttledAction(() => {
    this.props.navigation.navigate('EditProfile', { keys: ['firstName', 'lastName'] });
  });

  goToAddressesList = throttledAction(() => {
    this.props.navigation.navigate('AddressesList', { openAddressModal: this.openAddressModal });
  });

  goToCarTypesEditor = throttledAction(() => {
    this.props.navigation.navigate('CarTypesEditor');
  });

  goToSingleInputEditor = throttledAction((page) => {
    this.props.navigation.navigate('SingleInputEditor', { page });
  });

  openAddressModal = throttledAction((predefinedType) => {
    const { passengerData } = this.props;
    const address = passengerData.passenger[`${predefinedType}Address`];

    this.addressModal.open(address && address.line ? address : emptyAddress, { predefinedType });
  });

  handleAddressChange = (address, meta) => {
    this.props.sendPredefinedAddress(address, meta.predefinedType);
  };

  goToMyRides = throttledAction(() => {
    this.props.navigation.goBack(null);

    this.props.navigation.state.params.onGoToRides({ fromSettings: true });
  });

  goToMyPayments = throttledAction(() => {
    this.props.navigation.navigate('PaymentCardsList', {});
  });

  goToInfoPage = throttledAction((page) => {
    this.props.navigation.navigate('InfoPages', { page });
  });

  resetUserGuide = throttledAction(() => {
    this.props.resetGuide();
    this.props.navigation.navigate('MapView');
  });

  getSettingsBlocks() {
    const { devSettings, passengerData: data, companySettings, changeToggleValue, changeDevSettingField } = this.props;
    const { logoutLoading } = this.state;
    const devInventory = isDevMode ? prepareDevBlock(devSettings, { handleToggleChange: changeDevSettingField }) : [];

    return [
      prepareProfileBlock(data, {
        goToEditProfile: this.goToEditProfile,
        goToEmailEditor: this.goToSingleInputEditor.bind(null, 'email'),
        goToPhoneEditor: this.goToSingleInputEditor.bind(null, 'phone'),
        goToCarTypesEditor: this.goToCarTypesEditor
      }),
      prepareAddressesBlock(data, {
        goToAddressesList: this.goToAddressesList,
        openAddressModal: this.openAddressModal
      }),
      prepareSwitchersBlock(data, { handleToggleChange: changeToggleValue }),
      prepareHistoryBlock(data, {
        goToMyRides: this.goToMyRides,
        goToMyPayments: this.goToMyPayments
      }),
      prepareInfoBlock(companySettings, { goToInfoPage: this.goToInfoPage, resetUserGuide: this.resetUserGuide }),
      devInventory,
      prepareLogoutBlock({ isLoading: logoutLoading }, { onLogout: this.handleLogout })
    ];
  }

  renderBlock = (data, index) => (
    <View key={index} style={styles.blockItems}>
      {data.map((listItem, indexItem, arr) => (
        <View key={indexItem} style={styles.listItemWrapper}>
          <SettingsListItem {...listItem} />
          {indexItem + 1 < arr.length &&
            <Divider left={(has(listItem, 'avatar') && 85) || (has(listItem, 'leftIconName') && 60) || 21} />
          }
        </View>
      ))}
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <ScrollView style={styles.container}>
          {this.getSettingsBlocks().map(this.renderBlock)}
        </ScrollView>
        <AddressModal
          ref={(el) => { this.addressModal = el; }}
          onChange={this.handleAddressChange}
        />
      </View>
    );
  }
}

Settings.propTypes = {
  navigation: PropTypes.object.isRequired,
  getPassengerData: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

Settings.defaultProps = {};

const select = ({ app, passenger, network }) => ({
  passengerData: passenger.data,
  companySettings: passenger.companySettings,
  isConnected: network.isConnected,
  devSettings: app.devSettings
});

const bindActions = {
  logout,
  getPassengerData,
  changeToggleValue,
  deleteToken,
  sendPredefinedAddress,
  resetGuide,
  changeDevSettingField
};

export default connect(select, bindActions)(Settings);
