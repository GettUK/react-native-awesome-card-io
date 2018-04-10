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
import { every, find, first, has, isEmpty } from 'lodash';

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
  changePosition,
  errorPosition
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
import { showConfirmationAlert } from 'utils';
import PN from 'utils/notifications';

import ActiveOrderScene from './ActiveOrderScene';
import CompletedOrderScene from './CompletedOrderScene';
import OrderDetailsPanel from './ActiveOrderScene/OrderDetailsPanel';

import MapView from './MapView';

import styles from './style';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      isHeaderEnable: true,
      fromOrderList: false
    };
  }

  componentWillMount() {
    this.props.requestLocation();
  }

  componentDidMount() {
    this.getCurrentPosition();
    this.watchPosition();

    PN.addNotificationListener({ userToken: this.props.session.token, navigator: this.props.navigation });
  }

  componentWillReceiveProps({ app: { statuses }, canceledByUser }) {
    const {
      app: { statuses: statusesProps },
      canceledByUser: canceledByUserProps
    } = this.props;

    if (
      statuses.permissions && statusesProps.permissions &&
      statuses.permissions.location !== statusesProps.permissions.location &&
      statuses.permissions.location === PERMISSION_STATUS.authorized
    ) {
      this.props.checkMultiplePermissions(['location']).then(({ location }) => {
        if (location === PERMISSION_STATUS.authorized) {
          this.getCurrentPosition();
          this.watchPosition();
        }
      });
    }

    if (canceledByUser && !canceledByUserProps) {
      this.showAlert();
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
          this.mapView.wrappedInstance.animateToRegion({
            latitude: parseFloat(position.coords.latitude),
            longitude: parseFloat(position.coords.longitude)
          });
          this.props.changePosition(position);
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
    const {
      map: { fields: { passengerId } },
      bookings: { formData: { passenger, passengers } },
      passenger: { data: { passenger: passengerData, favoriteAddresses } }
    } = this.props;

    return (!isEmpty(passengerData) && { ...passengerData, favoriteAddresses })
      || passenger
      || find(passengers, { id: +passengerId });
  };

  toggleAddressModal = () => {
    const { map: { addressModal } } = this.props;
    this.props.addressVisibleModal(!addressModal);
  };

  watchID = null;

  isActiveSceneIs = (name = 'preOrder') => this.props.activeScene === AVAILABLE_MAP_SCENES[name];

  handleDateChange = (date) => {
    this.setState({ date });
  };

  handleDateSubmit = () => {
    const { date } = this.state;
    this.togglePickerModal();
    this.props.changeFields({
      scheduledType: 'later',
      scheduledAt: moment(date)
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
    return every(stops, stop => typeof stop.address.countryCode !== 'undefined');
  };

  isPassengerPresent = () => {
    const { map: { fields } } = this.props;
    return !!fields.passengerId;
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
      paymentType,
      paymentCardId,
      stops
    } = this.props.map.fields;
    const passenger = this.getPassenger();

    let scheduledAtTime = null;
    if (scheduledType === 'later') {
      scheduledAtTime = scheduledAt.format();
    }

    this.props.getVehicles({
      fromPostalCode: pickupAddress.postalCode,
      fromLat: pickupAddress.lat,
      fromLng: pickupAddress.lng,
      fromLine: pickupAddress.line,
      fromCountryCode: pickupAddress.countryCode,
      fromTimezone: pickupAddress.timezone,
      fromPlaceId: pickupAddress.placeId,
      ...this.destinationFields(),
      scheduledAt: scheduledAtTime,
      passengerName: passenger ? `${passenger.firstName} ${passenger.lastName}` : passengerName,
      passengerPhone: passenger ? passenger.phone : passengerPhone,
      passengerId,
      paymentMethod,
      paymentType,
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

  handleBackFromOrderList = () => {
    this.setState({ fromOrderList: true });
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
    this.props.navigation.navigate('OrdersView', { onBack: this.handleBackFromOrderList });
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

  handleBackBtnPress = () => {
    const isPreOrder = this.isActiveSceneIs('preOrder');
    const { clearCurrentOrder } = this.props;

    if (isPreOrder) {
      this.cancelOrderCreation();
    } else if (this.state.fromOrderList) {
      this.goToOrders();
      setTimeout(clearCurrentOrder); // needed for smooth navigation animation

      this.getCurrentPosition();

      this.setState({ fromOrderList: false });
    } else {
      this.goToInitialization();
    }
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
        <Button raised={false} styleContent={styles.TDButton} onPress={this.handleDateSubmit}>
          <Text style={styles.TDButtonText}>Set the Time</Text>
        </Button>
      </Modal>
    );
  }

  render() {
    const { navigation } = this.props;
    const isPreOrder = this.isActiveSceneIs('preOrder');
    const isActiveOrder = this.isActiveSceneIs('activeOrder');
    const isCompletedOrder = this.isActiveSceneIs('completedOrder');

    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        {this.state.isHeaderEnable &&
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
            toggleModal={this.toggleAddressModal}
            requestVehicles={this.goToRequestVehicles}
          />
        }
        {isPreOrder &&
          <BookingFooter
            navigation={navigation}
            getCurrentPosition={this.getCurrentPosition}
            passenger={this.getPassenger()}
            toggleModal={this.toggleAddressModal}
            requestVehicles={this.goToRequestVehicles}
            toOrder={this.shouldRequestVehicles()}
          />
        }

        {isActiveOrder && <ActiveOrderScene />}
        {isCompletedOrder && <CompletedOrderScene />}

        <MapView
          isActiveOrder={isActiveOrder}
          isCompletedOrder={isCompletedOrder}
          isCurrentOrder={this.state.fromOrderList}
          ref={(map) => { this.mapView = map; }}
        />

        {this.renderTimeDatePicker()}

        {(isActiveOrder || isCompletedOrder) &&
          <OrderDetailsPanel
            navigation={navigation}
            onActivate={this.handleHideHeader}
            onClose={this.handleShowHeader}
            visible={!this.state.isHeaderEnable}
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
  changePosition: PropTypes.func.isRequired,
  errorPosition: PropTypes.func.isRequired,
  toggleVisibleModal: PropTypes.func.isRequired,
  checkMultiplePermissions: PropTypes.func.isRequired,
  requestLocation: PropTypes.func.isRequired
};

Map.defaultProps = {
};

const mapState = ({ app, ui, bookings, session, passenger }) => ({
  app,
  map: ui.map,
  session,
  activeScene: ui.navigation.activeScene,
  bookings,
  status: bookings.currentOrder.status || 'connected',
  canceledByExternal: bookings.canceledByExternal,
  canceledByUser: bookings.canceledByUser,
  passenger
});

const mapDispatch = {
  removeFields,
  changeFields,
  addAddressPoint,
  changeAddressType,
  changeAddress,
  addressVisibleModal,
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
  clearCurrentOrder
};

export default connect(mapState, mapDispatch)(Map);
