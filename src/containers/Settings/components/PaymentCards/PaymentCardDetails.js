import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { deactivatePayment } from 'actions/passenger';
import { Divider } from 'components';

import { strings } from 'locales';
import { showRemovalAlert, throttledAction } from 'utils';

import { prepareCardDeails, getValue } from './utils';
import styles from './styles';

class PaymentCardDetails extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    deactivatePayment: PropTypes.func
  };

  deactivateCard = () => {
    const { deactivatePayment, navigation } = this.props;
    const id = navigation.state.params.paymentCard.id;

    showRemovalAlert({
      message: strings('alert.message.doYouWantToDeactivateTheCard'),
      deleteLabel: strings('alert.button.deactivate'),
      handler: () => deactivatePayment(id).then(this.goBack)
    });
  };

  goBack = throttledAction(() => this.props.navigation.goBack(null));

  renderItem = ({ label, text }, index, arr) => (
    <View key={index}>
      <View style={[styles.commonContainer, styles.paymentWrapper]}>
        <View style={styles.paymentView}>
          <View style={[styles.flex, styles.viewItemDetails]}>
            {label && <Text style={styles.paymentCardLabel}>{getValue(label)}</Text>}
            {text && <Text style={styles.paymentCardText}>{getValue(text)}</Text>}
          </View>
        </View>
      </View>
      {index + 1 < arr.length && <Divider />}
    </View>
  );

  render() {
    const { paymentCard } = this.props.navigation.state.params;

    return (
      <ScrollView style={styles.flex}>
        <View style={styles.block}>
          {prepareCardDeails(paymentCard).map(this.renderItem)}
        </View>
        <TouchableOpacity activeOpacity={0.6} onPress={this.deactivateCard} style={styles.deactivateBtn}>
          <Text style={styles.deactivateBtnLabel}>{strings('paymentCard.button.deactivate')}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapDispatch = {
  deactivatePayment
};

export default connect(null, mapDispatch)(PaymentCardDetails);
