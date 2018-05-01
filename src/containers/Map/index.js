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
  BackHandler,
  NativeModules,
  DeviceEventEmitter
} from 'react-native';
import { every, find, first, has, isNull, isEmpty } from 'lodash';

import { Icon, Button, Modal, Alert } from 'components';
import NavImageButton from 'components/Common/NavImageButton';
import Header from 'components/Common/Header';

import { BookingEditor } from 'containers/BookingEditor';

import {
  removeFields,
  changeFields,
  changePosition,
  errorPosition,
  resetReferenceValues
} from 'actions/ui/map';
import {
  createBooking,
  getVehicles,
  toggleVisibleModal,
  completeOrder,
  cancelOrder,
  clearCurrentOrder
} from 'actions/booking';
import { checkMultiplePermissions, requestLocation, PERMISSION_STATUS } from 'actions/app/statuses';
import { AVAILABLE_MAP_SCENES } from 'actions/ui/navigation';
import { getPassengerData } from 'actions/passenger';

import { strings } from 'locales';
import { showConfirmationAlert, setDefaultTimezone, convertToZone, momentDate, hourForward } from 'utils';
import PN from 'utils/notifications';

import ActiveOrderScene from './ActiveOrderScene';
import CompletedOrderScene from './CompletedOrderScene';
import OrderDetailsPanel from './ActiveOrderScene/OrderDetailsPanel';

import MapView from './MapView';

import styles from './style';

const { RNLocation: Location } = NativeModules;

const geoLocationOptions = {
  timeout: 2500,
  highAccuracy: true
};

