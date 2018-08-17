import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

import { sendCancelOrderReason } from 'actions/booking';

import { GradientWrapper, Icon } from 'components';
import { strings } from 'locales';

import { withTheme } from 'providers';

import { color } from 'theme';

import { cancelReasonStyles } from './styles';

const reasonIconMapping = {
  mistaken_order: 'reasonSadMan',
  driver_asked_to: 'reasonDriver',
  hailed_another_car: 'reasonTaxi',
  too_long_eta: 'reasonTimer'
};

const CancelReasonModal = ({ theme, isVisible, onClose, reasons, sendCancelOrderReason }) => {
  const submit = (reason) => {
    sendCancelOrderReason(reason)
      .then(onClose);
  };

  const renderReason = reason => (
    <TouchableOpacity
      activeOpacity={0.8}
      key={reason}
      style={[cancelReasonStyles.reason, { backgroundColor: theme.color.bgSecondary }]}
      onPress={() => submit(reason)}
    >
      <Icon name={reasonIconMapping[reason]} color={color.primaryBtns} size={26} />
      <Text style={[cancelReasonStyles.reasonTitle, { color: theme.color.primaryBtns }]}>
        {strings(`order.cancellationReason.${reason}`)}
      </Text>
    </TouchableOpacity>
  );

  const Wrapper = theme.type === 'dark' ? View : GradientWrapper;

  return (
    <Modal isVisible={isVisible} style={cancelReasonStyles.modal}>
      <StatusBar barStyle="light-content" />
      <Wrapper style={[cancelReasonStyles.container, { backgroundColor: theme.color.bgPrimary }]}>
        <TouchableOpacity activeOpacity={0.8} onPress={onClose}>
          <Icon style={cancelReasonStyles.closeIcon} size={30} name="close" color={color.white} />
        </TouchableOpacity>
        <View style={cancelReasonStyles.content}>
          <Text style={cancelReasonStyles.header}>{strings('order.text.yourRideWasCancelled')}</Text>
          <Text style={cancelReasonStyles.subHeader}>{strings('order.text.seeYouNextTime')}</Text>

          <Text style={cancelReasonStyles.title}>{strings('order.text.whyDidYouCancel')}</Text>
          <ScrollView style={cancelReasonStyles.list}>
            {reasons.map(renderReason)}
          </ScrollView>
        </View>
      </Wrapper>
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

export default connect(null, { sendCancelOrderReason })(withTheme(CancelReasonModal));
