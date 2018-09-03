import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, View, StatusBar, Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Answers } from 'react-native-fabric';
import { has } from 'lodash';

import { getPassengerData, changeToggleValue, sendPredefinedAddress } from 'actions/passenger';
import { logout, resetGuide } from 'actions/session';
import { deleteToken } from 'actions/app/pushNotifications';
import { changeDevSettingField } from 'actions/app/devSettings';

import { AddressModal, Divider } from 'components';

import { withTheme } from 'providers';

import { throttledAction, isDevMode } from 'utils';

import { strings } from 'locales';

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
    this.props.navigation.navigate('EditProfile', { theme: this.props.theme, keys: ['firstName', 'lastName'] });
  });

  goToAddressesList = throttledAction(() => {
    Answers.logContentView('My Addresses was opened', 'screen view', 'myAddressesOpen');
    this.props.navigation.navigate('AddressesList', {
      theme: this.props.theme,
      openAddressModal: this.openAddressModal
    });
  });

  goToCarTypesEditor = throttledAction(() => {
    Answers.logContentView('Default Car type was opened', 'screen view', 'defaultCarTypeOpen');
    this.props.navigation.navigate('CarTypesEditor', { theme: this.props.theme });
  });

  goToSingleInputEditor = throttledAction((page) => {
    this.props.navigation.navigate('SingleInputEditor', { ...page, theme: this.props.theme });
  });

  goToPhonesList = throttledAction(() => {
    this.props.navigation.navigate('PhonesList', { theme: this.props.theme });
  });

  openAddressModal = throttledAction((predefinedType) => {
    const { passengerData } = this.props;
    const address = passengerData.passenger[`${predefinedType}Address`];

    this.addressModal.open(address && address.line ? address : emptyAddress, { predefinedType });
  });

  handleAddressChange = (address, meta) => {
    this.props.sendPredefinedAddress(address, meta.predefinedType);
  };

  goToNotifications = throttledAction(() => {
    this.props.navigation.goBack(null);
    Answers.logContentView('Notifications was opened', 'screen view', 'notificationsOpen');
    this.props.navigation.state.params.onGoToNotifications({ fromSettings: true });
  });

  goToMyRides = throttledAction(() => {
    this.props.navigation.goBack(null);
    Answers.logContentView('My Rides was opened', 'screen view', 'myRidesOpen');
    this.props.navigation.state.params.onGoToRides({ fromSettings: true });
  });

  goToMyPayments = throttledAction(() => {
    Answers.logContentView('Payment Cards was opened', 'screen view', 'paymentCardsOpen');
    this.props.navigation.navigate('PaymentCardsList', { theme: this.props.theme });
  });

  goToInfoPage = throttledAction((page) => {
    Answers.logContentView(`${strings(`information.${page}`)} was opened`, 'screen view', `${page}Open`);
    this.props.navigation.navigate('InfoPages', { page, theme: this.props.theme });
  });

  resetUserGuide = throttledAction(() => {
    this.props.resetGuide();
    this.props.navigation.navigate('MapView');
  });

  getSettingsBlocks() {
    const {
      devSettings,
      passengerData: data,
      companySettings,
      changeToggleValue,
      changeDevSettingField,
      unreadNotifications
    } = this.props;
    const { logoutLoading } = this.state;
    const devInventory = isDevMode ? prepareDevBlock(devSettings, { handleToggleChange: changeDevSettingField }) : [];

    const paymentsEnabled = data && data.can && data.can.seePaymentCards;

    return [
      prepareProfileBlock(data, {
        goToEditProfile: this.goToEditProfile,
        goToEmailEditor: () => this.goToSingleInputEditor({ key: 'email', label: strings('header.title.email') }),
        goToPhonesList: this.goToPhonesList,
        goToCarTypesEditor: this.goToCarTypesEditor
      }),
      prepareAddressesBlock(data, {
        goToAddressesList: this.goToAddressesList,
        openAddressModal: this.openAddressModal
      }),
      prepareSwitchersBlock(data, { handleToggleChange: changeToggleValue }),
      prepareHistoryBlock(paymentsEnabled, {
        goToMyRides: this.goToMyRides,
        goToMyPayments: this.goToMyPayments
      }),
      prepareInfoBlock(companySettings, unreadNotifications, {
        goToInfoPage: this.goToInfoPage,
        goToNotifications: this.goToNotifications,
        resetUserGuide: this.resetUserGuide
      }),
      devInventory,
      prepareLogoutBlock({ isLoading: logoutLoading }, { onLogout: this.handleLogout })
    ];
  }

  renderBlock = (data, index) => (
    <View key={index} style={[styles.blockItems]}>
      {data.map((listItem, indexItem, arr) => (
        <View key={indexItem} style={[styles.listItemWrapper, { backgroundColor: this.props.theme.color.bgPrimary }]}>
          <SettingsListItem {...listItem} />
          {indexItem + 1 < arr.length &&
            <Divider left={(has(listItem, 'avatar') && 85) || (has(listItem, 'leftIconName') && 60) || 21} />
          }
        </View>
      ))}
    </View>
  );

  renderAppVersionBlock = () => (
    <View style={styles.appVersion}>
      <Text style={styles.appVersionText}>
        {strings('settings.label.version')} {DeviceInfo.getReadableVersion()}
      </Text>
    </View>
  );

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.props.theme.color.bgSettings }]}>
        <StatusBar barStyle="default" />
        <ScrollView style={styles.container}>
          {this.getSettingsBlocks().map(this.renderBlock)}
          {this.renderAppVersionBlock()}
        </ScrollView>
        <AddressModal
          innerRef={(el) => { this.addressModal = el; }}
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

const select = ({ app, passenger, network, notifications }) => ({
  passengerData: passenger.data,
  companySettings: passenger.companySettings,
  isConnected: network.isConnected,
  devSettings: app.devSettings,
  unreadNotifications: notifications.unreadCounter
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

export default connect(select, bindActions)(withTheme(Settings));
