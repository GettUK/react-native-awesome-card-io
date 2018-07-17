import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
  TimePickerAndroid,
  BackHandler
} from 'react-native';
import { every, find, first, has, isEmpty, throttle } from 'lodash';
import { HourFormat } from 'react-native-hour-format';

import { Icon, Button, Modal, Alert, Popup, UserGuide, OrderCreatingHeader, OrderHeader } from 'components';

import { BookingEditor } from 'containers/BookingEditor';

import { changePosition, errorPosition } from 'actions/ui/map';
import {
  createBooking,
  removeFields,
  changeFields,
  getVehicles,
  toggleVisibleModal,
  completeOrder,
  resetBookingValues,
  cancelOrder,
  clearCurrentOrder,
  setActiveBooking,
  changeAddress
} from 'actions/booking';
import {
  checkMultiplePermissions,
  PERMISSION_STATUS
} from 'actions/app/statuses';
import { AVAILABLE_MAP_SCENES } from 'actions/ui/navigation';
import { getPassengerData } from 'actions/passenger';

import { strings } from 'locales';
import {
  showConfirmationAlert,
  setDefaultTimezone,
  convertToZone,
  momentDate,
  hourForward
} from 'utils';
import PN from 'utils/notifications';

import OrderScene from './OrderScene';
import OrderDetailsPanel from './ActiveOrderScene/OrderDetailsPanel';

import MapController from './MapController/MapController';

import styles from './style';

