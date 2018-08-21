import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback, ActivityIndicator, Dimensions } from 'react-native';
import moment from 'moment-timezone';
import { isEmpty, find, first, pickBy, isNull, isEqual, isUndefined } from 'lodash';

import {
  PointList,
  AddressModal,
  StopPointsModal,
  Icon,
  Divider,
  InformView,
  CardsPopup,
  Alert,
  Button
} from 'components';
import { FlightModal } from 'containers/FlightSettings';

import {
  paymentTypeToAttrs,
  isCashAllowed,
  paymentTypeLabels,
  isEqualAddress
} from 'containers/shared/bookings/data';

import { strings } from 'locales';

import { color } from 'theme';

import { throttledAction, isEnoughOrderData } from 'utils';

import { LoaderLayer, PickUpTime, AvailableCars } from './components';

import { prepareDefaultValues } from './utils';
import styles from './styles';

const CAR_BLOCK_WIDTH = 120;
const { width } = Dimensions.get('window');

export default class BookingController extends Component {
  state = {
    loadBookingRequested: false,
    isStopPointsModalVisible: false,
    message: '',
    isFocused: this.props.navigation ? this.props.navigation.isFocused() : false
  };

  componentDidMount() {
    const { navigation } = this.props;

    this.subscriptions = [
      navigation.addListener('didFocus', () => this.setState({ isFocused: true })),
      navigation.addListener('willBlur', () => this.setState({ isFocused: false }))
    ];
    this.updateAvailableCarsScroll();
  }

