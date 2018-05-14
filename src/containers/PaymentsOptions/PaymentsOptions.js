import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { flatMap } from 'lodash';

import { Icon } from 'components';

import { changeFields } from 'actions/booking';

import {
  paymentTypeLabels,
  paymentTypeToAttrs
} from 'containers/shared/bookings/data';

import styles from './styles';

class PaymentsOptions extends Component {
  preparePaymentTypes = () => {
    const { companyPaymentTypes, paymentCards } = this.props;

    return flatMap(companyPaymentTypes, (type) => {
      if (type !== 'passenger_payment_card' && type !== 'passenger_payment_card_periodic') {
        return { value: type, label: paymentTypeLabels[type] };
      } else if (paymentCards) {
        return paymentCards.map(card => ({ value: `${card.type}_payment_card:${card.id}`, label: card.title }));
      }
      return null;
    }).filter(Boolean);
  };

  renderItem = ({ item }) => {
    const { paymentMethod, paymentCardId, changeFields } = this.props;

    const isSelected = item.value === paymentMethod || item.value === `${paymentMethod}:${paymentCardId}`;

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.item}
        onPress={() => changeFields(paymentTypeToAttrs(item.value))}
      >
        <Text style={[styles.flex, styles.reasonName, isSelected ? styles.reasonNameSelected : {}]}>
          {item.label}
        </Text>

        {isSelected &&
          <Icon name="check" size={13} color="#007aff" />
        }
      </TouchableOpacity>
    );
  };

  renderSeparator = () => <View style={styles.separator}/>;

  render() {
    const paymentTypes = this.preparePaymentTypes();

    return (
      <FlatList
        style={[styles.flex, styles.bg]}
        data={paymentTypes}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={item => item.label}
        renderItem={this.renderItem}
      />
    );
  }
}

const mapState = ({ booking, session }) => {
  const { passenger, passengers, paymentTypes } = booking.formData;
  return {
    companyPaymentTypes: paymentTypes,
    paymentCards: (passenger || passengers.find(passenger => passenger.id === session.user.memberId)).paymentCards,
    paymentMethod: booking.bookingForm.paymentMethod || '',
    paymentCardId: booking.bookingForm.paymentCardId || ''
  };
};

const mapDispatch = ({
  changeFields
});

export default connect(mapState, mapDispatch)(PaymentsOptions);
