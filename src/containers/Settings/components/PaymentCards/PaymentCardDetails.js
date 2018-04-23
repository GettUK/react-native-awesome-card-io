import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';

import { deactivatePayment } from 'actions/passenger';

import { strings } from 'locales';
import { showRemovalAlert, throttledAction } from 'utils';

import { prepareCardDeails, getValue } from './utils';
import SettingsListItem from '../../SettingsListItem';
import styles from './styles';

class PaymentCardDetails extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    deactivatePayment: PropTypes.func
  };

  deactivateCard = (id) => {
    showRemovalAlert({
      message: strings('settings.payment.confirmDelete'),
      handler: () => this.props.deactivatePayment(id).then(this.goBack)
    });
  };

  goBack = throttledAction(() => this.props.navigation.goBack(null));

  renderItem = ({ label, text }, index) => (
    <View key={index} style={[styles.commonContainer, styles.paymentWrapper]}>
      <View style={styles.paymentView}>
        <View style={[styles.flex, styles.viewItemDetails]}>
          { label && <Text style={styles.paymentCardLabel}>{getValue(label)}</Text> }
          { text && <Text style={styles.paymentCardText}>{getValue(text)}</Text> }
        </View>
      </View>
    </View>
  );

  render() {
    const { paymentCard } = this.props.navigation.state.params;

    return (
      <ScrollView style={[styles.flex, styles.containerCardDetails]}>
        <View style={styles.block}>
          {prepareCardDeails(paymentCard).map(this.renderItem)}
        </View>
        <View style={styles.btnContainer}>
          <SettingsListItem
            title={strings('settings.payment.cardDelete')}
            onPress={() => this.deactivateCard(paymentCard.id)}
            showRightIcon={false}
            titleStyle={styles.btnDelete}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapDispatch = {
  deactivatePayment
};

export default connect(null, mapDispatch)(PaymentCardDetails);
