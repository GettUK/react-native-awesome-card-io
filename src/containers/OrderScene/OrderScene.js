import React, { PureComponent, Fragment } from 'react';
import { View, Text, BackHandler, Linking } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Answers } from 'react-native-fabric';

import {
  cancelOrder,
  clearCurrentOrder,
  removeFields,
  resetBookingValues,
  changeAddress,
  setActiveBooking,
  changeReference,
  restoreCurrentOrder,
  getFormData
} from 'actions/booking';

import { address, flights, sms } from 'api';
import {
  FadeInView,
  GradientWrapper,
  OptionsModal,
  OrderHeader,
  CountdownTimer,
  FutureOrderSuggestionPopup,
  SuccessPopup
} from 'components';

import { strings } from 'locales';
import {
  showConfirmationAlert,
  isIphoneX,
  bookingFieldsToReset,
  minutesForward,
  getCurrentOrder
} from 'utils';

import { withTheme } from 'providers';

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
import { onMyWayOptions, actionsOptions, shouldCallDispatcher } from './utils';

import { FloatButton, Pointer, CancelReasonModal, OrderDetailsPanel } from './components';

import styles from './styles';

class OrderScene extends PureComponent {
  state = {
    isVisibleOptionsModal: false,
    isVisibleCancelModal: false,
    isVisibleOnMyWayModal: false,
    isVisibleOrderDetailsPanel: false,
    arriveIn: null
  };

  componentDidMount() {
    const { currentOrder } = this.props;

    if (currentOrder.flight && currentOrder.destinationAddress.airport && currentOrder.status === 'creating') {
      this.setOrderState(currentOrder.flight);
    } else {
      this.setOrderState();
    }

    this.registerBackListener();
    this.restoreTimer();
  }

