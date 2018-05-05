import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';

import { getPassengerData, changeToggleValue, sendPredefinedAddress } from 'actions/passenger';
import { logout } from 'actions/ui/logout';
import { deleteToken } from 'actions/app/pushNotifications';
import { AddressModal, Divider } from 'components';
import { has } from 'lodash';
import { throttledAction } from 'utils';

import {
  prepareProfileBlock,
  prepareAddressesBlock,
  prepareSwitchersBlock,
  prepareHistoryBlock,
  prepareInfoBlock,
  prepareLogoutBlock,
  emptyAddress
} from './utils';

import SettingsListItem from './SettingsListItem';

import styles from './style';

class Settings extends Component {
  componentDidMount() {
    this.props.getPassengerData();
  }

  handleLogout = async () => {
    if (!this.props.logoutProgress) {
      await this.props.deleteToken();

      this.props.logout();
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
    const address = passengerData.passenger[`${predefinedType}Address`] || emptyAddress;
    this.addressModal.open(address, { predefinedType });
  });

  handleAddressChange = (address, meta) => {
    this.props.sendPredefinedAddress(address, meta.predefinedType);
  };

  goToMyRides = throttledAction(() => {
    this.props.screenProps.rootNavigation.goBack();

    this.props.screenProps.rootNavigation.state.params.onGoToRides({ fromSettings: true });
  });

  goToMyPayments = throttledAction(() => {
    this.props.navigation.navigate('PaymentCardsList', {});
  });

  goToInfoPage = throttledAction((page) => {
    this.props.navigation.navigate('InfoPages', { page });
  });

  getSettingsBlocks() {
    const { passengerData: data, companySettings, changeToggleValue, logoutProgress } = this.props;

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
      prepareInfoBlock(companySettings, { goToInfoPage: this.goToInfoPage }),
      prepareLogoutBlock({ isLoading: logoutProgress }, { onLogout: this.handleLogout })
    ];
  }

  renderBlock = (data, index) => (
    <View key={index} style={styles.blockItems}>
      {data.map((listItem, indexItem, arr) => (
        <View key={indexItem} style={styles.listItemWrapper}>
          <SettingsListItem {...listItem} />
          {indexItem + 1 < arr.length &&
            <Divider
              style={[
                styles.divider,
                has(listItem, 'avatar') ? styles.avatarDivider : {},
                has(listItem, 'leftIconName') ? styles.iconDivider : {}
              ]}
            />
          }
        </View>
      ))}
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
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

const select = ({ passenger, ui }) => ({
  passengerData: passenger.data,
  companySettings: passenger.companySettings,
  logoutProgress: ui.logout.busy
});

const bindActions = {
  logout,
  getPassengerData,
  changeToggleValue,
  deleteToken,
  sendPredefinedAddress
};

export default connect(select, bindActions)(Settings);
