import React, { Component, Fragment } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Answers } from 'react-native-fabric';

import { cancelOrder, clearCurrentOrder, removeFields, resetBookingValues } from 'actions/booking';

import { FadeInView, GradientWrapper, OptionsModal, OrderHeader, CountdownTimer } from 'components';
import { sms } from 'api';
import { formattedColor } from 'theme';

import { strings } from 'locales';
import { showConfirmationAlert, isIphoneX, bookingFieldsToReset, minutesForward, getCurrentOrder } from 'utils';
import {
  POINTER_DISPLAY_STATUSES,
  ORDER_RECEIVED_STATUS,
  ACTIVE_DRIVER_STATUSES,
  CANCEL_ALLOWED_STATUSES,
  CUSTOMER_CARE_STATUS,
  ACTIVE_STATUS,
  ARRIVED_STATUS,
  DRIVER_ON_WAY
} from 'utils/orderStatuses';
import { onMyWayOptions, actionsOptions } from './utils';

import { FloatButton, Pointer, CancelReasonModal, OrderDetailsPanel } from './components';

import styles from './styles';

class OrderScene extends Component {
  state = {
    isVisibleOptionsModal: false,
    isVisibleCancelModal: false,
    isVisibleOnMyWayModal: false,
    isVisibleOrderDetailsPanel: false,
    arriveIn: null
  };

  componentDidMount() {
    this.registerBackListener();
    this.restoreTimer();
  }

  componentWillUnmount() {
    this.backListener.remove();

    BackHandler.removeEventListener('hardwareBack');
  }

  restoreTimer = () => {
    const { order } = this.props;
    getCurrentOrder(order.id)
      .then((data) => {
        if (data) this.handleArriveIn(moment(data));
      });
  };

  registerBackListener = () => {
    this.backListener = BackHandler.addEventListener('hardwareBack', () => {
      const { booking: { bookingForm } } = this.props;

      this.handleBackBtnPress();

      if (bookingForm.destinationAddress) {
        this.goBack();
        return true;
      }

      return false;
    });
  };

  goBack = () => {
    this.props.navigation.dispatch({
      type: 'Navigation/BACK'
    });
  };

  goToInitialization = () => {
    const { removeFields, resetBookingValues, clearCurrentOrder, getCurrentPosition } = this.props;

    removeFields(bookingFieldsToReset);
    resetBookingValues();

    clearCurrentOrder();

    getCurrentPosition();
  };

  createNewOrder = () => {
    Answers.logCustom('user clicks create new order');

    this.goToInitialization();
  };

  handleBackBtnPress = () => {
    const { fromOrderList, returnToOrdersList } = this.props;
    const { isVisibleOrderDetailsPanel } = this.state;

    if (isVisibleOrderDetailsPanel) {
      this.handleClose('OrderDetailsPanel');
    } else if (fromOrderList) {
      returnToOrdersList();
    } else {
      this.goToInitialization();
    }
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
      .then(() => this.handleOpen('CancelModal'));
  };

  handleOpen = type =>
    this.setState({ [`isVisible${type}`]: true });

  handleClose = type =>
    this.setState({ [`isVisible${type}`]: false });

  showPanel = () => {
    Answers.logCustom('user opens order details');

    this.handleOpen('OrderDetailsPanel');
  };

  handleOnMyWay = () => {
    const { arriveIn } = this.state;

    if (!arriveIn) this.handleOpen('OnMyWayModal');
  };

  handleArriveIn = (arriveIn = null) => {
    this.setState({ arriveIn });
  };

  handleNotifyDriver = (arriveIn) => {
    const { order } = this.props;

    sms.notifyDriver(order.id, arriveIn)
      .then(() => this.handleArriveIn(minutesForward(arriveIn)));
    this.handleClose('OnMyWayModal');
  };

  renderHeader = () => (
    <OrderHeader
      status={this.props.status}
      handlePressBack={this.handleBackBtnPress}
      handlePressCreateNew={this.createNewOrder}
    />
  );

  renderFloatButton = ({ iconName, label, handler = () => {}, busy, ...rest }) => (
    <FloatButton
      key={iconName}
      label={strings(`order.button.${label}`)}
      iconName={iconName}
      loading={busy}
      onPress={handler}
      style={styles.floatButton}
      labelStyle={this.props.nightMode ? styles.whiteText : {}}
      {...rest}
    />
  );