const CURRENT_ROUTE = 'MapView';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeNameTab: 'Personal',
      date: hourForward().toDate(),
      minDate: hourForward().toDate(),
      isPanelDisabled: true,
      fromOrderList: false,
      fromSettings: false,
      nightMode: false
    };
  }

  componentDidMount() {
    this.registerBackListener();

    PN.addNotificationListener({ userToken: this.props.session.token, setActiveBooking: this.props.setActiveBooking });
  }

  componentDidUpdate(prevProps) {
    const {
      booking: { bookingForm: { pickupAddress }, formData },
      canceledByUser
    } = this.props;
    const {
      booking: { bookingForm: { pickupAddress: pickupAddressProps }, formData: formDataProps },
      canceledByUser: canceledByUserProps
    } = prevProps;

    this.showServiceSuspendedPopup(formData, formDataProps);

    if (pickupAddress !== pickupAddressProps && pickupAddress) {
      setDefaultTimezone(pickupAddress.timezone);
    }

    if (canceledByUser && !canceledByUserProps) {
      this.showAlert();
    }

    this.checkForNightMode();
  }

  componentWillUnmount() {
    PN.clearNotificationListener();

    this.backListener.remove();

    BackHandler.removeEventListener('hardwareBack');
  }

  showServiceSuspendedPopup(formData, formDataProps) {
    if (formData !== formDataProps && formData.serviceSuspended && this.shouldRequestVehicles()) {
      setTimeout(this.popup.open, 1000); // delay opening "suspended service" pop-up after address modal closing
    }
  }

  registerBackListener = () => {
    this.backListener = BackHandler.addEventListener('hardwareBack', () => {
      const isOrderCreating = this.isActiveSceneIs('orderCreating');
      const orderCreatingRoutes = [
        'MessageToDriver', 'ReasonForTravel', 'PaymentsOptions', 'References', 'FlightSettings'
      ];
      const { booking: { bookingForm }, navigation: { dangerouslyGetParent } } = this.props;
      const parentRoute = dangerouslyGetParent().state;
      const route = parentRoute.routes[parentRoute.index];

      if (route.routeName !== (CURRENT_ROUTE || 'TransitionLoading')) {
        if (orderCreatingRoutes.includes(route.routeName) &&
          isOrderCreating && bookingForm.destinationAddress
        ) {
          this.props.toggleVisibleModal('settings');
        }
        this.goBack();
        if (route.routeName === 'OrdersView' && route.params.fromSettings) {
          this.goToSettings();
        }
        return true;
      } else if (!(isOrderCreating && !this.shouldRequestVehicles())) {
        this.handleBackBtnPress();
        return true;
      } else if (!isOrderCreating || bookingForm.destinationAddress) {
        this.goBack();
        return true;
      }

      return false;
    });
  };

  checkForNightMode = throttle(() => {
    const hour = (new Date()).getHours();
    this.setState({ nightMode: hour >= 21 || hour < 5 });
  }, 20000);

  goBack = () => {
    this.props.navigation.dispatch({
      type: 'Navigation/BACK'
    });
  };

  isAuthorizedPermission = (permission) => {
    const { app: { statuses } } = this.props;
    return (
      statuses.permissions &&
      statuses.permissions[permission] === PERMISSION_STATUS.authorized
    );
  };

  resizeMapToDriverAndTargetAddress = (type, order) =>
    this.mapView && this.mapView.wrappedInstance.resizeMapToDriverAndTargetAddress(type, order);

  getAvailableVehicles = () => {
    const { booking: { vehicles } } = this.props;
    return ((vehicles && vehicles.data) || []).filter(vehicle => vehicle.available);
  };

  getPassenger = () => {
    const {
      booking: { formData: { passenger, passengers }, bookingForm: { passengerId } },
      passenger: { data: { passenger: passengerData, favoriteAddresses } }
    } = this.props;

    return (!isEmpty(passengerData) && { ...passengerData, favoriteAddresses })
      || passenger
      || find(passengers, { id: +passengerId });
  };

  watchID = null;

  isActiveSceneIs = (name = 'orderCreating') => this.props.activeScene === AVAILABLE_MAP_SCENES[name];

  handleDateChange = (date) => {
    this.setState({ date, minDate: hourForward().toDate() });
  };

  handleUpdateSchedule = (type = 'now') => {
    const { date } = this.state;
    const scheduledAt = type === 'later'
      ? (hourForward().isBefore(momentDate(date)) && momentDate(date)) || hourForward()
      : null;

    this.togglePickerModal();
    this.props.changeFields({ scheduledType: type, scheduledAt });
    this.goToRequestVehicles({ scheduledAt, scheduledType: type });
  };

  handleNowSubmit = () => {
    this.handleUpdateSchedule('now');
  };

  handleDateSubmit = () => {
    this.handleUpdateSchedule('later');
  };

  goToRequestVehicles = ({ scheduledAt, scheduledType } = {}) => {
    if (!this.shouldRequestVehicles()) return;

    this.props.getPassengerData();

    this.requestVehicles({ scheduledAt, scheduledType });
  };

  shouldRequestVehicles = () => {
    const { booking: { bookingForm } } = this.props;
    return has(bookingForm, 'pickupAddress') &&
      bookingForm.pickupAddress.countryCode &&
      has(bookingForm, 'destinationAddress') &&
      bookingForm.destinationAddress.countryCode &&
      this.isPassengerPresent();
  };

  allStopsValid = () => {
    const { booking: { bookingForm: { stops } } } = this.props;
    return every(stops, stop => typeof stop.countryCode !== 'undefined');
  };

  isPassengerPresent = () => {
    const { booking: { bookingForm } } = this.props;
    return !!bookingForm.passengerId;
  };

  requestVehicles = ({ scheduledAt, scheduledType } = {}) => {
    const {
      passengerName,
      passengerPhone,
      passengerId,
      pickupAddress,
      destinationAddress,
      scheduledAt: scheduledAtForm,
      scheduledType: scheduledTypeForm,
      paymentMethod,
      paymentType,
      paymentCardId,
      stops
    } = this.props.booking.bookingForm;
    const passenger = this.getPassenger();

    let scheduledAtTime = null;
    if ((scheduledType || scheduledTypeForm) === 'later') {
      scheduledAtTime = (scheduledAt || scheduledAtForm).format();
    }

    const processedPassengerName = passenger ? `${passenger.firstName} ${passenger.lastName}` : passengerName;
    const processedPassengerPhone = passenger ? passenger.phone : passengerPhone;
    const processedStops = stops && stops.map(s => ({
      address: s,
      name: processedPassengerName,
      phone: processedPassengerPhone,
      passengerId
    }));

    this.props.getVehicles({
      pickupAddress,
      destinationAddress,
      scheduledAt: scheduledAtTime,
      passengerName: processedPassengerName,
      passengerPhone: processedPassengerPhone,
      passengerId,
      paymentMethod,
      paymentType,
      paymentCardId,
      scheduledType: scheduledType || scheduledTypeForm,
      stops: processedStops
    }).then(() => {
      const vehicle = this.lookupVehicle();
      this.props.changeFields({
        quoteId: vehicle.quoteId,
        vehicleName: vehicle.name,
        vehicleValue: vehicle.value,
        vehiclePrice: vehicle.price
      });
    });
  };

  lookupVehicle = () => {
    const { booking: { bookingForm: { vehicleName } } } = this.props;
    const availableVehicles = this.getAvailableVehicles();
    const passenger = this.getPassenger();
    let vehicle = { quoteId: undefined, name: undefined, value: undefined };

    if (availableVehicles.length) {
      vehicle =
        (vehicleName && availableVehicles.find(v => v.name === vehicleName)) ||
        (passenger && availableVehicles.find(v => v.name === passenger.defaultVehicle)) ||
        first(availableVehicles);
    }
    return vehicle;
  };

  handleBackFromOrderList = ({ fromSettings = false }) => {
    this.setState({ fromOrderList: true, fromSettings });
  };

  setActiveRouteTab = (routeNameTab) => {
    this.setState({ routeNameTab });
  };

  handleShowPanel = () => {
    this.setState({ isPanelDisabled: false });
  };

  handleHidePanel = () => {
    this.setState({ isPanelDisabled: true });
  };

  goToSettings = () => {
    this.props.navigation.navigate('Settings', { onGoToRides: this.goToOrders });
  };

  goToOrders = ({ fromSettings = false }) => {
    this.props.navigation.navigate('OrdersView', {
      onBack: this.handleBackFromOrderList,
      fromSettings,
      onGoToRides: this.goToOrders,
      onChangeTab: this.setActiveRouteTab
    });
  };

  togglePickerModal = () => {
    this.props.toggleVisibleModal('picker');
  };

  clearFields = () => {
    const { removeFields, resetBookingValues } = this.props;
    removeFields([
      'stops', 'destinationAddress',
      'vehiclePrice', 'vehicleValue', 'vehicleName',
      'travelReasonId', 'flight', 'flightType'
    ]);
    resetBookingValues();

    setTimeout(() => {
      this.editorView.wrappedInstance.closePromo();
      this.editorView.wrappedInstance.resetPromo();
    }, 500);
  };

  getCurrentPosition = () => {
    this.mapView.wrappedInstance.getCurrentPosition();
  }

  goToInitialization = () => {
    this.clearFields();

    this.props.clearCurrentOrder();

    this.getCurrentPosition();
  };

  showAlert = () => {
    this.alert.show();
  };

  cancelOrderCreation = () => {
    showConfirmationAlert({ title: strings('alert.title.cancelOrderCreation'), handler: this.clearFields });
  };

  handleBackBtnPress = () => {
    const isOrderCreating = this.isActiveSceneIs('orderCreating');
    const isActiveOrder = this.isActiveSceneIs('activeOrder');
    const isCompletedOrder = this.isActiveSceneIs('completedOrder');
    const { clearCurrentOrder, navigation } = this.props;
    const { routeNameTab, fromOrderList, fromSettings, isPanelDisabled } = this.state;

    if ((isActiveOrder || isCompletedOrder) && !isPanelDisabled) {
      this.handleHidePanel();
    } else if (isOrderCreating) {
      this.cancelOrderCreation();
    } else if (fromOrderList) {
      this.goToOrders({ fromSettings });
      navigation.navigate(routeNameTab);
      setTimeout(clearCurrentOrder); // needed for smooth navigation animation

      this.getCurrentPosition();

      this.setState({ fromOrderList: false, fromSettings: false });
    } else {
      this.goToInitialization();
    }
  };

  renderTimeDatePicker() {
    const { date, minDate } = this.state;
    const { is24HourFormat } = HourFormat;
    const { booking: { modals: { picker }, bookingForm: { pickupAddress } } } = this.props;
    const moment = momentDate(date);
    const timezoneDate = (pickupAddress && convertToZone(moment, pickupAddress.timezone)) || moment;

    const openDatePickerAndroid = async () => {
      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          date,
          minDate
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          this.handleDateChange(moment.set({ year, month, date: day }).toDate());
        }
      } catch ({ code, message }) {
        // eslint-disable-next-line no-console
        console.warn('Cannot open date picker', message);
      }
    };

    const setTimePickerTime = (time) => {
      const toTime = time ? moment.set({ ...time }) : moment;
      if (hourForward().isBefore(toTime)) {
        this.handleDateChange(toTime.toDate());
      } else {
        this.handleDateChange(hourForward().toDate());
      }
    };

    const openTimePickerAndroid = async () => {
      try {
        setTimePickerTime();
        const { action, hour, minute } = await TimePickerAndroid.open({
          hour: moment.get('hour'),
          minute: moment.get('minute'),
          is24Hour: is24HourFormat()
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          setTimePickerTime({ hour, minute });
        }
      } catch ({ code, message }) {
        // eslint-disable-next-line no-console
        console.warn('Cannot open time picker', message);
      }
    };

    const renderSelectedValue = (value, handler, icon) => {
      const isAndroid = Platform.OS === 'android';
      return (
        isAndroid ?
          <TouchableOpacity activeOpacity={0.8} style={styles.row} onPress={handler}>
            {value}
            {icon}
          </TouchableOpacity> :
          value
      );
    };

    const renderSelected = () => {
      const formatedTime = is24HourFormat() ? moment.format('HH:mm') : moment.format('hh:mm a');
      const time = <Text style={styles.time}>{formatedTime}</Text>;
      const date = <Text style={styles.date}>{moment.format('dddd, MMMM D, YYYY')}</Text>;

      return (
        <View style={styles.selectedWrapper}>
          {renderSelectedValue(time, openTimePickerAndroid, <Icon style={styles.TDEditIcon} name="editAndroid" />)}
          {renderSelectedValue(date, openDatePickerAndroid, <Icon size={20} name="editAndroid" />)}
        </View>
      );
    };

    const renderButton = ({ style, styleText, title, onClick }, index) => (
      <Button
        key={index}
        raised
        style={styles.buttonContainer}
        styleContent={[styles.button, style]}
        onPress={onClick}
      >
        <Text style={[styles.buttonText, styleText]}>{title || ''}</Text>
      </Button>
    );

    const buttons = [
      { title: 'Now', style: styles.NowButton, styleText: styles.NowButtonText, onClick: this.handleNowSubmit },
      { title: 'Set', style: styles.TDButton, styleText: styles.TDButtonText, onClick: this.handleDateSubmit }
    ];

    return (
      <Modal
        style={styles.bottomModal}
        isVisible={picker}
        contentStyles={styles.TDModal}
        onClose={this.togglePickerModal}
      >
        {renderSelected()}

        {Platform.OS === 'ios' &&
          <View style={styles.TDPickerWrapper}>
            <DatePickerIOS
              date={date}
              onDateChange={this.handleDateChange}
              minimumDate={minDate}
              timeZoneOffsetInMinutes={timezoneDate.utcOffset()}
            />
          </View>
        }
        <View style={styles.row}>
          {buttons.map(renderButton)}
        </View>
      </Modal>
    );
  }

  renderHeader = () => {
    const { status } = this.props;
    const { nightMode } = this.state;

    return this.isActiveSceneIs('orderCreating')
      ? (
        <OrderCreatingHeader
          type={!this.shouldRequestVehicles() ? 'dashboard' : 'orderCreating'}
          handlePressBurger={this.goToSettings}
          handlePressBack={this.handleBackBtnPress}
          handlePressOrder={this.goToOrders}
          nightMode={nightMode}
        />
      )
      : (
        <OrderHeader
          status={status}
          handlePressBack={this.handleBackBtnPress}
          handlePressCreateNew={this.goToInitialization}
        />
      );
  };

  renderPickUpMarker = () => (
    <Icon name="sourceMarker" width={32} height={52} style={styles.pickUpMarker} />
  );

  render() {
    const { navigation, booking: { bookingForm }, session: { user } } = this.props;
    const { isPanelDisabled, nightMode } = this.state;
    const isOrderCreating = this.isActiveSceneIs('orderCreating');
    const isActiveOrder = this.isActiveSceneIs('activeOrder');
    const isCompletedOrder = this.isActiveSceneIs('completedOrder');

    return (
      <View style={styles.container}>

        {this.renderHeader()}

        {!isEmpty(user) && !user.guidePassed && <UserGuide />}

        {isOrderCreating &&
          <BookingEditor
            navigation={navigation}
            passenger={this.getPassenger()}
            requestVehicles={this.goToRequestVehicles}
            getCurrentPosition={this.getCurrentPosition}
            toOrder={this.shouldRequestVehicles()} // TODO pls rename this prop
            isAuthorizedPermission={this.isAuthorizedPermission}
            onDateChange={this.handleDateChange}
            onHidePromo={this.handleHidePanel}
            ref={(editor) => { this.editorView = editor; }}
          />
        }
        {(isActiveOrder || isCompletedOrder) &&
          <OrderScene
            resizeMapToDriverAndTargetAddress={this.resizeMapToDriverAndTargetAddress}
            nightMode={nightMode}
          />
        }

        <MapController ref={(el) => { this.mapView = el; }} nightMode={nightMode} />

        {isOrderCreating && !bookingForm.destinationAddress && this.renderPickUpMarker()}

        {this.renderTimeDatePicker()}

        {(isActiveOrder || isCompletedOrder) &&
          <OrderDetailsPanel
            navigation={navigation}
            onClose={this.handleHidePanel}
            onActivate={this.handleShowPanel}
            visible={!isPanelDisabled}
          />
        }

        <Alert
          ref={(alert) => { this.alert = alert; }}
          type="success"
          message="Order was cancelled"
          position="bottom"
        />
        <Popup
          ref={(popup) => { this.popup = popup; }}
          title={strings('popup.serviceSuspended.title')}
          content={(
            <View>
              <Text style={styles.popupInfo}>
                {strings('popup.serviceSuspended.description')}
              </Text>
              <Text style={styles.popupLabel}>
                {strings('popup.serviceSuspended.sign')}
              </Text>
            </View>
          )}
        />
      </View>
    );
  }
}

