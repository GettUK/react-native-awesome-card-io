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
  TimePickerAndroid
} from 'react-native';
import moment from 'moment';
import { every, find, first, has } from 'lodash';

import { Icon, Button, Modal, Alert } from 'components';
import NavImageButton from 'components/Common/NavImageButton';
import Header from 'components/Common/Header';

import { BookingEditor, BookingFooter } from 'containers/BookingEditor';

import {
  removeFields,
  changeFields,
  addAddressPoint,
  changeAddressType,
  changeAddress,
  addressVisibleModal,
  initialRegionPosition,
  changePosition,
  errorPosition
} from 'actions/ui/map';
import {
  createBooking,
  getVehicles,
  toggleVisibleModal,
  completeOrder,
  cancelOrder
} from 'actions/booking';
import { requestPermissions, PERMISSION_STATUS } from 'actions/app/statuses';
import { geocodeEmpty, geocode } from 'actions/ui/geocode';
import { AVAILABLE_MAP_SCENES } from 'actions/ui/navigation';

import { strings } from 'locales';
import { nullAddress, showConfirmationAlert } from 'utils';
import PN from 'utils/notifications';

import { ACTIVE_DRIVER_STATUSES, COMPLETED_STATUS, CANCELLED_STATUS } from './ActiveOrderScene/consts';
import ActiveOrderScene from './ActiveOrderScene';
import OrderDetailsPanel from './ActiveOrderScene/OrderDetailsPanel';

import MapView from './MapView';

