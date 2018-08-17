import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { deactivatePayment } from 'actions/passenger';
import { Divider } from 'components';

import { strings } from 'locales';

import { withTheme } from 'providers';

import { showRemovalAlert, throttledAction } from 'utils';

import { prepareCardDetails, getValue } from './utils';
import styles from './styles';

class PaymentCardDetails extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    deactivatePayment: PropTypes.func
  };

  deactivateCard = () => {
    const { deactivatePayment, navigation, theme } = this.props;
    const { paymentCard: { id }, canDelete } = navigation.state.params;

    if (!canDelete) {
      return;
    }

    showRemovalAlert({
      theme,
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
            {text &&
              <Text style={[styles.paymentCardText, { color: this.props.theme.color.primaryText }]}>
                {getValue(text)}
              </Text>
            }
          </View>
        </View>
      </View>
      {index + 1 < arr.length && <Divider />}
    </View>
  );

  render() {
    const { navigation, theme } = this.props;
    const { paymentCard, canDelete } = navigation.state.params;
    const textStyle = canDelete ? styles.deactivateBtnLabel : styles.deactivateBtnLabelDisabled;
    const activeOpacity = canDelete ? 0.6 : 1;

    return (
      <ScrollView style={[styles.flex, { backgroundColor: theme.color.bgSecondary }]}>
        <View style={[styles.block, { backgroundColor: theme.color.bgPrimary }]}>
          {prepareCardDetails(paymentCard).map(this.renderItem)}
        </View>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={this.deactivateCard}
          style={[styles.deactivateBtn, { backgroundColor: theme.color.bgPrimary }]}
        >
          <Text style={textStyle}>{strings('paymentCard.button.deactivate')}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapDispatch = {
  deactivatePayment
};

export default connect(null, mapDispatch)(withTheme(PaymentCardDetails));
