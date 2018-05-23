import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { cancelOrder } from 'actions/booking';

import { FadeInView, GradientWrapper, Button } from 'components';

import { strings } from 'locales';
import { showConfirmationAlert } from 'utils';
import { ACTIVE_DRIVER_STATUSES, PREORDER_STATUSES, CUSTOMER_CARE_STATUS, FINAL_STATUSES } from 'utils/orderStatuses';

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

  render() {
    const { status, busy, goToInitialization, order } = this.props;
    const { cancelModalVisible, isVisible } = this.state;

    // const isTripActive = status === ACTIVE_STATUS;
    // const isDriverArrived = status === ARRIVED_STATUS;
    const isPreOrderStatus = PREORDER_STATUSES.includes(status);
    const isActiveDriverStatus = ACTIVE_DRIVER_STATUSES.includes(status);
    const isCustomerCareStatus = status === CUSTOMER_CARE_STATUS;
    const isFinalStatus = FINAL_STATUSES.includes(status);

    const gradientColors = [
      'rgba(255,255,255,0.8)', 'rgba(255,255,255,0.75)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0)'
    ]; // TODO: move to separate colors file
    const gradientStart = { x: 0, y: 1 };
    const gradientEnd = { x: 0, y: 0 };

    return (
      <View style={screenStyles.container} pointerEvents={isPreOrderStatus ? 'auto' : 'box-none'}>
        {isFinalStatus && !isCustomerCareStatus &&
          <Button
            size="sm"
            style={screenStyles.createBtnWrapper}
            styleContent={screenStyles.createNewBtn}
            onPress={goToInitialization}
          >
            <Text style={screenStyles.createNewText}>{strings('order.createNew')}</Text>
          </Button>
        }
        <View style={screenStyles.separator} />

        <FadeInView>
          <GradientWrapper
            style={screenStyles.footer}
            colors={gradientColors}
            start={gradientStart}
            end={gradientEnd}
            pointerEvents="box-none"
          >
            <View
              style={[screenStyles.actionContainer, { paddingBottom: this.isDriverExist ? 130 : 70 }]}
              pointerEvents="box-none"
            >
              <View style={screenStyles.actionsRow}>
                {(isPreOrderStatus || isActiveDriverStatus || isCustomerCareStatus) &&
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

        {isPreOrderStatus && <Pointer />}

        <OnMyWayModal isVisible={isVisible} onClose={this.handleCloseModal} />
        <CancelReasonModal
          isVisible={cancelModalVisible}
          onClose={this.handleCloseCancelModal}
          reasons={order.bookingCancellationReasons}
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
  status: booking.currentOrder.status || 'connected',
  order: booking.currentOrder,
  busy: booking.currentOrder.busy
});

const mapDispatch = {
  cancelOrder
};

export default connect(mapState, mapDispatch)(ActiveOrderScene);
