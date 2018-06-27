import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { cancelOrder } from 'actions/booking';

import { FadeInView, GradientWrapper } from 'components';

import { strings } from 'locales';
import { showConfirmationAlert, isIphoneX } from 'utils';
import {
  ACTIVE_DRIVER_STATUSES,
  CANCEL_ALLOWED_STATUSES,
  PREORDER_STATUSES,
  CUSTOMER_CARE_STATUS
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

  handleCancelOrder = () => {
    showConfirmationAlert({
      title: strings('order.confirmCancel'),
      message: strings('order.confirmCancelDescription'),
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
    const { status, busy } = this.props;

    const isCancelAllowedStatus = CANCEL_ALLOWED_STATUSES.includes(status);
    const isActiveDriverStatus = ACTIVE_DRIVER_STATUSES.includes(status);
    const isCustomerCareStatus = status === CUSTOMER_CARE_STATUS;
    // const isTripActive = status === ACTIVE_STATUS;
    // const isDriverArrived = status === ARRIVED_STATUS;

    const gradientColors = [
      'rgba(255,255,255,0.8)', 'rgba(255,255,255,0.75)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0)'
    ]; // TODO: move to separate colors file
    const gradientStart = { x: 0, y: 1 };
    const gradientEnd = { x: 0, y: 0 };

    const statusPosition = isIphoneX() ? 140 : 130;

    return (
      <FadeInView>
        <GradientWrapper
          style={screenStyles.footer}
          colors={gradientColors}
          start={gradientStart}
          end={gradientEnd}
          pointerEvents="box-none"
        >
          <View
            style={[screenStyles.actionContainer, { paddingBottom: this.isDriverExist ? statusPosition : 70 }]}
            pointerEvents="box-none"
          >
            <View style={screenStyles.actionsRow}>
              {(isCancelAllowedStatus || isActiveDriverStatus || isCustomerCareStatus) &&
                <FloatButton
                  key="cancel"
                  label="Cancel Order"
                  iconName="cancel"
                  loading={busy}
                  onPress={this.handleCancelOrder}
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

            <Text style={screenStyles.header}>{strings(`order.statuses.${status}`)}</Text>
          </View>
        </GradientWrapper>
      </FadeInView>
    );
  }

  render() {
    const { status, order } = this.props;
    const { cancelModalVisible, isVisible } = this.state;

    const isPreOrderStatus = PREORDER_STATUSES.includes(status);

    return (
      <View style={screenStyles.container} pointerEvents={isPreOrderStatus ? 'auto' : 'box-none'}>
        <View style={screenStyles.separator} />

        {this.renderInfoPanel()}

        {isPreOrderStatus && <Pointer />}

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
