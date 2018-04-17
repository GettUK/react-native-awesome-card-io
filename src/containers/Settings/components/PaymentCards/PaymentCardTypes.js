import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { capitalize } from 'lodash';
import { View, ScrollView, Text, TouchableOpacity, FlatList } from 'react-native';

import { changePaymentFields } from 'actions/passenger';

import { Icon } from 'components';
import { getValue, cardTypes } from './utils';
import styles from './styles';

class PaymentCardTypes extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  keyExtractor = item => String(item.id);

  changePaymentCardType = (name) => {
    this.props.changePaymentFields({
      kind: name,
      personal: (name === 'personal')
    });
  };

  renderItem = ({ item }) => {
    const { paymentCard } = this.props;
    const isActive = paymentCard.kind === item.name;
    return (
      <View
        key={item.id}
        style={[styles.commonContainer, styles.paymentWrapper]}
      >
        <TouchableOpacity
          style={styles.paymentView}
          activeOpacity={0.6}
          onPress={() => this.changePaymentCardType(item.name)}
        >
          <View style={[styles.flex, styles.viewItem]}>
            <Text style={[styles.paymentCardText, styles.bold]}>{getValue(capitalize(item.name))}</Text>
          </View>
          {isActive && <Icon style={styles.checkIcon} name="check" width={12} height={9} color="#007AFF" />
          }
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={[styles.flex, styles.container]}>
        <FlatList
          shouldItemUpdate={(props, nextProps) => (props.item !== nextProps.item)}
          data={cardTypes}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </ScrollView>
    );
  }
}

const mapState = ({ passenger }) => ({
  paymentCard: passenger.newPaymentData
});

const mapDispatch = {
  changePaymentFields
};

export default connect(mapState, mapDispatch)(PaymentCardTypes);
