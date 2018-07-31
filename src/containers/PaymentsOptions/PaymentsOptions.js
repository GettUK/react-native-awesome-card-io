import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { flatMap } from 'lodash';

import { Icon } from 'components';
import { color } from 'theme';

import { changePaymentMethodData } from 'actions/booking';

import {
  paymentTypeLabels,
  paymentTypeToAttrs
} from 'containers/shared/bookings/data';

import styles from './styles';

class PaymentsOptions extends Component {
  componentDidMount() {
    const { booking: { paymentType, paymentMethod, paymentCardId }, changePaymentMethodData } = this.props;
    changePaymentMethodData({ paymentType, paymentMethod, paymentCardId });
  }

  preparePaymentTypes = () => {
    const { companyPaymentTypes, paymentCards } = this.props;

    return flatMap(companyPaymentTypes, (type) => {
      if (type !== 'passenger_payment_card' && type !== 'passenger_payment_card_periodic') {
        return { value: type, label: paymentTypeLabels[type] };
      } else if (paymentCards) {
        return paymentCards.map(card => ({
          value: `${card.type}_payment_card:${card.id}`,
          label: card.title,
          id: card.id
        }));
      }
      return null;
    }).filter(Boolean);
  };

  renderItem = ({ item }) => {
    const { paymentMethodData: { paymentMethod, paymentCardId }, changePaymentMethodData } = this.props;

    const isSelected = item.value === paymentMethod || item.value === `${paymentMethod}:${paymentCardId}`;

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.item}
        onPress={() => changePaymentMethodData(paymentTypeToAttrs(item.value), true)}
      >
        <Text style={[styles.flex, styles.reasonName, isSelected ? styles.reasonNameSelected : {}]}>
          {item.label}
        </Text>

        {isSelected &&
          <Icon name="check" size={13} color={color.bgStatuses} />
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
        keyExtractor={item => item.id || item.label}
        renderItem={this.renderItem}
      />
    );
  }
}

const mapState = ({ booking, session }) => {
  const { passenger, passengers, paymentTypes } = booking.formData;
  const { passengerId } = booking.bookingForm;
  const currentId = passengerId || session.user.memberId;

  return {
    companyPaymentTypes: paymentTypes,
    paymentCards: (passenger || passengers.find(passenger => passenger.id === currentId)).paymentCards,
    booking: booking.currentOrder.id ? booking.currentOrder : booking.bookingForm,
    paymentMethodData: booking.tempPaymentMethodData || {}
  };
};

const mapDispatch = ({
  changePaymentMethodData
});

export default connect(mapState, mapDispatch)(PaymentsOptions);