import styles from './style';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      isHeaderEnable: true
    };
  }

  componentWillMount() {
    this.props.requestPermissions('location', { type: 'always' });
  }

  componentDidMount() {
    this.getCurrentPosition();
    this.watchPosition();

    PN.addNotificationListener({ userToken: this.props.session.token, navigator: this.props.navigation });
  }

  componentWillReceiveProps({ app: { statuses }, status, canceledByUser, canceledByExternal }) {
    const { app: { statuses: statusesProps },
      navigation, cancelOrder, completeOrder, status: statusProps,
      canceledByUser: canceledByUserProps, canceledByExternal: canceledByExternalProps } = this.props;

    if (
      statuses.permissions && statusesProps.permissions &&
      statuses.permissions.location !== statusesProps.permissions.location &&
      statuses.permissions.location === PERMISSION_STATUS.authorized
    ) {
      this.getCurrentPosition();
      this.watchPosition();
    }

    if (status !== statusProps && status === COMPLETED_STATUS) {
      navigation.navigate('RateDriver');

      //this.clearFields();

      completeOrder();
    } else if (status !== statusProps && status === CANCELLED_STATUS) {
      completeOrder();
    }

    if (canceledByUser && !canceledByUserProps) {
      this.showAlert();
    }

    if (canceledByExternal && !canceledByExternalProps) {
      navigation.navigate('OrdersView');
    }
  }

  componentWillUnmount() {
    this.clearWatchPosition();

    PN.clearNotificationListener();
  }

  watchPosition = () => {
    const { map: { options } } = this.props;
    if (this.isAuthorizedPermission('location')) {
      this.watchID = navigator.geolocation.watchPosition(
        this.props.changePosition,
        this.props.errorPosition,
        options
      );
    }
  };

  clearWatchPosition = () => {
    if (this.isAuthorizedPermission('location')) {
      navigator.geolocation.clearWatch(this.watchID);
    }
  };

  isAuthorizedPermission = (permission) => {
    const { app: { statuses } } = this.props;
    return (
      statuses.permissions &&
      statuses.permissions[permission] === PERMISSION_STATUS.authorized
    );
  };

  getCurrentPosition = () => {
    const { map: { options } } = this.props;
    if (this.isAuthorizedPermission('location')) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.props.initialRegionPosition(position);
          this.props.changePosition(position);
          this.props
            .geocode({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            })
            .then(this.addPoint)
            .catch(() => {
              this.addPoint(nullAddress());
            });
        },
        this.props.errorPosition,
        options
      );
    }
  };

  getAvailableVehicles = () => {
    const { bookings: { formData: { vehicles } } } = this.props;
    return ((vehicles && vehicles.data) || []).filter(vehicle => vehicle.available);
  };

  getPassenger = () => {
    const { map: { fields: { passengerId } }, bookings: { formData: { passenger, passengers } } } = this.props;

    return passenger || find(passengers, { id: +passengerId });
  };

  addPoint = (name) => {
    this.props.geocodeEmpty();
    this.props.changeAddress(name);
    this.props.changeAddressType('pickupAddress', {}, null);
    this.props.addAddressPoint();
  };

  toggleAddressModal = () => {
    const { map: { addressModal } } = this.props;
    this.props.addressVisibleModal(!addressModal);
  };

  watchID = null;

  isActiveSceneIs = (name = 'preorder') => this.props.activeScene === AVAILABLE_MAP_SCENES[name];

  handleDateChange = (date) => {
    this.setState({ date });
  };

  handleDateSubmit = () => {
    const { date } = this.state;
    this.togglePickerModal();
    this.props.changeFields({
      scheduledType: 'later',
      scheduledAt: Platform.OS === 'ios' ? moment(date) : date
    });
    this.goToRequestVehicles();
  };

  goToRequestVehicles = () => {
    if (!this.shouldRequestVehicles()) return;
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
    return every(stops, stop => typeof stop.address.countryCode !== 'undefined');
  };

  isPassengerPresent = () => {
    const { map: { fields } } = this.props;
    return this.getPassenger() ||
      (fields.passengerName && fields.passengerPhone);
  };

  destinationFields = () => {
    const { map: { fields: { destinationAddress } } } = this.props;
    return {
      toPostalCode: destinationAddress.postalCode,
      toLat: destinationAddress.lat,
      toLng: destinationAddress.lng,
      toLine: destinationAddress.line,
      toCountryCode: destinationAddress.countryCode,
      toPlaceId: destinationAddress.placeId
    };
  };

  requestVehicles = () => {
    const {
      passengerName,
      passengerPhone,
      passengerId,
      pickupAddress,
      scheduledAt,
      scheduledType,
      paymentMethod,
      paymentCardId,
      stops
    } = this.props.map.fields;
    const passenger = this.getPassenger();

    this.props.getVehicles({
      fromPostalCode: pickupAddress.postalCode,
      fromLat: pickupAddress.lat,
      fromLng: pickupAddress.lng,
      fromLine: pickupAddress.line,
      fromCountryCode: pickupAddress.countryCode,
      fromTimezone: pickupAddress.timezone,
      fromPlaceId: pickupAddress.placeId,
      ...this.destinationFields(),
      scheduledAt: scheduledType === 'now' ? null : scheduledAt.format(),
      passengerName: passenger ? `${passenger.firstName} ${passenger.lastName}` : passengerName,
      passengerPhone: passenger ? passenger.phone : passengerPhone,
      passengerId,
      paymentMethod,
      paymentCardId,
      scheduledType,
      stops
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

  handleHideHeader = () => {
    this.setState({ isHeaderEnable: false });
  };

  handleShowHeader = () => {
    this.setState({ isHeaderEnable: true });
  };

  goToSettings = () => {
    this.props.navigation.navigate('Settings', {});
  };

  goToOrders = () => {
    this.props.navigation.navigate('OrdersView', {});
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
  };

  showAlert = () => {
    this.alert.show();
  };

  cancelOrderCreation = () => {
    showConfirmationAlert({ title: strings('order.cancelOrderCreation'), handler: this.clearFields });
  };

  renderTimeDatePicker() {
    const { date } = this.state;
    const { bookings: { modals: { picker } } } = this.props;
    const momentDate = moment(date);

    const openDatePickerAndroid = async () => {
      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          date,
          minDate: new Date()
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          this.handleDateChange(momentDate.set({ year, month, date: day }).toDate());
        }
      } catch ({ code, message }) {
        // eslint-disable-next-line no-console
        console.warn('Cannot open date picker', message);
      }
    };

    const openTimePickerAndroid = async () => {
      try {
        const { action, hour, minute } = await TimePickerAndroid.open({
          hour: momentDate.get('hour'),
          minute: momentDate.get('minute'),
          is24Hour: true
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          this.handleDateChange(momentDate.set({ hour, minute }).toDate());
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
      const time = <Text style={styles.time}>{momentDate.format('H:mm')}</Text>;
      const date = <Text style={styles.date}>{momentDate.format('dddd, MMMM D, YYYY')}</Text>;

      return (
        <View style={styles.selectedWrapper}>
          {renderSelectedValue(date, openDatePickerAndroid, <Icon size={20} name="editAndroid" />)}
          {renderSelectedValue(time, openTimePickerAndroid, <Icon style={styles.TDEditIcon} name="editAndroid" />)}
        </View>
      );
    };

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
            minimumDate={new Date()}
          />
        </View>
        }
        <Button raised={false} style={styles.TDButton} onPress={this.handleDateSubmit}>
          <Text style={styles.TDButtonText}>Set the Time</Text>
        </Button>
      </Modal>
    );
  }

  render() {
    const isPreordered = this.isActiveSceneIs('preorder');
    const isActiveOrder = this.isActiveSceneIs('activeOrder');

    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        {this.state.isHeaderEnable &&
        <Header
          customStyles={[styles.header]}
          leftButton={
            !this.shouldRequestVehicles() || isActiveOrder ? (
              <NavImageButton
                onClick={this.goToSettings}
                styleContainer={{ justifyContent: 'center' }}
                icon={<Icon size={30} name="burger" color="#000" />}
              />
            ) : (
              <NavImageButton
                onClick={this.cancelOrderCreation}
                styleContainer={styles.headerBack}
                icon={<Icon width={10} height={18} name="back" color="#284784" />}
              />
            )
          }
          rightButton={
            <Button
              style={styles.orderBtn}
              raised={false}
              size="sm"
              onPress={this.goToOrders}
            >
              <Text style={styles.orderBtnText}>Orders</Text>
            </Button>
          }
        />
        }
        {isPreordered ?
          <BookingEditor
            navigation={this.props.navigation}
            passenger={this.getPassenger()}
            toggleModal={this.toggleAddressModal}
            requestVehicles={this.goToRequestVehicles}
          /> : null
        }
        {isPreordered ?
          <BookingFooter
            navigation={this.props.navigation}
            getCurrentPosition={this.getCurrentPosition}
            passenger={this.getPassenger()}
            toggleModal={this.toggleAddressModal}
            requestVehicles={this.goToRequestVehicles}
            toOrder={this.shouldRequestVehicles()}
          /> : null
        }

        {isActiveOrder && <ActiveOrderScene />}

        <MapView isActiveOrder={isActiveOrder} />

        {this.renderTimeDatePicker()}

        {isActiveOrder && ACTIVE_DRIVER_STATUSES.includes(this.props.status) &&
          <OrderDetailsPanel
            onActivate = {this.handleHideHeader}
            onClose = {this.handleShowHeader}
            visible = {!this.state.isHeaderEnable}
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
  addAddressPoint: PropTypes.func.isRequired,
  changeAddressType: PropTypes.func.isRequired,
  changeAddress: PropTypes.func.isRequired,
  addressVisibleModal: PropTypes.func.isRequired,
  initialRegionPosition: PropTypes.func.isRequired,
  changePosition: PropTypes.func.isRequired,
  errorPosition: PropTypes.func.isRequired,
  geocodeEmpty: PropTypes.func.isRequired,
  geocode: PropTypes.func.isRequired,
  toggleVisibleModal: PropTypes.func.isRequired,
  requestPermissions: PropTypes.func.isRequired
};

Map.defaultProps = {
};

const mapState = ({ app, ui, bookings, session }) => ({
  app,
  map: ui.map,
  session,
  activeScene: ui.navigation.activeScene,
  bookings,
  status: (bookings.orderState || {}).status || 'connected',
  canceledByExternal: bookings.canceledByExternal,
  canceledByUser: bookings.canceledByUser
});

const mapDispatch = {
  removeFields,
  changeFields,
  addAddressPoint,
  changeAddressType,
  changeAddress,
  addressVisibleModal,
  initialRegionPosition,
  changePosition,
  errorPosition,
  geocodeEmpty,
  geocode,
  createBooking,
  getVehicles,
  toggleVisibleModal,
  completeOrder,
  cancelOrder,
  requestPermissions
};

export default connect(mapState, mapDispatch)(Map);
