import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { cancelOrder } from 'actions/booking';

import { FadeInView, GradientWrapper } from 'components';

import { strings } from 'locales';
import { showConfirmationAlert, isIphoneX } from 'utils';
import {
  POINTER_DISPLAY_STATUSES,
  ORDER_RECEIVED_STATUS,
  ACTIVE_DRIVER_STATUSES,
  CANCEL_ALLOWED_STATUSES,
  CUSTOMER_CARE_STATUS,
  ACTIVE_STATUS
} from 'utils/orderStatuses';

import FloatButton from './ActiveOrderScene/FloatButton';
import Pointer from './ActiveOrderScene/Pointer';
import OnMyWayModal from './ActiveOrderScene/OnMyWayModal';
import CancelReasonModal from './ActiveOrderScene/CancelReasonModal';

import { screenStyles } from './ActiveOrderScene/styles';


class ActiveOrderScene extends Component {
  state = {
    isVisible: false,
    cancelModalVisible: false
  };

  get isDriverExist() {
    const { order: { driverDetails } } = this.props;
    return driverDetails && driverDetails.info && !!driverDetails.info.name;
  }

  handleMyLocation = () => {
    const { status, order, resizeMapToDriverAndTargetAddress } = this.props;
    const isTripActive = status === ACTIVE_STATUS;

    resizeMapToDriverAndTargetAddress(isTripActive ? 'destination' : 'pickup', order);
  };

  handleCancelOrder = () => {
    showConfirmationAlert({
      title: strings('alert.title.doYouWantToCancelOrder'),
      message: strings('alert.message.cancelOrderDescription'),
      handler: this.cancelOrder
    });
  };

  cancelOrder = () => {
    this.props.cancelOrder()
      .then(() => this.setState({ cancelModalVisible: true }));
  };

  handleOpenModal = () => {
    this.setState({ isVisible: true });
  };

  handleCloseModal = () => {
    this.setState({ isVisible: false });
  };

  handleCloseCancelModal = () => {
    this.setState({ cancelModalVisible: false });
  };


  renderInfoPanel = () => {
    const { status, busy, nightMode } = this.props;

    const isCancelAllowedStatus = CANCEL_ALLOWED_STATUSES.includes(status);
    const isActiveDriverStatus = ACTIVE_DRIVER_STATUSES.includes(status);
    const isCustomerCareStatus = status === CUSTOMER_CARE_STATUS;
    const isTripActive = status === ACTIVE_STATUS;
    // const isDriverArrived = status === ARRIVED_STATUS;

    const gradientColors = [
      'rgba(255,255,255,0.8)', 'rgba(255,255,255,0.75)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0)'
    ]; // TODO: move to separate colors file
    const gradientStart = { x: 0, y: 1 };
    const gradientEnd = { x: 0, y: 0 };

    const statusPosition = isIphoneX() ? 140 : 130;

    const Wrapper = nightMode ? View : GradientWrapper;

    return (
      <FadeInView>
        <Wrapper
          style={screenStyles.footer}
          {...(nightMode ? {} : { colors: gradientColors, start: gradientStart, end: gradientEnd })}
          pointerEvents="box-none"
        >
          <View
            style={[screenStyles.actionContainer, { paddingBottom: this.isDriverExist ? statusPosition : 70 }]}
            pointerEvents="box-none"
          >
            <View style={screenStyles.actionsRow}>
              {(isActiveDriverStatus || isTripActive) &&
                <FloatButton
                  key="myLocation"
                  label={strings('order.button.myLocation')}
                  iconName="myLocation"
                  onPress={this.handleMyLocation}
                  style={screenStyles.floatButton}
                  labelStyle={nightMode ? screenStyles.whiteText : {}}
                />
              }
              {(isCancelAllowedStatus || isActiveDriverStatus || isCustomerCareStatus) &&
                <FloatButton
                  key="cancel"
                  label={strings('order.button.cancelOrder')}
                  iconName="cancel"
                  loading={busy}
                  onPress={this.handleCancelOrder}
                  style={screenStyles.floatButton}
                  labelStyle={nightMode ? screenStyles.whiteText : {}}
                />
              }

              {/* isDriverArrived &&
                <FloatButton
                  key="way"
                  label={'I\'m on my way'}
                  iconName="walker"
                  onPress={this.handleOpenModal}
                  style={{ marginLeft: 40 }}
                />

                isTripActive && <FloatButton key="actions" label="Actions" iconName="dots" />
              */}
            </View>

            <Text style={[screenStyles.header, nightMode ? screenStyles.whiteText : {}]}>
              {strings(`order.status.${status}`)}
            </Text>
          </View>
        </Wrapper>
      </FadeInView>
    );
  };

  render() {
    const { status, order } = this.props;
    const { cancelModalVisible, isVisible } = this.state;

    const shouldShowPointer = POINTER_DISPLAY_STATUSES.includes(status) ||
      (order.status === ORDER_RECEIVED_STATUS && order.asap);

    return (
      <View
        style={screenStyles.container}
        pointerEvents={shouldShowPointer ? 'auto' : 'box-none'}
      >
        <View style={screenStyles.separator} />

        {this.renderInfoPanel()}

        {shouldShowPointer && <Pointer />}

        <OnMyWayModal isVisible={isVisible} onClose={this.handleCloseModal} />
        <CancelReasonModal
          isVisible={cancelModalVisible}
          onClose={this.handleCloseCancelModal}
          reasons={order.cancellationReasons}
        />
      </View>
    );
  }
}

ActiveOrderScene.propTypes = {
  cancelOrder: PropTypes.func.isRequired,
  busy: PropTypes.bool
};

ActiveOrderScene.defaultProps = {};

const mapState = ({ booking }) => ({
  status: booking.currentOrder.indicatedStatus || 'connected',
  order: booking.currentOrder,
  busy: booking.currentOrder.busy
});

const mapDispatch = {
  cancelOrder
};

export default connect(mapState, mapDispatch)(ActiveOrderScene);
