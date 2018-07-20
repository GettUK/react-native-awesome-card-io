import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';

import { Icon, SearchList } from 'components';

import { changeFields, changePassengerId } from 'actions/booking';

import { filterBySearchValue } from 'utils';

import styles from './styles';

class PassengersList extends PureComponent {
  state = {
    searchValue: ''
  };

  componentDidMount() {
    const { booking, changePassengerId } = this.props;
    changePassengerId(booking.passengerId);
  }

  handleSearchValueChange = (searchValue) => {
    this.setState({ searchValue });
  };

  preparePassengers = () => {
    const { passengers } = this.props;
    const { searchValue } = this.state;

    return passengers && searchValue
      ? filterBySearchValue(passengers, ['firstName', 'lastName'], searchValue)
      : passengers;
  };

  renderItem = ({ item }) => {
    const { firstName, lastName, phone, id } = item;
    const { passengerId, changePassengerId } = this.props;

    const isSelected = id === passengerId;

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.passengerContainer}
        onPress={() => changePassengerId(id, true)}
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
      <SearchList
        searchValue={searchValue}
        onSearchValueChange={this.handleSearchValueChange}
        data={passengers}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const mapState = ({ booking }) => ({
  passengers: booking.formData.passengers,
  passengerId: booking.tempPassengerId,
  booking: booking.currentOrder.id ? booking.currentOrder : booking.bookingForm
});

const mapDispatch = ({
  changeFields,
  changePassengerId
});

export default connect(mapState, mapDispatch)(PassengersList);
