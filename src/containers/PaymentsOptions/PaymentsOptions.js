import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { flatMap, capitalize, last, split } from 'lodash';

import { Icon, CheckBox, Divider, ListView } from 'components';
import { color } from 'theme';

import { changeFields, updateBooking } from 'actions/booking';

import {
  paymentTypeLabels,
  paymentTypeToAttrs
} from 'containers/shared/bookings/data';
import { withTheme } from 'providers';

import itemStyle from '../Settings/components/PaymentCards/styles';
import styles from './styles';

class PaymentsOptions extends Component {
  preparePaymentTypes = () => {
    const { companyPaymentTypes, paymentCards } = this.props;

    return flatMap(companyPaymentTypes, (type) => {
      if (type !== 'passenger_payment_card' && type !== 'passenger_payment_card_periodic') {
        return { value: type, label: paymentTypeLabels[type], icon: type };
      } else if (paymentCards) {
        return paymentCards.map(card => ({
          value: `${card.type}_payment_card:${card.id}`,
          label: `${capitalize(card.type)} card ${last(split(card.title, ' '))}`,
          icon: 'paymentMethod',
          id: card.id
        }));
      }
      return null;
    }).filter(Boolean);
  };

  onChangePaymentType = (item) => {
    const { onClose, changeFields, updateBooking, updateEnabled } = this.props;
    onClose();
    setTimeout(() => {
      changeFields(paymentTypeToAttrs(item.value), true);
      if (updateEnabled) updateBooking();
    }, 350); // for smooth animation
  };

  renderItem = ({ item, index }) => {
    const { booking: { paymentMethod, paymentCardId } } = this.props;
    const paymentTypes = this.preparePaymentTypes();
    const isSelected = item.value === paymentMethod || item.value === `${paymentMethod}:${paymentCardId}`;

    return (
      <TouchableOpacity key={index} activeOpacity={0.6} onPress={() => this.onChangePaymentType(item)}>
        <View style={[itemStyle.commonContainer, itemStyle.paymentWrapper]}>
          <View style={itemStyle.checkboxWrapper}>
            <CheckBox status={isSelected} />
          </View>
          <View style={itemStyle.paymentView}>
            {item.icon && <Icon style={styles.icon} name={item.icon} color={color.pixelLine} />}
            <View style={[itemStyle.flex, itemStyle.viewItem]}>
              {item.label && <Text style={itemStyle.paymentText}>{item.label}</Text>}
            </View>
          </View>
        </View>
        {paymentTypes.length - 1 !== index && <Divider />}
      </TouchableOpacity>
    );
  };

  renderSeparator = () => <Divider left={15} />;

  render() {
    const paymentTypes = this.preparePaymentTypes();

    return (
      <ListView
        style={[styles.flex, styles.bg, styles.listView, { backgroundColor: this.props.theme.color.bgSecondary }]}
        typeSections={false}
        items={paymentTypes}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={item => (item.id || item.label).toString()}
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
    paymentCards: (passenger || passengers.find(passenger => passenger.id === currentId)).paymentCards
  };
};

const mapDispatch = ({
  changeFields,
  updateBooking
});

export default connect(mapState, mapDispatch)(withTheme(PaymentsOptions));
