import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import { View, ScrollView, Text, TouchableOpacity, FlatList } from 'react-native';
import { color } from 'theme';
import Swipeout from 'react-native-swipeout';

import { makeDefaultPayment, deactivatePayment } from 'actions/passenger';

import { Icon, CheckBox, Divider } from 'components';

import { withTheme } from 'providers';

import { throttledAction, showRemovalAlert } from 'utils';
import { strings } from 'locales';
import { getValue } from './utils';
import settingsStyles from '../../style';

import Tip from '../Tip';

import styles from './styles';

class PaymentCardsList extends Component {
  state = {
    selectedID: null
  };

  static propTypes = {
    navigation: PropTypes.object
  };

  goToPaymentDetails = throttledAction((item) => {
    this.changeSelectedID();
    this.props.navigation.navigate('PaymentCardDetails', {
      paymentCard: item,
      canDelete: this.isCardDeactivationEnabled(),
      theme: this.props.theme
    });
  });

  isCardDeactivationEnabled = () => (this.props.paymentCards.length > 1);

  makeDefaultPayment = (id) => {
    this.props.makeDefaultPayment(id);
  };

  changeSelectedID = (selectedID) => {
    this.setState({ selectedID });
  };

  keyExtractor = item => String(item.id);

  deactivateCard = (id) => {
    showRemovalAlert({
      theme: this.props.theme,
      message: strings('alert.message.doYouWantToDeactivateTheCard'),
      deleteLabel: strings('alert.button.deactivate'),
      handler: () => this.props.deactivatePayment(id)
    });
  };

  renderDeactivateButton = item => (
    [
      {
        component: (
          <View style={[settingsStyles.buttonView, { borderBottomColor: this.props.theme.color.pixelLine }]}>
            <Text style={settingsStyles.buttonText}>
              {strings('paymentCard.button.deactivate')}
            </Text>
          </View>
        ),
        type: 'delete',
        onPress: () => this.deactivateCard(item.id)
      }
    ]
  )

  renderItem = ({ item }) => (
    <Swipeout
      key={item.id}
      autoClose
      sensitivity={25}
      close={!(this.state.selectedID === item.id)}
      backgroundColor={this.props.theme.color.bgPrimary}
      buttonWidth={100}
      onOpen={() => this.changeSelectedID(item.id)}
      onClose={noop}
      scroll={noop}
      right={this.isCardDeactivationEnabled() ? this.renderDeactivateButton(item) : null}
    >
      <View key={item.id}>
        <View style={[styles.commonContainer, styles.paymentWrapper]}>
          <View style={styles.checkboxWrapper}>
            <CheckBox
              status={item.default}
              onPress={() => this.makeDefaultPayment(item.id)}
            />
          </View>
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
            <Icon style={styles.chevronIcon} name="chevron" size={16} color={color.arrowRight} />
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
    const { paymentCards, theme } = this.props;

    return paymentCards && paymentCards.length
      ? (
        <ScrollView style={[styles.flex, styles.container, { backgroundColor: theme.color.bgPrimary }]}>
          {this.renderPaymentCards()}

          {this.isCardDeactivationEnabled() && <Tip label={strings('tip.text.removeCard')} />}
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

export default connect(mapState, mapDispatch)(withTheme(PaymentCardsList));
