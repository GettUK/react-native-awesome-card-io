import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, Text, TouchableOpacity, FlatList } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { capitalize } from 'lodash';

import { destroyFavoriteAddress, sendPredefinedAddress } from 'actions/passenger';

import { Icon } from 'components';
import { nullAddress, throttledAction, showRemovalAlert } from 'utils';
import { strings } from 'locales';
import settingsStyles from '../style';
import styles from './AddressStyles';

class AddressesList extends Component {
  state = {
    selectedID: null
  };

  static propTypes = {
    navigation: PropTypes.object,
    workAddress: PropTypes.object,
    homeAddress: PropTypes.object,
    favoriteAddresses: PropTypes.array
  };

  goToAddressEditor = throttledAction((address) => {
    this.changeSelectedID();
    this.props.navigation.navigate('AddressEditor', {
      address, editing: true, onRemove: this.removeAddress
    });
  });

  renderExistPredefinedAddress = (type, data) => (
    <View style={styles.predefinedAddress}>
      <Icon name={type} size={24} color="#bcbcbc" />
      <View style={[styles.flex, styles.addressWrapper, styles.predefinedAddressWrapper]}>
        <Text style={[styles.addressName, styles.predefinedAddressName]}>{capitalize(type)}</Text>
        <Text style={[styles.flex, styles.addressValue]} numberOfLines={1}>{data.line}</Text>
        <Icon style={styles.chevronIcon} name="chevron" size={16} color="#c7c7cc" />
      </View>
    </View>
  );

  renderEmptyPredefinedAddress = type => (
    <View style={styles.predefinedAddress}>
      <View style={styles.addAddressIcon}>
        <Icon name="plus" size={14} color="#284784" />
      </View>
      <View style={[styles.flex, styles.addressWrapper]}>
        <Text style={styles.addressValue}>Add {type} address</Text>
      </View>
    </View>
  );

  renderAddress = (type, data) => (
    <TouchableOpacity activeOpacity={0.6} onPress={() => this.props.navigation.state.params.openAddressModal(type)}>
      {data
        ? this.renderExistPredefinedAddress(type, data)
        : this.renderEmptyPredefinedAddress(type)
      }
    </TouchableOpacity>
  );

  renderPredefinedAddress = (type) => {
    const data = this.props[`${type}Address`];

    return (data && data.line
      ? this.renderItem({
        data,
        component: this.renderAddress(type, data),
        handler: () => this.removeAddress(data.id, type)
      })
      : this.renderAddress(type)
    );
  };

  changeSelectedID = (selectedID) => {
    this.setState({ selectedID });
  };

  removeAddress = (id, type, handler) => {
    const { destroyFavoriteAddress, sendPredefinedAddress } = this.props;
    const removeAction = type
      ? () => sendPredefinedAddress(nullAddress(null), type)
      : () => destroyFavoriteAddress(id);

    showRemovalAlert({
      message: strings('settings.address.confirmDelete'),
      handler: () => {
        removeAction();
        if (handler) handler();
      }
    });
  };

  keyExtractor = item => String(item.id);

  renderItem = ({ data, component, handler }) => (
    <Swipeout
      key={data.id}
      autoClose
      sensitivity={25}
      close={!(this.state.selectedID === data.id)}
      backgroundColor="#fff"
      buttonWidth={100}
      onOpen={() => this.changeSelectedID(data.id)}
      right={[
        {
          component: (
            <View style={settingsStyles.buttonView}>
              <Text style={settingsStyles.buttonText}>
                {strings('settings.address.addressDelete')}
              </Text>
              <Icon style={styles.buttonIcon} name="close" size={17} color="#fff" />
            </View>
          ),
          type: 'delete',
          onPress: handler
        }
      ]}
    >
      {component}
    </Swipeout>
  );

  renderFavoriteAddress = item => (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.6}
      onPress={() => this.goToAddressEditor(item)}
      style={styles.addressWrapper}
    >
      <View style={styles.flex}>
        <Text style={styles.addressName}>{item.name}</Text>
        <Text style={styles.addressValue}>{item.address.line}</Text>
      </View>
      <Icon style={styles.chevronIcon} name="chevron" size={16} color="#c7c7cc" />
    </TouchableOpacity>
  );

  renderFavoriteAddresses = () => (
    <FlatList
      shouldItemUpdate={(props, nextProps) => (props.item !== nextProps.item)}
      data={this.props.favoriteAddresses}
      keyExtractor={this.keyExtractor}
      renderItem={({ item }) => this.renderItem({
        data: item,
        component: this.renderFavoriteAddress(item),
        handler: () => this.removeAddress(item.id)
      })}
    />
  );

  render() {
    return (
      <ScrollView style={[styles.flex, styles.container]}>
        {this.renderPredefinedAddress('home')}
        {this.renderPredefinedAddress('work')}
        {this.renderFavoriteAddresses()}
      </ScrollView>
    );
  }
}

const mapState = ({ passenger: { data } }) => ({
  workAddress: data.passenger.workAddress,
  homeAddress: data.passenger.homeAddress,
  favoriteAddresses: data.favoriteAddresses
});

const mapDispatch = {
  destroyFavoriteAddress,
  sendPredefinedAddress
};

export default connect(mapState, mapDispatch)(AddressesList);
