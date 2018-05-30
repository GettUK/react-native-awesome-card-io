import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

import { GradientWrapper, Icon } from 'components';
import { strings } from 'locales';

import { sendCancelOrderReason } from 'actions/booking';

import { cancelReasonStyles } from './styles';

const reasonIconMapping = {
  mistaken_order: 'reasonSadMan',
  driver_asked_to: 'reasonDriver',
  hailed_another_car: 'reasonTaxi',
  too_long_eta: 'reasonTimer'
};

const CancelReasonModal = ({ isVisible, onClose, reasons, sendCancelOrderReason }) => {
  const submit = (reason) => {
    sendCancelOrderReason(reason)
      .then(onClose);
  };

  const renderReason = reason => (
    <TouchableOpacity
      activeOpacity={0.8}
      key={reason}
      style={cancelReasonStyles.reason}
      onPress={() => submit(reason)}
    >
      <Icon name={reasonIconMapping[reason]} color="#284784" size={26} />
      <Text style={cancelReasonStyles.reasonTitle}>{strings(`order.cancellationReasons.${reason}`)}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal isVisible={isVisible} style={cancelReasonStyles.modal}>
      <StatusBar barStyle="light-content" />
      <GradientWrapper style={cancelReasonStyles.container}>
        <TouchableOpacity activeOpacity={0.8} onPress={onClose}>
          <Icon style={cancelReasonStyles.closeIcon} size={30} name="close" color="#fff" />
        </TouchableOpacity>
        <View style={cancelReasonStyles.content}>
          <Text style={cancelReasonStyles.header}>{strings('order.yourRideWasCancelled')}</Text>
          <Text style={cancelReasonStyles.subHeader}>{strings('order.seeYouNextTime')}</Text>

          <Text style={cancelReasonStyles.title}>{strings('order.whyDidYouCancel')}</Text>
          <ScrollView style={cancelReasonStyles.list}>
            {reasons.map(renderReason)}
          </ScrollView>
        </View>
      </GradientWrapper>
    </Modal>
  );
};

CancelReasonModal.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  reasons: PropTypes.array,
  sendCancelOrderReason: PropTypes.func
};

CancelReasonModal.defaultProps = {
  isVisible: false,
  onClose: () => {},
  reasons: []
};

export default connect(null, { sendCancelOrderReason })(CancelReasonModal);