  renderInfoPanel = () => {
    const { status, busy, nightMode, order } = this.props;
    const { arriveIn } = this.state;

    const isCancelAllowedStatus = CANCEL_ALLOWED_STATUSES.includes(status);
    const isActiveDriverStatus = ACTIVE_DRIVER_STATUSES.includes(status);
    const isDriverOnWay = status === DRIVER_ON_WAY;
    const isCustomerCareStatus = status === CUSTOMER_CARE_STATUS;
    const isTripActive = status === ACTIVE_STATUS;
    const isDriverArrived = status === ARRIVED_STATUS;
    const white = formattedColor.white;
    // TODO: move to separate colors file
    const gradientColors = [white.opacity(0.8), white.opacity(0.75), white.opacity(0.6), white.opacity(0)];
    const gradientStart = { x: 0, y: 1 };
    const gradientEnd = { x: 0, y: 0 };

    const statusPosition = isIphoneX() ? 140 : 130;

    const Wrapper = nightMode ? View : GradientWrapper;

    return (
      <FadeInView>
        <Wrapper
          style={styles.footer}
          {...(nightMode ? {} : { colors: gradientColors, start: gradientStart, end: gradientEnd })}
          pointerEvents="box-none"
        >
          <View
            style={[styles.actionContainer, { paddingBottom: this.isDriverExist ? statusPosition : 70 }]}
            pointerEvents="box-none"
          >
            <View style={styles.actionsRow}>
              {(isDriverOnWay || isTripActive) &&
                this.renderFloatButton({
                  iconName: 'myLocation',
                  label: 'myLocation',
                  handler: this.handleMyLocation
                })
              }
              {(isCancelAllowedStatus || isActiveDriverStatus || isCustomerCareStatus) &&
                this.renderFloatButton({
                  iconName: 'cancel',
                  label: 'cancelOrder',
                  handler: this.handleCancelOrder,
                  busy
                })
              }

              {isTripActive &&
                this.renderFloatButton({
                  iconName: 'dots',
                  label: 'dots',
                  handler: () => this.handleOpen('OptionsModal')
                })
              }

              {isDriverArrived &&
                this.renderFloatButton({
                  content: arriveIn && (
                    <CountdownTimer
                      orderId={order.id}
                      onCountdownComplete={this.handleArriveIn}
                      endTime={arriveIn}
                    />
                  ),
                  iconName: 'walker',
                  label: 'walker',
                  handler: this.handleOnMyWay
                })
              }
            </View>

            <Text style={[styles.header, nightMode ? styles.whiteText : {}]}>
              {strings(`order.status.${status}`)}
            </Text>
          </View>
        </Wrapper>
      </FadeInView>
    );
  };

  renderModals = () => {
    const { order, customerServicePhone } = this.props;
    const { isVisibleCancelModal, isVisibleOnMyWayModal, isVisibleOptionsModal } = this.state;

    return (
      <Fragment>
        <OptionsModal
          isVisible={isVisibleOnMyWayModal}
          options={onMyWayOptions({ notifyDriver: this.handleNotifyDriver })}
          onClose={() => this.handleClose('OnMyWayModal')}
          closeLabel={strings('modal.label.cancel')}
        />
        <CancelReasonModal
          isVisible={isVisibleCancelModal}
          onClose={() => this.handleClose('CancelModal')}
          reasons={order.cancellationReasons}
        />

        <OptionsModal
          isVisible={isVisibleOptionsModal}
          options={actionsOptions({ customerServicePhone })}
          onClose={() => this.handleClose('OptionsModal')}
        />
      </Fragment>
    );
  };

  render() {
    const { status, order, navigation } = this.props;
    const { isVisibleOrderDetailsPanel } = this.state;

    const shouldShowPointer = POINTER_DISPLAY_STATUSES.includes(status) ||
      (order.status === ORDER_RECEIVED_STATUS && order.asap);

    return (
      <Fragment>
        {this.renderHeader()}

        <View style={styles.container} pointerEvents={shouldShowPointer ? 'auto' : 'box-none'}>
          <View style={styles.separator} />

          {this.renderInfoPanel()}

          {shouldShowPointer && <Pointer />}

          {this.renderModals()}
        </View>

        <OrderDetailsPanel
          navigation={navigation}
          onClose={() => this.handleClose('OrderDetailsPanel')}
          onActivate={this.showPanel}
          visible={isVisibleOrderDetailsPanel}
        />
      </Fragment>
    );
  }
}

OrderScene.propTypes = {
  cancelOrder: PropTypes.func.isRequired,
  busy: PropTypes.bool
};

OrderScene.defaultProps = {};

const mapState = ({ booking, passenger }) => ({
  status: booking.currentOrder.indicatedStatus || 'connected',
  order: booking.currentOrder,
  busy: booking.currentOrder.busy,
  customerServicePhone: passenger.companySettings.customerServicePhone
});

const mapDispatch = {
  cancelOrder,
  clearCurrentOrder,
  removeFields,
  resetBookingValues
};

export default connect(mapState, mapDispatch, null, { withRef: true })(OrderScene);
