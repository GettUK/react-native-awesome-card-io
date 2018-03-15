import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, Text, TouchableOpacity, FlatList } from 'react-native';
import capitalize from 'lodash/capitalize';

import { Icon } from 'components';
import { emptyAddress } from '../utils';
import styles from './AddressStyles';

class AddressesList extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    workAddress: PropTypes.object,
    homeAddress: PropTypes.object,
    favoriteAddresses: PropTypes.array
  };

  goToAddressEditor = (address, predefinedType) => {
    this.props.navigation.navigate('AddressEditor', { address, predefinedType });
  };

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

  renderPredefinedAddress = (type) => {
    const data = this.props[`${type}Address`];

    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => this.goToAddressEditor(data || emptyAddress, type)}>
        {data
          ? this.renderExistPredefinedAddress(type, data)
          : this.renderEmptyPredefinedAddress(type)
        }
      </TouchableOpacity>
    );
  };

  keyExtractor = item => String(item.id);

  renderFavoriteAddresses = () => (
      <FlatList
        data={this.props.favoriteAddresses}
        keyExtractor={this.keyExtractor}
        renderItem={({ item }) => (
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
        )}
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

export default connect(mapState)(AddressesList);
