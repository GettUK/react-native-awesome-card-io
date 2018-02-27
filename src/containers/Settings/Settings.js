import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { isNull, isEqual } from 'lodash/fp';

import {
  passegerViewEmpty,
  receivePassegerView
} from 'actions/ui/passenger-view';
import { logout } from 'actions/ui/logout';

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
    const { passengerView: { results, errors } } = this.props;
    if (!isNull(errors)) {
      this.receivePasseger();
    } else {
      if (isNull(results)) {
        this.receivePasseger();
      }
    }
  }

  componentWillReceiveProps({ network: { isConnected } }) {
    const {
      network: { isConnected: oldIsConnected },
      sessionData: { member_id: memberId }
    } = this.props;

    if (!isEqual(oldIsConnected, isConnected) && isConnected) {
      this.props.receivePassegerView(memberId);
    }
  }

  receivePasseger = () => {
    const {
      network: { isConnected },
      sessionData: { member_id: memberId }
    } = this.props;

    if (isConnected) {
      this.props.receivePassegerView(memberId);
    } else {
      this.props.passegerViewEmpty();
    }
  };

  handleLogout = () => {
    this.props.logout();
  };

  renderBlock = (data, index) => (
    <View key={index} style={styles.blockItems}>
      {data.map((listItem, indexItem) => <SettingsListItem key={indexItem} {...listItem} />)}
    </View>
  );

  render() {
    const { passengerView } = this.props;
    const results = passengerView.results || {};

    const settingsBlocks = [
      prepareProfileBlock(results),
      prepareAddressesBlock(results),
      prepareSwitchersBlock(results),
      prepareHistoryBlock(results),
      prepareInfoBlock(results),
      prepareLogoutBlock(results, { onLogout: this.handleLogout })
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
  network: PropTypes.object.isRequired,
  sessionData: PropTypes.object.isRequired,
  passengerView: PropTypes.object.isRequired,
  passegerViewEmpty: PropTypes.func.isRequired,
  receivePassegerView: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

Settings.defaultProps = {};

const select = ({ session, ui, network }) => ({
  network,
  sessionData: session.result,
  passengerView: ui.passengerView
});

const bindActions = {
  passegerViewEmpty,
  receivePassegerView,
  logout
};

export default connect(select, bindActions)(Settings);
