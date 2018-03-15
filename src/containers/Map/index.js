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
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {every, find, first, has} from 'lodash';
import { Icon, Button, DismissKeyboardView, Modal, DropdownAlert } from 'components';
import { BookingEditor, BookingFooter } from 'containers/BookingEditor';
import NavImageButton from 'components/Common/NavImageButton';
import Header from 'components/Common/Header';
import {
  removeFields,
  changeFields,
  addAddressPoint,
  changeAddressType,
  changeAddress,
  addressVisibleModal,
  initialRegionPosition,
  changeRegionPosition,
  changePosition,
  errorPosition
} from 'actions/ui/map';
import {
  createBooking,
  getVehicles,
  changeBookingDate,
  openSettingsModal,
  closeSettingsModal,
  completeOrder,
  cancelOrder
} from 'actions/booking';
import { geocodeEmpty, geocode } from 'actions/ui/geocode';
import { AVAILABLE_MAP_SCENES } from 'actions/ui/navigation';
import { nullAddress } from 'utils';
import { strings } from 'locales';
import moment from 'moment';

import { ACTIVE_DRIVER_STATUSES, COMPLETED_STATUS, CANCELLED_STATUS } from './ActiveOrderScene/consts';

import ActiveOrderScene from './ActiveOrderScene';
import OrderDetailsPanel from './ActiveOrderScene/OrderDetailsPanel';
import styles from './style';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      isHeaderEnable: true
    };
  }

  componentDidMount() {
    const { map: { options } } = this.props;

    setTimeout(() => {
      this.getCurrentPosition();
    }, 750);

    this.watchID = navigator.geolocation.watchPosition(
      this.props.changePosition,
      this.props.errorPosition,
      options
    );
  }

  componentWillReceiveProps({ status }) {
    const { navigation, cancelOrder, completeOrder, status: statusProps } = this.props;

    if (status !== statusProps && status === COMPLETED_STATUS) {
      navigation.navigate('RateDriver');

      this.clearFields();

      completeOrder();
    } else if (status !== statusProps && status === CANCELLED_STATUS) {
      // TODO: change view and component in OMA-68
      // this.dropdown.showErrorMessage('Order was cancelled');

      cancelOrder();
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getCurrentPosition = () => {
    const { map: { options } } = this.props;
    navigator.geolocation.getCurrentPosition(
      position => {
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
  };

  getAvailableVehicles = () => {
    const { bookingFormData: { vehicles } } = this.props;
    return (vehicles && vehicles.data || []).filter(vehicle => vehicle.available);
  };

  getPassenger = () => {
    const { map: { fields: { passengerId } }, bookingFormData: { passenger, passengers } } = this.props;
    return passenger || find(passengers, { id: +passengerId });
  };

  addPoint = name => {
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

  isActiveSceneIs = (name = 'preorder') => {
    return this.props.activeScene === AVAILABLE_MAP_SCENES[name];
  };

  goToMessageToDriver = () => {
    this.props.closeSettingsModal();
    this.props.navigation.navigate('MessageToDriver');
  };

  goToTravelReasons = () => {
    this.props.closeSettingsModal();
    this.props.navigation.navigate('ReasonForTravel');
  };

  handleDateChange = date => {
    this.setState({ date });
  };

  handleDateSubmit = () => {
    this.props.changeBookingDate(this.state.date);
  };

  toRequestVehicles = () => {
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

  clearFields = () => {
    this.props.removeFields([
      'stops', 'destinationAddress',
      'vehiclePrice', 'vehicleValue', 'vehicleName'
    ]);
  };

  renderTimeDatePicker() {
    const { date } = this.state;
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
        isVisible={false}
        backdropColor="#284784"
        backdropOpacity={0.6}
      >
        <DismissKeyboardView style={styles.TDModal}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={this.toggleAddressModal}>
              <Text style={styles.closeModalText}>
                {strings('map.label.close')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.flex}>
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
          </View>
        </DismissKeyboardView>
      </Modal>
    );
  }

  renderSettings() {
    const { newBooking, bookingFormData: { travelReasons }, bookingMeta: { isSettingsModalOpened }, closeSettingsModal } = this.props;

    const renderMenuItem = (title, value, handler) => (
      <TouchableOpacity activeOpacity={0.6} style={styles.settingsMenuItem} onPress={handler}>
        <Text style={[styles.flex, styles.settingsMenuItemTitle]}>{title}</Text>
        <Text style={[styles.flex, styles.settingsMenuSelectedValue]} numberOfLines={1}>{value}</Text>
        <Icon name="chevron" size={16} color="#c7c7cc" />
      </TouchableOpacity>
    );

    const getReasonsName = (id) => (travelReasons && travelReasons.find(r => r.id === id) || {}).name;

    return (
      <Modal isVisible={isSettingsModalOpened} contentStyles={styles.settingsModal} onClose={closeSettingsModal}>
        {renderMenuItem('Message to driver', newBooking.messageToDriver, this.goToMessageToDriver)}
        <View style={styles.settingsMenuSeparator} />
        {renderMenuItem('Reasons for travel', getReasonsName(newBooking.travelReason), this.goToTravelReasons)}
      </Modal>
    );
  }

  render() {
    const { map: { currentPosition, regionPosition } } = this.props;

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
                onClick={this.clearFields}
                styleContainer={styles.headerBack}
                icon={<Icon width={10} height={18} name="back" color="rgb(40, 71, 132)" />}
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
            requestVehicles={this.toRequestVehicles}
          /> : null
        }
        {isPreordered ?
          <BookingFooter
            navigation={this.props.navigation}
            getCurrentPosition={this.getCurrentPosition}
            passenger={this.getPassenger()}
            toggleModal={this.toggleAddressModal}
            requestVehicles={this.toRequestVehicles}
            toOrder={this.shouldRequestVehicles()}
          /> : null
        }

        {isActiveOrder && <ActiveOrderScene />}

        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          zoomEnabled
          onRegionChangeComplete={this.props.changeRegionPosition}
          region={regionPosition}>
          {!isActiveOrder && <MapView.Marker coordinate={currentPosition} />}
        </MapView>
        {this.renderTimeDatePicker()}
        {this.renderSettings()}

        {isActiveOrder && ACTIVE_DRIVER_STATUSES.includes(this.props.status) &&
          <OrderDetailsPanel
            onActivate = {this.handleHideHeader}
            onClose = {this.handleShowHeader}
            visible = {!this.state.isHeaderEnable}
          />
        }

        <DropdownAlert
          type='error'
          ref={el => (this.dropdown = el)}
          position='bottom'
        />
      </View>
    );
  }
}

Map.propTypes = {
  navigation: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  bookingFormData: PropTypes.object.isRequired,
  getVehicles: PropTypes.func.isRequired,
  removeFields: PropTypes.func.isRequired,
  changeFields: PropTypes.func.isRequired,
  addAddressPoint: PropTypes.func.isRequired,
  changeAddressType: PropTypes.func.isRequired,
  changeAddress: PropTypes.func.isRequired,
  addressVisibleModal: PropTypes.func.isRequired,
  initialRegionPosition: PropTypes.func.isRequired,
  changeRegionPosition: PropTypes.func.isRequired,
  changePosition: PropTypes.func.isRequired,
  errorPosition: PropTypes.func.isRequired,
  geocodeEmpty: PropTypes.func.isRequired,
  geocode: PropTypes.func.isRequired,
  changeBookingDate: PropTypes.func.isRequired
};

Map.defaultProps = {
};

const mapState = ({ ui, bookings }) => ({
  map: ui.map,
  activeScene: ui.navigation.activeScene,
  newBooking: bookings.new,
  bookingFormData: bookings.formData,
  bookingMeta: bookings.meta,
  status: (bookings.orderState || {}).status || 'connected'
});

const mapDispatch = {
  removeFields,
  changeFields,
  addAddressPoint,
  changeAddressType,
  changeAddress,
  addressVisibleModal,
  initialRegionPosition,
  changeRegionPosition,
  changePosition,
  errorPosition,
  geocodeEmpty,
  geocode,
  changeBookingDate,
  createBooking,
  getVehicles,
  openSettingsModal,
  closeSettingsModal,
  completeOrder,
  cancelOrder
};

export default connect(mapState, mapDispatch)(Map);
