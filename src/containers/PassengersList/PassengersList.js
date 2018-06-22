import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';

import { Icon } from 'components';

import { changeFields } from 'actions/booking';

import styles from './styles';

class PassengersList extends Component {
  state = {
    searchValue: ''
  };

  handleSearchValueChange = (searchValue) => {
    this.setState({ searchValue });
  };

  preparePassengers = () => {
    const { passengers } = this.props;
    const { searchValue } = this.state;

    return passengers && searchValue
      ? passengers.filter(passenger =>
        passenger.firstName.includes(searchValue) || passenger.lastName.includes(searchValue))
      : passengers;
  }

  renderItem = ({ item }) => {
    const { firstName, lastName, phone, id } = item;

    const attrs = {
      ...this.props.bookingForm.defaultPaymentType,
      passengerId: id,
      passengerName: `${firstName} ${lastName}`,
      passengerPhone: phone
    };

    const isSelected = id === this.props.passengerId;

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.passengerContainer}
        onPress={() => this.props.changeFields(attrs)}
      >
        <View style={styles.avatar}>
          <Text style={{ color: '#fff' }}>{(firstName || lastName)[0]}</Text>
        </View>

        <View style={styles.titleContainer}>
          <View style={[{ marginRight: isSelected ? 12 : 0 }]}>
            <Text numberOfLines={1} style={styles.titleName}>{`${firstName} ${lastName}`}</Text>
            <Text style={styles.titlePhone}>{phone}</Text>
          </View>

          {isSelected &&
            <Icon name="check" size={13} color="#007aff" />
          }
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = item => String(item.id);

  render() {
    const { searchValue } = this.state;
    const passengers = this.preparePassengers();

    return (
      <View style={[styles.flex, styles.container]}>
        <View style={styles.searchContainer}>
          <Icon name="search" color="#8e8e93" size={14} style={styles.searchIcon} />
          <TextInput
            onChangeText={this.handleSearchValueChange}
            style={[styles.flex, styles.searchInput]}
            value={searchValue}
            placeholder="Start typing…"
          />
        </View>
        {passengers && passengers.length
          ? <FlatList
            style={[styles.flex, styles.bg]}
            data={passengers}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
          : <View style={[styles.flex, styles.container]}>
            <Text style={{ fontSize: 17 }}>No results</Text>
          </View>
        }
      </View>
    );
  }
}

const mapState = ({ booking }) => ({
  passengers: booking.formData.passengers,
  passengerId: booking.bookingForm.passengerId,
  bookingForm: booking.bookingForm
});

const mapDispatch = ({
  changeFields
});

export default connect(mapState, mapDispatch)(PassengersList);
