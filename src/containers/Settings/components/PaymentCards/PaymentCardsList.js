import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import { View, ScrollView, Text, TouchableOpacity, FlatList } from 'react-native';
import Swipeout from 'react-native-swipeout';

import { makeDefaultPayment, deactivatePayment } from 'actions/passenger';

import { Icon, CheckBox, Divider } from 'components';
import { throttledAction, showRemovalAlert } from 'utils';
import { strings } from 'locales';
import { getValue } from './utils';
import styles from './styles';

class PaymentCardsList extends Component {
  state = {
    selectedID: null
  };

  static propTypes = {
    navigation: PropTypes.object
  };

  goToPaymentDetails = throttledAction((item) => {
    this.props.navigation.navigate('PaymentCardDetails', { paymentCard: item });
  });

  makeDefaultPayment = (id) => {
    this.props.makeDefaultPayment(id);
  };

  onChangeSelectedID = (selectedID) => {
    this.setState({ selectedID });
  };

  keyExtractor = item => String(item.id);

  deactivateCard = (id) => {
    showRemovalAlert({
      message: strings('settings.payment.confirmDelete'),
      deleteLabel: strings('settings.payment.deactivate'),
      handler: () => this.props.deactivatePayment(id)
    });
  };

  renderItem = ({ item }) => (
    <Swipeout
      key={item.id}
      autoClose
      sensitivity={25}
      close={!(this.state.selectedID === item.id)}
      backgroundColor="#fff"
      buttonWidth={100}
      onOpen={() => this.onChangeSelectedID(item.id)}
      onClose={noop}
      scroll={noop}
      right={[
        {
          component: (
            <View style={styles.buttonView}>
              <Text style={styles.buttonText}>
                {strings('settings.payment.deactivate')}
              </Text>
            </View>
          ),
          type: 'delete',
          onPress: () => this.deactivateCard(item.id)
        }
      ]}
    >
      <View key={item.id}>
        <View style={[styles.commonContainer, styles.paymentWrapper]}>
          <CheckBox
            status={item.default}
            onPress={() => this.makeDefaultPayment(item.id)}
          />
          <TouchableOpacity
            style={styles.paymentView}
            activeOpacity={0.6}
            onPress={() => this.goToPaymentDetails(item)}
          >
            <View style={[styles.flex, styles.viewItem]}>
              <Text style={styles.paymentText}>{getValue(item.kind)}</Text>
              <Text style={styles.paymentText}>****</Text>
              <Text style={styles.paymentText}>{getValue(item.last4)}</Text>
            </View>
            <Icon style={styles.chevronIcon} name="chevron" size={16} color="#c7c7cc" />
          </TouchableOpacity>
        </View>
        <Divider />
      </View>
    </Swipeout>
  );

  renderPaymentCards = () => (
    <FlatList
      shouldItemUpdate={(props, nextProps) => (props.item !== nextProps.item)}
      data={this.props.paymentCards}
      keyExtractor={this.keyExtractor}
      renderItem={this.renderItem}
    />
  );

  renderEmptyContent = () => (
    <View style={styles.emptyPayments}>
      <Text style={[styles.emptyPaymentsLabel, styles.emptyPaymentsLabelSpace]}>You have no payment cards yet</Text>
      <Text style={styles.emptyPaymentsLabel}>{'Try to add some by pressing "plus" button'}</Text>
    </View>
  );

  render() {
    const { paymentCards } = this.props;

    return paymentCards && paymentCards.length
      ? (
        <ScrollView style={[styles.flex, styles.container]}>
          {this.renderPaymentCards()}
        </ScrollView>
      )
      : this.renderEmptyContent();
  }
}

const mapState = ({ passenger: { data } }) => ({
  paymentCards: data.paymentCards
});

const mapDispatch = {
  makeDefaultPayment,
  deactivatePayment
};

export default connect(mapState, mapDispatch)(PaymentCardsList);