  componentDidUpdate({ futureOrderId: futureOrderIdProps }) {
    const { futureOrderId } = this.props;

    if (futureOrderId && !futureOrderIdProps) {
      this.successPopup.open();
    }
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
      const { bookingForm, navigation } = this.props;

      this.handleBackBtnPress();

      if (bookingForm.destinationAddress) {
        navigation.dispatch({ type: 'Navigation/BACK' });
        return true;
      }

      return false;
    });
  };

  setOrderState = (flight) => {
    const { booking } = this.props;

    if (flight) {
      flights.getFlights(flight)
        .then(({ data }) => {
          this.setState({ flightData: data[0] }, this.futureOrderPopup.open);
        })
        .then(() => {
          this.setState({ booking });
        });
    } else {
      this.setState({ booking });
    }
  };

  resetBookingForm = () => {
    const { removeFields, resetBookingValues } = this.props;

    removeFields(bookingFieldsToReset);
    resetBookingValues();
  };

  prepareFutureOrderForm = async (extraData) => {
    const editorParamsModifier = {};
    let queryString;
    if (this.state.flightData && this.state.flightData.arrival) {
      const { name, terminal } = this.state.flightData.arrival;
      queryString = name;
      if (terminal) {
        queryString += ` Terminal ${terminal}`;
      }

      editorParamsModifier.futureFlightOrder = true;
    } else if (extraData.pickupAddress) {
      queryString = extraData.pickupAddress.line;

      editorParamsModifier.shouldRequestVehicles = true;
    } else {
      throw new Error('queryString is not defined');
    }

    const addresses = [];
    addresses.push({
      addressToUpdate: extraData.pickupAddress ? extraData.pickupAddress : await address.getAddress(queryString),
      type: 'pickupAddress'
    });
    if (extraData.destinationAddress) {
      addresses.push({ addressToUpdate: extraData.destinationAddress, type: 'destinationAddress' });
    }
    if (extraData.stops) {
      extraData.stops.forEach((addressToUpdate) => {
        addresses.push({ addressToUpdate, type: 'stops' });
      });
    }

    return {
      addresses,
      editorParamsModifier
    };
  }

  updateBookingForm = (list, references = []) => {
    // execute change address sequently
    let sequence = Promise.resolve();
    list.map(async ({ addressToUpdate, type }) => {
      sequence = sequence.then(async () => {
        const finalAddress = await address.getAddressWithLocation(addressToUpdate.line);
        this.props.changeAddress(finalAddress, { type });
      });
    });

    references.forEach((reference) => {
      const ref = this.props.formData.bookingReferences.find(item => item.name === reference.bookingReferenceName);
      this.props.changeReference({ ...ref, value: reference.value });
    });
  };

  goToInitialization = () => {
    const { clearCurrentOrder, getCurrentPosition } = this.props;

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
      theme: this.props.theme,
      title: strings('alert.title.doYouWantToCancelOrder'),
      message: strings('alert.message.cancelOrderDescription'),
      handler: () => this.props.cancelOrder().then(() => this.handleOpen('CancelModal'))
    });
  };

  restoreFutureOrder = () => {
    const { booking } = this.state;
    const { restoreCurrentOrder } = this.props;

    restoreCurrentOrder({ booking });
  };

  handleCreateFutureOrder = () => {
    this.handleCreateOrder({ beforeCallback: this.futureOrderPopup.close, onCloseEditor: this.restoreFutureOrder });
  };

  handleRepeatReturnOrder = ({ isReturn = false }) => {
    const { pickupAddress, destinationAddress, stopAddresses, references } = this.state.booking.currentOrder;

    let extraData;
    if (isReturn) {
      extraData = {
        pickupAddress: destinationAddress,
        destinationAddress: pickupAddress,
        stops: stopAddresses ? stopAddresses.reverse() : [],
        references
      };
    } else {
      extraData = {
        pickupAddress,
        destinationAddress,
        stops: stopAddresses || [],
        references
      };
    }

    this.handleCreateOrder({ onCloseEditor: this.restoreFutureOrder, extraData });
  };

  handleCreateOrder = async ({ beforeCallback, onCloseEditor = () => {}, extraData }) => {
    this.resetBookingForm();
    await this.props.getFormData(true);

    const editorParams = {
      theme: this.props.theme,
      restoreFutureOrder: onCloseEditor
    };

    if (beforeCallback) {
      beforeCallback();
    }

    const { addresses, editorParamsModifier } = await this.prepareFutureOrderForm(extraData);
    this.updateBookingForm(addresses, extraData.references);

    this.props.navigation.navigate('EditOrderDetails', { ...editorParams, ...editorParamsModifier });
  };

  handleCallFleet = () => {
    Linking.openURL(`tel:${this.props.order.vendorPhone}`);
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

  addressrenderHeader = () => (
    <OrderHeader
      status={this.props.status}
      handlePressBack={this.handleBackBtnPress}
      handlePressCreateNew={this.createNewOrder}
    />
  );

  handleActivateFutureOrder = () => {
    const { futureOrderId, setActiveBooking } = this.props;

    this.successPopup.close();

    setActiveBooking(futureOrderId);
  }

  renderFloatButton = ({ iconName, label, handler = () => {}, busy, ...rest }) => (
    <FloatButton
      key={iconName}
      label={strings(`order.button.${label}`)}
      iconName={iconName}
      loading={busy}
      onPress={handler}
      style={styles.floatButton}
      labelStyle={this.props.theme.type === 'dark' ? styles.whiteText : {}}
      {...rest}
    />
  );

  renderInfoPanel = () => {
    const { order, status, busy, theme } = this.props;
    const { arriveIn } = this.state;

    const nightMode = theme.type === 'dark';

    const isCancelAllowedStatus = CANCEL_ALLOWED_STATUSES.includes(status);
    const isActiveDriverStatus = ACTIVE_DRIVER_STATUSES.includes(status);
    const isDriverOnWay = status === DRIVER_ON_WAY;
    const isCustomerCareStatus = status === CUSTOMER_CARE_STATUS;
    const isTripActive = status === ACTIVE_STATUS;
    const isDriverArrived = status === ARRIVED_STATUS;

    const white = theme.formattedColor.white;
    const dark = theme.formattedColor.bgSettings;

    const gradientColorsDark = [dark.opacity(0.8), dark.opacity(0.61), dark.opacity(0.45), dark.opacity(0)];
    const gradientColorsLight = [white.opacity(0.8), white.opacity(0.75), white.opacity(0.6), white.opacity(0)];
    const gradientStart = { x: 0, y: 1 };
    const gradientEnd = { x: 0, y: 0 };

    const statusPosition = isIphoneX() ? 140 : 130;

    return (
      <FadeInView>
        <GradientWrapper
          style={styles.footer}
          colors={nightMode ? gradientColorsDark : gradientColorsLight}
          start={gradientStart}
          end={gradientEnd}
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

              {shouldCallDispatcher(order) &&
                this.renderFloatButton({
                  iconName: 'dispatcher',
                  label: 'callDispatcher',
                  handler: this.handleCallFleet
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
        </GradientWrapper>
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

  renderPopups = () => (
    <Fragment>
      <SuccessPopup
        innerRef={(popup) => { this.successPopup = popup; }}
        title={strings('popup.orderCreating.success')}
        buttons={[
          {
            title: strings('popup.orderCreating.button.seeDetails'),
            style: styles.btnStyle,
            textStyle: styles.btnTextStyle,
            onPress: this.handleActivateFutureOrder
          },
          {
            title: strings('popup.orderCreating.button.сonfirm')
          }
        ]}
      />

      <FutureOrderSuggestionPopup
        popupRef={(popup) => { this.futureOrderPopup = popup; }}
        flightData={this.state.flightData}
        onPress={this.handleCreateFutureOrder}
      />
    </Fragment>
  );

  renderOrderDetailsPanel = () => (
    <OrderDetailsPanel
      navigation={this.props.navigation}
      onClose={() => this.handleClose('OrderDetailsPanel')}
      onActivate={this.showPanel}
      visible={this.state.isVisibleOrderDetailsPanel}
      handleRepeatReturnOrder={this.handleRepeatReturnOrder}
    />
  )

  render() {
    const { status, order } = this.props;

    const shouldShowPointer = POINTER_DISPLAY_STATUSES.includes(status) ||
      (order.status === ORDER_RECEIVED_STATUS && order.asap);

    return (
      <Fragment>
        <OrderHeader
          status={status}
          handlePressBack={this.handleBackBtnPress}
          handlePressCreateNew={this.createNewOrder}
        />

        <View style={styles.container} pointerEvents={shouldShowPointer ? 'auto' : 'box-none'}>
          <View style={styles.separator} />

          {this.renderInfoPanel()}

          {shouldShowPointer && <Pointer />}

          {this.renderModals()}
        </View>

        {this.renderOrderDetailsPanel()}

        {this.renderPopups()}
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
  booking,
  bookingForm: booking.bookingForm,
  formData: booking.formData,
  currentOrder: booking.currentOrder,
  futureOrderId: booking.futureOrderId,
  status: booking.currentOrder.indicatedStatus || 'connected',
  order: booking.currentOrder,
  busy: booking.currentOrder.busy,
  customerServicePhone: passenger.companySettings.customerServicePhone
});

const mapDispatch = {
  cancelOrder,
  clearCurrentOrder,
  removeFields,
  resetBookingValues,
  changeAddress,
  setActiveBooking,
  changeReference,
  restoreCurrentOrder,
  getFormData
};

export default connect(mapState, mapDispatch)(withTheme(OrderScene));
