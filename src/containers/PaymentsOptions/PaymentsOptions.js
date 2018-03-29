import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'components';
import { changeFields } from 'actions/ui/map';

import {
  paymentTypeLabels,
  preparePaymentType,
  preparePaymentLabel,
  paymentTypeToAttrs
} from 'containers/shared/bookings/data';

import styles from './styles';

class ReasonForTravel extends Component {
  renderItem = ({ item }) => {
    const { paymentMethod, changeFields, paymentCards: cards } = this.props;

    const isSelected = item === paymentMethod;

    const label = preparePaymentLabel({ payment: item, cards });

    const paymentType = preparePaymentType({ payment: item, cards });

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.item}
        onPress={() => changeFields(paymentTypeToAttrs(paymentType))}
        key={item}
      >
        <Text style={[styles.flex, styles.reasonName, isSelected ? styles.reasonNameSelected : {}]}>
          {label}
        </Text>

        {isSelected &&
          <Icon name="check" size={13} color="#007aff" />
        }
      </TouchableOpacity>
    );
  };

  renderSeparator = () => <View style={styles.separator}/>;

  render() {
    const { companyPaymentTypes } = this.props;

    return (
      <FlatList
        style={[styles.flex, styles.bg]}
        data={companyPaymentTypes}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={this.renderItem}
      />
    );
  }
}

const mapState = ({ passenger, ui }) => ({
  companyPaymentTypes: passenger.data.companyPaymentTypes,
  paymentCards: passenger.data.paymentCards,
  paymentMethod: ui.map.fields.paymentMethod || ''
});

const mapDispatch = ({
  changeFields
});

export default connect(mapState, mapDispatch)(ReasonForTravel);
