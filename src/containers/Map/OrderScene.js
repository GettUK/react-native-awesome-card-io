import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { cancelOrder } from 'actions/booking';

import { FadeInView, Button } from 'components';

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

    return (
      <View style={screenStyles.container} pointerEvents={isPreOrderStatus ? 'auto' : 'box-none'}>
        <FadeInView reverse>
          <View style={screenStyles.headerContainer}>
            <Text style={screenStyles.header}>{strings(`order.statuses.${status}`)}</Text>
            {isFinalStatus && !isCustomerCareStatus &&
              <Button size="sm" styleContent={screenStyles.createNewBtn} onPress={goToInitialization}>
                <Text style={screenStyles.createNewText}>{strings('order.createNew')}</Text>
              </Button>
            }
          </View>
        </FadeInView>

        <View style={screenStyles.separator} />

        <FadeInView>
          <View style={{ paddingBottom: this.isDriverExist ? 150 : 90 }}>
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
          </View>
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
