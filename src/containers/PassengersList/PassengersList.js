import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { color } from 'theme';

import { Icon, SearchList } from 'components';

import { savePassenger } from 'actions/booking';

import { withTheme } from 'providers';

import { filterBySearchValue } from 'utils';

import styles from './styles';

class PassengersList extends PureComponent {
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
      ? filterBySearchValue(passengers, ['firstName', 'lastName'], searchValue)
      : passengers;
  };

  onPressItem = (id) => {
    const { savePassenger } = this.props;
    savePassenger(id);
    this.onCloseModal();
  };

  renderItem = ({ item }) => {
    const { firstName, lastName, phone, id, avatarUrl } = item;
    const { booking: { passengerId }, theme } = this.props;

    const isSelected = id === passengerId;

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.passengerContainer}
        onPress={() => this.onPressItem(id)}
      >
        <View style={styles.avatar}>
          {avatarUrl
            ? <Image source={{ uri: avatarUrl }} resizeMode="contain" style={styles.avatar} />
            : <Text style={{ color: color.white }}>{(firstName || lastName)[0]}</Text>
          }
        </View>

        <View style={[styles.titleContainer, { borderBottomColor: theme.color.pixelLine }]}>
          <View style={[{ marginRight: isSelected ? 12 : 0 }]}>
            <Text numberOfLines={1} style={[styles.titleName, { color: theme.color.primaryText }]}>
              {`${firstName} ${lastName}`}
            </Text>
            <Text style={styles.titlePhone}>{phone}</Text>
          </View>

          {isSelected &&
            <Icon name="check" size={13} color={color.bgStatuses} />
          }
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = item => String(item.id);

  onCloseModal = () => {
    this.props.onClose();
    this.handleSearchValueChange('');
  };

  render() {
    const { searchValue } = this.state;
    const passengers = this.preparePassengers();

    return (
      <SearchList
        type="inline"
        searchValue={searchValue}
        onSearchValueChange={this.handleSearchValueChange}
        placeholder="Search Name"
        data={passengers || []}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const mapState = ({ booking }) => ({
  passengers: booking.formData.passengers
});

const mapDispatch = ({
  savePassenger
});

export default connect(mapState, mapDispatch)(withTheme(PassengersList));