const CURRENT_ROUTE = 'MapView';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: hourForward().toDate(),
      minDate: hourForward().toDate(),
      isHeaderEnable: true,
      fromOrderList: false,
      fromSettings: false,
      isLoadingPickup: false
    };
  }

  componentWillMount() {
    this.props.requestLocation();

    this.setCurrentPosition();

    this.registerBackListener();
  }

  componentDidMount() {
    PN.addNotificationListener({ userToken: this.props.session.token, navigator: this.props.navigation });
  }

  componentWillReceiveProps(nextProps) {
    const { map: { currentPosition, fields: { pickupAddress } }, app: { statuses }, canceledByUser } = nextProps;
    const { map: mapProps, app: { statuses: statusesProps }, canceledByUser: canceledByUserProps } = this.props;
    const { currentPosition: currentPositionProps, fields: { pickupAddress: pickupAddressProps } } = mapProps;

    if (pickupAddress !== pickupAddressProps) {
      setDefaultTimezone(pickupAddress.timezone);
    }

    if (currentPosition !== currentPositionProps && isNull(currentPositionProps)) {
      setTimeout(this.getCurrentPosition, 250);
    }

    if (
      statuses.permissions && statusesProps.permissions &&
      statuses.permissions.location !== statusesProps.permissions.location &&
      statuses.permissions.location === PERMISSION_STATUS.authorized
    ) {
      this.setCurrentPosition();
    }

    if (canceledByUser && !canceledByUserProps) {
      this.showAlert();
    }
  }

  componentWillUnmount() {
    PN.clearNotificationListener();

    this.backListener.remove();

    BackHandler.removeEventListener('hardwareBack');
  }

  registerBackListener = () => {
    this.backListener = BackHandler.addEventListener('hardwareBack', () => {
      const isPreOrder = this.isActiveSceneIs('preOrder');
      const { map: { fields }, router } = this.props;

      if (router.routes[router.index].routeName !== CURRENT_ROUTE) {
        this.goBack();
        return true;
      } else if (!(isPreOrder && !this.shouldRequestVehicles())) {
        this.handleBackBtnPress();
        return true;
      } else if (!isPreOrder || fields.destinationAddress) {
        this.goBack();
        return true;
      }

      return false;
    });
  };

  setCurrentPosition = () => {
    this.props.checkMultiplePermissions(['location']).then(({ location }) => {
      if (location === PERMISSION_STATUS.authorized) {
        if (Platform.OS === 'ios') {
          Location.startUpdatingLocation();
        } else {
          Location.startUpdatingLocation(geoLocationOptions);
        }

        DeviceEventEmitter.addListener('locationUpdated', this.props.changePosition);
      }
    });
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

  animateToRegion = ({ latitude, longitude }) => {
    this.mapView.wrappedInstance.animateToRegion({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    });
  };

  getCurrentPosition = () => {
    const { map: { currentPosition } } = this.props;
    if (!isNull(currentPosition)) {
      this.animateToRegion(currentPosition);
    }
  };

  getAvailableVehicles = () => {
    const { bookings: { formData: { vehicles } } } = this.props;
    return ((vehicles && vehicles.data) || []).filter(vehicle => vehicle.available);
  };

  getPassenger = () => {
    const {
      map: { fields: { passengerId } },
      bookings: { formData: { passenger, passengers } },
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

  handleNowSubmit = () => {
    this.togglePickerModal();
    this.props.changeFields({
      scheduledType: 'now',
      scheduledAt: null
    });
    if (this.editorView) {
      this.editorView.wrappedInstance.footerInstance().createBooking();
    }
  };

  handleDateSubmit = () => {
    const { date } = this.state;

    this.togglePickerModal();
    this.props.changeFields({
      scheduledType: 'later',
      scheduledAt: (hourForward().isBefore(momentDate(date)) && momentDate(date)) || hourForward()
    });
    this.goToRequestVehicles();
  };

  goToRequestVehicles = () => {
    if (!this.shouldRequestVehicles()) return;

    this.props.getPassengerData();

    this.requestVehicles();
  };

  shouldRequestVehicles = () => {
    const { map: { fields } } = this.props;
    return has(fields, 'pickupAddress') &&
      fields.pickupAddress.countryCode &&
      has(fields, 'destinationAddress') &&
      fields.destinationAddress.countryCode &&
      this.isPassengerPresent();
  };

  allStopsValid = () => {
    const { map: { fields: { stops } } } = this.props;
    return every(stops, stop => typeof stop.countryCode !== 'undefined');
  };

  isPassengerPresent = () => {
    const { map: { fields } } = this.props;
    return !!fields.passengerId;
  };

  requestVehicles = () => {
    const {
      passengerName,
      passengerPhone,
      passengerId,
      pickupAddress,
      destinationAddress,
      scheduledAt,
      scheduledType,
      paymentMethod,
      paymentType,
      paymentCardId,
      stops
    } = this.props.map.fields;
    const passenger = this.getPassenger();

    let scheduledAtTime = null;
    if (scheduledType === 'later') {
      scheduledAtTime = scheduledAt.format();
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
      scheduledType,
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
    const { map: { fields: { vehicleName } } } = this.props;
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

  handleHideHeader = () => {
    this.setState({ isHeaderEnable: false });
  };

  handleShowHeader = () => {
    this.setState({ isHeaderEnable: true });
  };

  goToSettings = () => {
    this.props.navigation.navigate('Settings', { onGoToRides: this.goToOrders });
  };

  goToOrders = ({ fromSettings = false }) => {
    this.props.navigation.navigate('OrdersView', {
      onBack: this.handleBackFromOrderList,
      fromSettings,
      onGoToRides: this.goToOrders
    });
  };

  togglePickerModal = () => {
    this.props.toggleVisibleModal('picker');
  };

  clearFields = () => {
    this.props.removeFields([
      'stops', 'destinationAddress',
      'vehiclePrice', 'vehicleValue', 'vehicleName'
    ]);
    this.props.changeFields({
      scheduledType: 'now',
      scheduledAt: null
    });
    this.props.resetReferenceValues();
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
    showConfirmationAlert({ title: strings('order.cancelOrderCreation'), handler: this.clearFields });
  };

  startLoadingPickup = () => {
    this.setState({ isLoadingPickup: true });
  }

  endLoadingPickup = () => {
    this.setState({ isLoadingPickup: false });
  }

  handleBackBtnPress = () => {
    const isPreOrder = this.isActiveSceneIs('preOrder');
    const { clearCurrentOrder } = this.props;

    if (isPreOrder) {
      this.cancelOrderCreation();
    } else if (this.state.fromOrderList) {
      this.goToOrders({ fromSettings: this.state.fromSettings });
      setTimeout(clearCurrentOrder); // needed for smooth navigation animation

      this.getCurrentPosition();

      this.setState({ fromOrderList: false, fromSettings: false });
    } else {
      this.goToInitialization();
    }
  };

  renderTimeDatePicker() {
    const { date, minDate } = this.state;
    const { bookings: { modals: { picker } }, map: { fields: { pickupAddress } } } = this.props;
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
          is24Hour: true
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
      const time = <Text style={styles.time}>{moment.format('H:mm')}</Text>;
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

  renderPickUpMarker = () => (
    <Icon name="sourceMarker" width={32} height={52} style={styles.pickUpMarker} />
  )

  render() {
    const { navigation } = this.props;
    const { isHeaderEnable } = this.state;
    const isPreOrder = this.isActiveSceneIs('preOrder');
    const isActiveOrder = this.isActiveSceneIs('activeOrder');
    const isCompletedOrder = this.isActiveSceneIs('completedOrder');

    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        {isHeaderEnable &&
          <Header
            customStyles={styles.header}
            leftButton={isPreOrder && !this.shouldRequestVehicles()
              ?
              <NavImageButton
                onClick={this.goToSettings}
                styleContainer={{ justifyContent: 'center' }}
                icon={<Icon size={30} name="burger" color="#000" />}
              />
              :
              <NavImageButton
                onClick={this.handleBackBtnPress}
                styleContainer={styles.headerBack}
                icon={<Icon width={10} height={18} name="back" color="#284784" />}
              />
            }
            rightButton={isPreOrder && !this.shouldRequestVehicles() &&
              <Button
                styleContent={styles.orderBtn}
                raised={false}
                size="sm"
                onPress={this.goToOrders}
              >
                <Text style={styles.orderBtnText}>Orders</Text>
              </Button>
            }
          />
        }
        {isPreOrder &&
          <BookingEditor
            navigation={navigation}
            passenger={this.getPassenger()}
            requestVehicles={this.goToRequestVehicles}
            isLoadingPickup={this.state.isLoadingPickup}
            getCurrentPosition={this.getCurrentPosition}
            toOrder={this.shouldRequestVehicles()} // TODO pls rename this prop
            isAuthorizedPermission={this.isAuthorizedPermission}
            onDateChange={this.handleDateChange}
            ref={(editor) => { this.editorView = editor; }}
          />
        }
        {isActiveOrder && <ActiveOrderScene />}
        {isCompletedOrder && <CompletedOrderScene goToInitialization={this.goToInitialization} />}

        <MapView
          isActiveOrder={isActiveOrder}
          isCompletedOrder={isCompletedOrder}
          isPreOrder={isPreOrder}
          dragEnable={!this.state.isLoadingPickup}
          ref={(map) => { this.mapView = map; }}
          onStartLoadingPickup={this.startLoadingPickup}
          onEndLoadingPickup={this.endLoadingPickup}
        />

        {isPreOrder && this.renderPickUpMarker()}

        {this.renderTimeDatePicker()}

        {(isActiveOrder || isCompletedOrder) &&
          <OrderDetailsPanel
            navigation={navigation}
            onActivate={this.handleHideHeader}
            onClose={this.handleShowHeader}
            visible={!isHeaderEnable}
          />
        }

        <Alert
          ref={(alert) => { this.alert = alert; }}
          type="success"
          message="Order was cancelled"
          position="bottom"
        />
      </View>
    );
  }
}

Map.propTypes = {
  navigation: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  bookings: PropTypes.object.isRequired,
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

const mapState = ({ app, ui, bookings, session, passenger, router }) => ({
  app,
  map: ui.map,
  session,
  activeScene: ui.navigation.activeScene,
  bookings,
  status: bookings.currentOrder.status || 'connected',
  canceledByExternal: bookings.canceledByExternal,
  canceledByUser: bookings.canceledByUser,
  passenger,
  router: router.navigatorApp
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
  resetReferenceValues
};

export default connect(mapState, mapDispatch)(Map);
