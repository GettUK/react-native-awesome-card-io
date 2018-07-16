import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
  TimePickerAndroid,
  BackHandler
} from 'react-native';
import { every, find, first, has, isNull, isEmpty, throttle } from 'lodash';
import { HourFormat } from 'react-native-hour-format';

import { Icon, Button, Modal, Alert, Popup, UserGuide } from 'components';
import NavImageButton from 'components/Common/NavImageButton';
import Header from 'components/Common/Header';

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
  requestLocation,
  PERMISSION_STATUS,
  locationPermissions
} from 'actions/app/statuses';
import { AVAILABLE_MAP_SCENES } from 'actions/ui/navigation';
import { getPassengerData } from 'actions/passenger';

import { strings } from 'locales';
import {
  showConfirmationAlert,
  setDefaultTimezone,
  convertToZone,
  momentDate,
  hourForward,
  LATTITIDE_DELTA,
  LONGTITUDE_DELTA,
  Coordinates
} from 'utils';
import PN from 'utils/notifications';
import { CUSTOMER_CARE_STATUS, FINAL_STATUSES } from 'utils/orderStatuses';

import OrderScene from './OrderScene';
import OrderDetailsPanel from './ActiveOrderScene/OrderDetailsPanel';

import MapView from './MapView';

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
      isLoadingPickup: false,
      dragEnable: true,
      nightMode: false
    };
  }

  componentDidMount() {
    this.props.requestLocation();

    this.setWatchPosition();

    this.registerBackListener();

    PN.addNotificationListener({ userToken: this.props.session.token, setActiveBooking: this.props.setActiveBooking });
  }

  componentDidUpdate(prevProps) {
    const {
      map: { currentPosition },
      booking: { bookingForm: { pickupAddress }, formData },
      app: { statuses },
      canceledByUser,
      activeBookingId,
      setActiveBooking
    } = this.props;
    const {
      map: { currentPosition: currentPositionProps },
      booking: { bookingForm: { pickupAddress: pickupAddressProps }, formData: formDataProps },
      app: { statuses: statusesProps },
      canceledByUser: canceledByUserProps
    } = prevProps;

    this.showServiceSuspendedPopup(formData, formDataProps);

    if (pickupAddress !== pickupAddressProps && pickupAddress) {
      setDefaultTimezone(pickupAddress.timezone);
    }

    if (currentPosition !== currentPositionProps && isNull(currentPositionProps)) {
      setTimeout(() => {
        Coordinates.getNavigatorLocation(this.changePosition, this.props.changeAddress);

        if (activeBookingId) {
          setActiveBooking(activeBookingId);
        }
      }, 500);
    }

    this.isWatchPosition(statuses, statusesProps);

    if (canceledByUser && !canceledByUserProps) {
      this.showAlert();
    }
    this.checkForNightMode();
  }

  componentWillUnmount() {
    PN.clearNotificationListener();

    Coordinates.clearWatcher();

    this.backListener.remove();

    BackHandler.removeEventListener('hardwareBack');
  }

  showServiceSuspendedPopup(formData, formDataProps) {
    if (formData !== formDataProps && formData.serviceSuspended && this.shouldRequestVehicles()) {
      setTimeout(this.popup.open, 1000); // delay opening "suspended service" pop-up after address modal closing
    }
  }

  isWatchPosition(statuses, statusesProps) {
    if (
      statuses.permissions && statusesProps.permissions &&
      statuses.permissions.location !== statusesProps.permissions.location &&
      locationPermissions.includes(statuses.permissions.location)
    ) {
      this.setWatchPosition();
    }
  }

  registerBackListener = () => {
    this.backListener = BackHandler.addEventListener('hardwareBack', () => {
      const isPreOrder = this.isActiveSceneIs('preOrder');
      const preOrderRoutes = ['MessageToDriver', 'ReasonForTravel', 'PaymentsOptions', 'References', 'FlightSettings'];
      const { booking: { bookingForm }, navigation: { dangerouslyGetParent } } = this.props;
      const parentRoute = dangerouslyGetParent().state;
      const route = parentRoute.routes[parentRoute.index];

      if (route.routeName !== (CURRENT_ROUTE || 'TransitionLoading')) {
        if (preOrderRoutes.includes(route.routeName) &&
          isPreOrder && bookingForm.destinationAddress
        ) {
          this.props.toggleVisibleModal('settings');
        }
        this.goBack();
        if (route.routeName === 'OrdersView' && route.params.fromSettings) {
          this.goToSettings();
        }
        return true;
      } else if (!(isPreOrder && !this.shouldRequestVehicles())) {
        this.handleBackBtnPress();
        return true;
      } else if (!isPreOrder || bookingForm.destinationAddress) {
        this.goBack();
        return true;
      }

      return false;
    });
  };

  setWatchPosition = () => {
    this.props.checkMultiplePermissions(['location']).then(({ location }) => {
      if (location === PERMISSION_STATUS.authorized) {
        Coordinates.watchCoordinates(this.changePosition, this.props.changeAddress);
      } else if (location === PERMISSION_STATUS.denied) {
        this.alertGPS.show();
      }
    });
  };

  checkForNightMode = throttle(() => {
    const hour = (new Date()).getHours();
    this.setState({ nightMode: hour >= 21 || hour < 5 });
  }, 20000);

  changePosition = (coordinates) => {
    const { currentPosition } = this.props.map;
    const { latitude, longitude } = currentPosition || {};

    if (coordinates && (coordinates.latitude !== latitude || coordinates.longitude !== longitude)) {
      this.props.changePosition(coordinates);
    }
  };

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

  animateToRegion = ({ latitude, longitude }) => {
    this.mapView.wrappedInstance.animateToRegion({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      latitudeDelta: LATTITIDE_DELTA / 5,
      longitudeDelta: LONGTITUDE_DELTA / 5
    });
  };

  getCurrentPosition = () => {
    const { map: { currentPosition } } = this.props;

    Coordinates.getNavigatorLocation(this.changePosition, this.props.changeAddress);
    if (!isNull(currentPosition)) {
      this.animateToRegion(currentPosition);
    }
  };

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

  isActiveSceneIs = (name = 'preOrder') => this.props.activeScene === AVAILABLE_MAP_SCENES[name];

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

  startLoadingPickup = () => {
    this.setState({ isLoadingPickup: true });
  };

  endLoadingPickup = () => {
    this.setState({ isLoadingPickup: false });
  };

  disableDrag = () => {
    this.setState({ dragEnable: false });
  };

  enableDrag = () => {
    this.setState({ dragEnable: true });
  };

  handleBackBtnPress = () => {
    const isPreOrder = this.isActiveSceneIs('preOrder');
    const isActiveOrder = this.isActiveSceneIs('activeOrder');
    const isCompletedOrder = this.isActiveSceneIs('completedOrder');
    const { clearCurrentOrder, navigation } = this.props;
    const { routeNameTab, fromOrderList, fromSettings, isPanelDisabled } = this.state;

    if ((isActiveOrder || isCompletedOrder) && !isPanelDisabled) {
      this.handleHidePanel();
    } else if (isPreOrder) {
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

  renderRightButton = isCreateNewButtonAvailable => (
    <Button
        styleContent={[styles.btn, !isCreateNewButtonAvailable && styles.orderBtn]}
        raised={false}
        size="sm"
        onPress={isCreateNewButtonAvailable ? this.goToInitialization : this.goToOrders}
      >
        <Text allowFontScaling={false} style={styles[isCreateNewButtonAvailable ? 'createNewText' : 'orderBtnText']}>
          {isCreateNewButtonAvailable ? strings('order.button.createNew') : strings('order.button.orders')}
        </Text>
      </Button>
  );

  renderHeader = () => {
    const { status } = this.props;
    const { nightMode } = this.state;
    const isPreOrder = this.isActiveSceneIs('preOrder');
    const isCustomerCareStatus = status === CUSTOMER_CARE_STATUS;
    const isFinalStatus = FINAL_STATUSES.includes(status);
    const isCreateNewButtonAvailable = isFinalStatus && !isCustomerCareStatus;

    const isRightButtonAvailable = (isPreOrder && !this.shouldRequestVehicles()) || isCreateNewButtonAvailable;

    return (
      <Header
        customStyles={styles.header}
        leftButton={isPreOrder && !this.shouldRequestVehicles()
          ?
          <NavImageButton
            onClick={this.goToSettings}
            styleContainer={{ justifyContent: 'center' }}
            styleView={styles.touchZone}
            icon={<Icon size={30} name="burger" color={nightMode ? '#fff' : '#000'} />}
          />
          :
          <NavImageButton
            onClick={this.handleBackBtnPress}
            styleContainer={[styles.touchZone, styles.shadow]}
            styleView={styles.headerBack}
            icon={<Icon width={10} height={18} name="back" color="#284784" />}
          />
        }
        rightButton={isRightButtonAvailable && this.renderRightButton(isCreateNewButtonAvailable)}
      />
    );
  };

  renderPickUpMarker = () => (
    <Icon name="sourceMarker" width={32} height={52} style={styles.pickUpMarker} />
  );

  render() {
    const { navigation, booking: { bookingForm }, session: { user } } = this.props;
    const { isPanelDisabled, isLoadingPickup, dragEnable, nightMode } = this.state;
    const isPreOrder = this.isActiveSceneIs('preOrder');
    const isActiveOrder = this.isActiveSceneIs('activeOrder');
    const isCompletedOrder = this.isActiveSceneIs('completedOrder');

    return (
      <View style={styles.container}>
        <StatusBar barStyle={nightMode ? 'light-content' : 'default'} animated />

        {this.renderHeader()}

        {!isEmpty(user) && !user.guidePassed && <UserGuide />}

        {isPreOrder &&
          <BookingEditor
            navigation={navigation}
            passenger={this.getPassenger()}
            requestVehicles={this.goToRequestVehicles}
            isLoadingPickup={isLoadingPickup}
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

        <MapView
          isActiveOrder={isActiveOrder}
          isCompletedOrder={isCompletedOrder}
          isPreOrder={isPreOrder}
          dragEnable={!isLoadingPickup && dragEnable}
          ref={(map) => { this.mapView = map; }}
          onStartLoadingPickup={this.startLoadingPickup}
          onEndLoadingPickup={this.endLoadingPickup}
          disableDrag={this.disableDrag}
          enableDrag={this.enableDrag}
          onFutureOrderReceived={this.handleShowPanel}
          nightMode={nightMode}
        />

        {isPreOrder && !bookingForm.destinationAddress && this.renderPickUpMarker()}

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
          ref={(alert) => { this.alertGPS = alert; }}
          type="warning"
          message={strings('alert.message.notReceivedCoordinates')}
          position="top"
        />
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
  checkMultiplePermissions: PropTypes.func.isRequired,
  requestLocation: PropTypes.func.isRequired
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
  requestLocation,
  getPassengerData,
  clearCurrentOrder,
  resetBookingValues,
  setActiveBooking,
  changeAddress
};

export default connect(mapState, mapDispatch)(Map);