  componentDidUpdate({ booking: { bookingForm: { availableCarsScroll } } }) {
    if (!this.state.isFocused && availableCarsScroll !== this.props.booking.bookingForm.availableCarsScroll) {
      this.updateAvailableCarsScroll();
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach(sub => sub.remove());
  }

  getOrder() {
    const { booking, orderType } = this.props;
    const { currentOrder, bookingForm } = booking;

    return booking[orderType] || (currentOrder.id ? currentOrder : bookingForm);
  }

  updateAvailableCarsScroll(value, animated = false) {
    if (!this.availableCars) return;

    if (value && this.getAvailableCarsWidth() < value + (CAR_BLOCK_WIDTH * 3)) {
      this.availableCars.scrollToEnd({ animated });
    } else {
      this.availableCars.scrollTo({
        x: isUndefined(value) ? this.props.booking.bookingForm.availableCarsScroll : value,
        animated
      });
    }
  }

  getAvailableCarsScrollShift(vehicle) {
    return this.getAvailableCarsWidth() > width
      ? this.getAvailableVehicles().findIndex(v => v.name === vehicle) * CAR_BLOCK_WIDTH
      : 0;
  }

  getAvailableCarsWidth = () => this.getAvailableVehicles().length * CAR_BLOCK_WIDTH;

  goTo = (page) => {
    this.props.navigation.navigate(page);
  };

  getAvailableVehicles = () => {
    const { booking: { vehicles } } = this.props;
    return ((vehicles && vehicles.data) || []).filter(v => v.available && v.name !== 'Porsche');
  };

  shouldRequestVehicles = () => {
    const { booking: { bookingForm } } = this.props;

    return isEnoughOrderData(bookingForm);
  };

  requestVehiclesOnOrderChange = (bookingFormProps) => {
    const { booking: { vehicles, bookingForm } } = this.props;
    const { isStopPointsModalVisible } = this.state;
    const isDriveChanged = (!vehicles.loaded && !vehicles.loading) ||
      !isEqual(bookingForm.stops, bookingFormProps.stops) ||
      !isEqual(bookingForm.pickupAddress, bookingFormProps.pickupAddress) ||
      !isEqual(bookingForm.destinationAddress, bookingFormProps.destinationAddress) ||
      !isEqual(bookingForm.paymentMethod, bookingFormProps.paymentMethod);

    if (!isStopPointsModalVisible && isDriveChanged) {
      this.requestVehicles();
    }
  }

  requestVehicles = () => {
    if (!this.shouldRequestVehicles()) return;

    this.props.getPassengerData();

    this.getVehicles();
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

  getVehicles = () => {
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
    } = this.props.booking.bookingForm;
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
      this.updateAvailableCarsScroll(this.getAvailableCarsScrollShift(vehicle.name), true);

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

  isPathContainAirport = () => {
    const { booking: { bookingForm: { pickupAddress, destinationAddress, stops, flight } } } = this.props;

    const airports = [
      pickupAddress.airport,
      ...(stops || []).filter(stop => stop.airport),
      destinationAddress.airport
    ];

    return airports.find(Boolean) && !flight;
  };

  handleBookingCreation = throttledAction(() => {
    if (this.isPathContainAirport()) {
      return this.showFlightModal();
    }

    return this.createBooking();
  });

  showFlightModal = () => {
    this.setState({ flightModal: true });
  };

  hideFlightModal = () => {
    this.setState({ flightModal: false });
  };

  setAirport = () => {
    const { booking: { tempFlight }, saveFlight } = this.props;

    saveFlight();

    this.createBooking(tempFlight);
  };

  areAddressesUnique() {
    const { booking: { bookingForm: { pickupAddress, stops, destinationAddress } } } = this.props;
    const addresses = [pickupAddress, ...(stops || []), destinationAddress];

    let unique = true;

    addresses.forEach((address, index) => {
      const previous = index ? addresses[index - 1] : null;

      if (isEqualAddress(address, previous)) {
        unique = false;
      }
    });

    if (!unique) {
      const message = 'Path contains duplications of points. Please, check all addresses.';

      this.setState({ message }, () => this.alert.show());
    }

    return unique;
  }

  displayErrorAlert = () => {
    const { booking: { bookingForm } } = this.props;
    if (bookingForm.bookerReferencesErrors) {
      this.setState({ message: strings('alert.message.reference') }, () => this.alert.show());
    }
    if (!bookingForm.paymentMethod) {
      this.cardsPopup.open();
    }
  };

  showErrorFor = (type) => {
    const { booking: { orderCreateError: { response: { data } } } } = this.props;
    if (data.errors && data.errors[type]) {
      this.setState({ message: strings(`alert.message.${type}`) }, () => this.alert.show());
    }
  };

  showAlert = () => {
    const { booking: { orderCreateError: { response: { data } } }, setReferenceErrors } = this.props;

    this.showErrorFor('scheduledAt');

    this.showErrorFor('paymentMethod');

    if (data.errors) {
      const referenceErrors = pickBy(data.errors, (_, key) => key.startsWith('bookerReferences'));
      if (!isEmpty(referenceErrors)) {
        setReferenceErrors(referenceErrors);
        this.setState({ message: strings('alert.message.reference') }, () => this.alert.show());
      }

      this.hideFlightModal();
    }
  };

  shouldOrderRide = () => {
    const { booking: { bookingForm } } = this.props;

    return this.shouldRequestVehicles() && bookingForm.vehicleName && !isNull(bookingForm.vehiclePrice);
  };

  createBooking = async ({ flight = '' } = {}) => {
    const { booking: { bookingForm }, createBooking, validateReferences, navigation } = this.props;

    if (this.areAddressesUnique()) {
      const order = {
        ...bookingForm,
        scheduledAt: bookingForm.scheduledType === 'later' ? bookingForm.scheduledAt.format() : null,
        stops: bookingForm.stops
          ? bookingForm.stops.map(stop => ({
            address: stop,
            name: bookingForm.passengerName,
            passengerId: bookingForm.passengerId,
            phone: bookingForm.passengerPhone
          }))
          : null,
        flight: bookingForm.flight || flight
      };

      this.hideFlightModal();

      if (isEmpty(await validateReferences()) && bookingForm.paymentMethod) {
        createBooking(order)
          .then(() => navigation.goBack(null))
          .catch(this.showAlert);
      } else {
        this.displayErrorAlert();
      }
    }
  };

  openAddressModal = (address, meta) => {
    this.addressModal.open(address, meta);
  };

  handleEditPoint = (address, meta) => {
    this.setState({ isStopPointsModalVisible: false }, () => {
      setTimeout(() => this.openAddressModal(address, meta), 500);
    });
  };

  handleAddStop = () => {
    this.handleEditPoint(null, { type: 'stops' });
  };

  showStopPointsModal = () => {
    this.setState({ isStopPointsModalVisible: true });
  };

  hideStopPointsModal = () => {
    this.setState({ isStopPointsModalVisible: false });
  };

  prepareStopsData = () => {
    const { booking: { bookingForm: { destinationAddress, stops } } } = this.props;

    const stopsObject = (stops || []).reduce((stop, item, index) => ({
      ...stop,
      [`stop${index}`]: item
    }), {});

    return {
      ...stopsObject,
      [`stop${(stops || []).length}`]: destinationAddress
    };
  };

  onChangeAddress = (address, meta) => {
    const { booking, changeAddress, changeFields } = this.props;

    if (meta.type === 'pickupAddress' && address.countryCode !== 'GB' && booking.bookingForm.stops) {
      changeFields({ stops: [] });
    }

    changeAddress(address, meta);
  };

  getEarliestAvailableTime = (vehicle) => {
    const { booking: { bookingForm: { vehicleName }, vehicles: { data } } } = this.props;
    let shift = 60;

    if (!vehicle) {
      // eslint-disable-next-line no-param-reassign
      vehicle = find(data, { name: vehicleName });
    }

    if (vehicle) {
      shift = vehicle.earliestAvailableIn;
    }

    return moment().add(shift, 'minutes');
  };

  selectVehicle = (vehicleName) => {
    const {
      booking: { vehicles, bookingForm: { scheduledType, scheduledAt, paymentType } },
      changeFields
    } = this.props;
    const vehicle = vehicles.data.find(v => (v.available && v.name === vehicleName));

    if (!vehicle) return;

    let attrs = {
      quoteId: vehicle.quoteId,
      vehicleName: vehicle.name,
      vehicleValue: vehicle.value,
      vehiclePrice: vehicle.price
    };

    if (scheduledType !== 'now') {
      const selected = scheduledAt;
      const available = this.getEarliestAvailableTime(vehicle);

      if (selected.isBefore(available)) {
        attrs.scheduledAt = available;
      }
    }

    if (paymentType === 'cash' && !isCashAllowed(vehicleName)) {
      attrs = { ...attrs, ...paymentTypeToAttrs('account') };
      this.requestVehicles();
    }
    changeFields(attrs);
  };

  handleAvailableCarsScroll = (e) => {
    const { saveAvailableCarsScroll } = this.props;
    if (this.state.isFocused) {
      saveAvailableCarsScroll(e.nativeEvent.contentOffset.x);
    }
  };

  getReasonsName = (id) => {
    const { booking: { formData: { travelReasons } } } = this.props;
    return ((travelReasons && travelReasons.find(r => r.id === +id)) || { name: strings('booking.label.other') }).name;
  };

  renderNoVehiclesMessage = () => (
    <InformView style={[styles.footerOrderInfo, { backgroundColor: this.props.theme.color.bgPrimary }]}>
      <Text style={[styles.informText, { color: this.props.theme.color.primaryText }]}>
        {strings('information.notVehicles')}
      </Text>
    </InformView>
  );

  renderDetailItem = ({ title, value, icon, onPress, chevron = true, error }, i, arr) => (
    <View key={title} style={styles.listOption}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.row}>
          {icon && <Icon name={icon} color={color.pixelLine} />}
          {!value && error && <View style={styles.errorDot} />}

          <View style={[styles.titleContainer, icon ? styles.iconGap : {}]}>
            <Text style={[styles.title, value ? {} : styles.emptyValueTitle]}>{title}</Text>
            {!!value &&
              <Text
                style={[
                  styles.value,
                  { color: this.props.navigation.state.params.theme.color.primaryText },
                  error ? styles.valueWithError : {}
                ]}
                numberOfLines={1}
              >
                {value}
              </Text>
            }
          </View>

          {chevron && <Icon name="chevron" color={color.pixelLine} width={10} />}
        </View>
      </TouchableWithoutFeedback>
      {arr && i + 1 < arr.length && <Divider style={styles.divider} />}
    </View>
  );

  getAdditionalDetailsItems() {
    const order = this.getOrder();

    return [
      {
        title: 'Order for',
        value: order.passengerName,
        icon: 'avatar',
        onPress: () => this.goTo('PassengersList')
      },
      { title: 'Message for driver',
        value: order.message,
        icon: 'message',
        onPress: () => this.goTo('MessageToDriver')
      },
      { title: 'Trip reason',
        value: this.getReasonsName(order.travelReasonId),
        icon: 'rides',
        onPress: () => this.goTo('ReasonForTravel')
      },
      { title: 'Payment method',
        value: paymentTypeLabels[order.paymentMethod],
        icon: 'paymentMethod',
        onPress: () => this.goTo('PaymentsOptions')
      },
      {
        title: 'Flight number',
        value: order.flight,
        icon: 'flight',
        onPress: () => this.goTo('FlightSettings')
      }
    ];
  }

  renderAdditionalDetails(style) {
    return (
      <View style={style}>
        {this.getAdditionalDetailsItems().map(this.renderDetailItem)}
      </View>
    );
  }

  renderAvailableCars() {
    return (
      <AvailableCars
        booking={this.getOrder()}
        availableVehicles={this.getAvailableVehicles()}
        onCarSelect={this.selectVehicle}
        onScroll={this.handleAvailableCarsScroll}
        scrollRef={(el) => { this.availableCars = el; }}
      />
    );
  }

  renderPointList({ style, onLayout = () => {} } = {}) {
    const order = this.getOrder();
    return (
      <PointList
        onLayout={onLayout}
        onAddressPress={this.openAddressModal}
        onStopAdd={this.showStopPointsModal}
        data={order}
        allowEmptyDestination
        style={style}
      />
    );
  }

  renderPickUpTime(style) {
    const order = this.getOrder();
    return (
      <PickUpTime
        booking={order}
        wrapperStyle={style}
        requestVehicles={this.requestVehicles}
      />
    );
  }

  renderBookingBtn = ({ style, disabled, loading, title, onPress }) => (
    <Button
      style={style}
      styleContent={[styles.bookingBtnView, disabled ? styles.bookingBtnDisabled : {}]}
      disabled={disabled}
      disabledStyle={{ backgroundColor: this.props.theme.color.bgSettings }}
      onPress={onPress}
    >
      {loading && <ActivityIndicator style={styles.bookingBtnLoading} size="small" color={color.arrowRight} />}
      <Text style={[styles.bookingBtnText, disabled ? styles.bookingBtnTextDisabled : {}]}>{title}</Text>
    </Button>
  );

  renderStopPointsModal = () => {
    const { changeFields } = this.props;
    const { isStopPointsModalVisible } = this.state;

    return (
      <StopPointsModal
        data={this.prepareStopsData()}
        isVisible={isStopPointsModalVisible}
        onAddPoint={this.handleAddStop}
        onEditAddress={this.handleEditPoint}
        onRowMoved={this.requestVehicles}
        onChangeAddress={changeFields}
        onClose={this.hideStopPointsModal}
      />
    );
  }

  render(content) {
    const { booking: { vehicles }, navigation } = this.props;
    const { message, flightModal } = this.state;

    return (
      <Fragment>
        {content.call(this)}

        {vehicles.loading && <LoaderLayer loading={vehicles.loading} />}
        <AddressModal
          innerRef={(el) => { this.addressModal = el; }}
          defaultValues={prepareDefaultValues(this.getPassenger())}
          onChange={this.onChangeAddress}
        />
        {this.renderStopPointsModal()}

        <Alert
          ref={(alert) => { this.alert = alert; }}
          message={message}
          type="failed"
          position="bottom"
        />
        <FlightModal
          navigation={navigation}
          isVisible={flightModal}
          onClose={this.createBooking}
          onSubmit={this.setAirport}
        />
        <CardsPopup innerRef={(popup) => { this.cardsPopup = popup; }} />
      </Fragment>
    );
  }
}

BookingController.propTypes = {
  navigation: PropTypes.object,
  booking: PropTypes.object,
  passenger: PropTypes.object,
  getPassengerData: PropTypes.func,
  getVehicles: PropTypes.func,
  changeFields: PropTypes.func,
  changeAddress: PropTypes.func,
  setReferenceErrors: PropTypes.func,
  saveFlight: PropTypes.func,
  createBooking: PropTypes.func,
  validateReferences: PropTypes.func
};