Map.propTypes = {
  navigation: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  booking: PropTypes.object.isRequired,
  getVehicles: PropTypes.func.isRequired,
  removeFields: PropTypes.func.isRequired,
  changeFields: PropTypes.func.isRequired,
  changePosition: PropTypes.func.isRequired,
  errorPosition: PropTypes.func.isRequired,
  toggleVisibleModal: PropTypes.func.isRequired,
  checkMultiplePermissions: PropTypes.func.isRequired
};

Map.defaultProps = {
};

const mapState = ({ app, ui, booking, session, passenger, router }) => ({
  app,
  map: ui.map,
  session,
  activeScene: ui.navigation.activeScene,
  booking,
  status: booking.currentOrder.indicatedStatus || 'connected',
  canceledByExternal: booking.canceledByExternal,
  canceledByUser: booking.canceledByUser,
  passenger,
  router: router.navigatorApp,
  activeBookingId: session.user && session.user.activeBookingId
});

const mapDispatch = {
  removeFields,
  changeFields,
  changePosition,
  errorPosition,
  createBooking,
  getVehicles,
  toggleVisibleModal,
  completeOrder,
  cancelOrder,
  checkMultiplePermissions,
  getPassengerData,
  clearCurrentOrder,
  resetBookingValues,
  setActiveBooking,
  changeAddress
};

export default connect(mapState, mapDispatch)(Map);
