import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import moment from 'moment-timezone';
import { has, find, isNull, pickBy, isEmpty } from 'lodash';
import { Icon, Button, Modal, JourneyDetails, CarItem, InformView, Alert } from 'components';
import { hourForward } from 'utils';
import { strings } from 'locales';
import { changeFields, changeAddress, setReferenceErrors } from 'actions/ui/map';
import { createBooking, toggleVisibleModal } from 'actions/booking';
import {
  paymentTypeToAttrs,
  vehiclesData,
  isCashAllowed,
  paymentTypeLabels
} from 'containers/shared/bookings/data';
import { LoaderLayer } from './components';

import styles from './style';

class BookingFooter extends PureComponent {
  state = {
    message: ''
  };

  getEarliestAvailableTime = (vehicle) => {
    const { map: { fields: { vehicleName } } } = this.props;
    let shift = 60;

    if (!vehicle) {
      const { vehicles: { data } } = this.props.data.formData;
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
      map: { fields: { scheduledType, scheduledAt, paymentType } },
      data: { formData: { vehicles } }
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
      this.props.requestVehicles();
    }
    this.props.changeFields(attrs);
  };

  shouldOrderRide = () => {
    const { map: { fields } } = this.props;
    return (has(fields, 'pickupAddress') && fields.pickupAddress.countryCode) &&
      (has(fields, 'destinationAddress') && fields.destinationAddress.countryCode) &&
      (fields.passengerName && fields.passengerPhone) &&
      (fields.vehicleName && !isNull(fields.vehiclePrice));
  };

  goToMessageToDriver = () => {
    const { map: { fields: { message } } } = this.props;
    this.toggleSettingsModal();
    this.props.navigation.navigate('MessageToDriver', { message });
  };

  goToTravelReasons = () => {
    this.toggleSettingsModal();
    this.props.navigation.navigate('ReasonForTravel');
  };

  goToPaymentsList = () => {
    this.toggleSettingsModal();
    this.props.navigation.navigate('PaymentsOptions');
  };

  goToReferencesList = () => {
    this.toggleSettingsModal();
    this.props.navigation.navigate('References');
  };

  toggleSettingsModal = () => {
    this.props.toggleVisibleModal('settings');
  };

  handleCustomDestinationPress = () => {
    this.props.openAddressModal(null, { type: 'destinationAddress' });
  };

  renderAddressItem = (address, label) => {
    const handlerPress = () => this.props.changeAddress({ ...address, label }, { type: 'destinationAddress' });

    return (
      <Button
        key={address.id || label}
        onPress={handlerPress}
        styleContent={styles.destinationBtn}
        style={styles.padding}
      >
        <Text style={styles.customDestinationText}>{label}</Text>
      </Button>
    );
  };

  showAlert = () => {
    const { data: { orderCreateError: { response: { data } } }, setReferenceErrors } = this.props;

    if (data.errors && data.errors.scheduledAt) {
      this.setState({ message: 'Wrong pick-up time' }, () => this.alert.show());
    }

    if (data.errors) {
      const referenceErrors = pickBy(data.errors, (_, key) => key.startsWith('bookerReferences'));
      if (!isEmpty(referenceErrors)) {
        setReferenceErrors(referenceErrors);
        this.setState({ message: 'Please, fill required references' }, () => this.alert.show());
      }
    }
  };

  createBooking = () => {
    const { map: { fields }, createBooking } = this.props;

    const order = {
      ...fields,
      scheduledAt: fields.scheduledType === 'later' ? fields.scheduledAt.format() : null,
      stops: fields.stops
        ? fields.stops.map(stop => ({
          address: stop,
          name: fields.passengerName,
          passengerId: fields.passengerId, // TODO: add posibility to select another passenger for stop
          phone: fields.passengerPhone
        }))
        : null
    };

    createBooking(order)
      .catch(this.showAlert);
  };

  togglePickerModal = () => {
    const { toggleVisibleModal, onDateChange } = this.props;

    toggleVisibleModal('picker');
    onDateChange(hourForward());
  };

  renderAddressesSelector() {
    const { passenger } = this.props;

    return (
      <ScrollView
        horizontal
        contentContainerStyle={styles.destinationBtns}
        showsHorizontalScrollIndicator={false}
      >
        <Button
          onPress={this.handleCustomDestinationPress}
          styleContent={styles.destinationBtn}
          style={styles.padding}
        >
          <Icon
            style={styles.searchIcon}
            name="search"
            color="#284784"
            size={18}
          />
          <Text style={styles.selectDestinationText}>{strings('label.selectDestination')}</Text>
        </Button>
        {passenger && passenger.homeAddress &&
          this.renderAddressItem(passenger.homeAddress, strings('label.home'))
        }
        {passenger && passenger.workAddress &&
          this.renderAddressItem(passenger.workAddress, strings('label.work'))
        }
        {passenger && (passenger.favoriteAddresses || []).map(address =>
          this.renderAddressItem(address.address, address.name))
        }
      </ScrollView>
    );
  }

  renderSettings() {
    const { data: { formData: { travelReasons, bookingReferences }, modals: { settings } },
      map: { fields: { message, travelReasonId, paymentMethod, passengerName } } } = this.props;

    const renderMenuItem = (title, value, handler) => (
      <TouchableOpacity activeOpacity={0.6} style={styles.settingsMenuItem} onPress={handler}>
        <Text style={[styles.flex, styles.settingsMenuItemTitle]}>{title}</Text>
        <Text style={[styles.flex, styles.settingsMenuSelectedValue]} numberOfLines={1}>{value}</Text>
        <Icon name="chevron" size={16} color="#c7c7cc" />
      </TouchableOpacity>
    );

    const getReasonsName = id => ((travelReasons && travelReasons.find(r => r.id === +id)) || {}).name;

    return (
      <Modal isVisible={settings} contentStyles={styles.settingsModal} onClose={this.toggleSettingsModal}>
        {renderMenuItem('Order for', passengerName, () => {})}
        <View style={styles.settingsMenuSeparator} />
        {renderMenuItem('Message to driver', message, this.goToMessageToDriver)}
        <View style={styles.settingsMenuSeparator} />
        {renderMenuItem('Reasons for travel', getReasonsName(travelReasonId), this.goToTravelReasons)}
        <View style={styles.settingsMenuSeparator} />
        {renderMenuItem('Payment method', paymentTypeLabels[paymentMethod], this.goToPaymentsList)}
        <View style={styles.settingsMenuSeparator} />
        {renderMenuItem('Booking References', `${bookingReferences.length} References`, this.goToReferencesList)}
      </Modal>
    );
  }

  renderFooter() {
    const {
      map: { fields, currentPosition },
      data: { formData: { vehicles }, currentOrder: { busy } },
      toOrder,
      getCurrentPosition,
      isAuthorizedPermission
    } = this.props;

    const availableVehicles = vehicles.data.filter(v => v.available);
    const isOrderBtnDisabled = busy || vehicles.loading || !this.shouldOrderRide();

    return (
      <View style={styles.footer} pointerEvents="box-none">
        {
          toOrder && availableVehicles.length === 0 && (
            <InformView>
              <Text style={styles.informText}>{strings('information.notVehicles')}</Text>
            </InformView>
          )
        }
        {
          !toOrder && (
            <View pointerEvents="box-none">
              {isAuthorizedPermission('location') && !isNull(currentPosition) &&
                <Button
                  style={styles.currentPositionBtn}
                  styleContent={[styles.currentPositionBtnContent, styles.btnView]}
                  onPress={getCurrentPosition}
                >
                  <Icon name="myLocation" size={22} color="#284784" />
                </Button>
              }
              {this.renderAddressesSelector()}
            </View>
          )
        }
        {
          toOrder && availableVehicles.length > 0 && (
            <View pointerEvents="box-none">
              {this.renderSettings()}
              <JourneyDetails
                loading={vehicles.loading}
                style={styles.journeyDetails}
                time={vehicles.duration}
                distance={vehicles.distance}
              />
              {
                vehicles.loading ? (
                  <ActivityIndicator style={styles.carLoading} size="small" color="#d8d8d8" />
                ) : (
                  <ScrollView
                    horizontal
                    contentContainerStyle={styles.carItems}
                    showsHorizontalScrollIndicator={false}
                  >
                    {
                      availableVehicles.map((vehicle) => {
                        const vehicleData = vehiclesData[vehicle.name] || { label: 'Unknown' };
                        return (
                          <CarItem
                            onChange={this.selectVehicle}
                            key={vehicle.name}
                            name={vehicle.name}
                            eta={vehicle.eta}
                            label={vehicleData.label}
                            price={vehicle.price}
                            active={vehicle.name === fields.vehicleName}
                          />
                        );
                      })
                    }
                  </ScrollView>
                )
              }
              <View style={styles.rowActions}>
                <Button
                  style={styles.timeBtn}
                  styleContent={styles.btnView}
                  onPress={this.togglePickerModal}
                >
                  <Icon name="time" size={24} color="#d8d8d8" />
                </Button>
                <Button
                  style={styles.orderRideBtn}
                  styleContent={[styles.orderRideBtnView, isOrderBtnDisabled ? styles.orderRideBtnDisabled : {}]}
                  disabled={isOrderBtnDisabled}
                  onPress={this.createBooking}
                >
                  {busy && <ActivityIndicator style={styles.carLoading} size="small" color="#acabab" />}
                  <Text style={[styles.orderBtnText, isOrderBtnDisabled ? styles.orderBtnTextDisabled : {}]}>
                    Order Ride
                  </Text>
                </Button>
                <Button
                  style={styles.settingsBtn}
                  styleContent={styles.btnView}
                  onPress={this.toggleSettingsModal}
                >
                  <Icon name="settings" size={20} color="#d8d8d8" />
                </Button>
              </View>
              <Alert
                ref={(alert) => { this.alert = alert; }}
                message={this.state.message}
                type="failed"
                position="bottom"
              />
            </View>
          )
        }
      </View>
    );
  }

  render() {
    const { data: { formData: { vehicles } } } = this.props;

    return (
      vehicles.loading
        ? <LoaderLayer loading={vehicles.loading} />
        : this.renderFooter()
    );
  }
}

BookingFooter.propTypes = {
  navigation: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  getCurrentPosition: PropTypes.func.isRequired,
  isAuthorizedPermission: PropTypes.func.isRequired,
  createBooking: PropTypes.func.isRequired,
  changeFields: PropTypes.func.isRequired,
  changeAddress: PropTypes.func.isRequired,
  toggleVisibleModal: PropTypes.func.isRequired,
  passenger: PropTypes.object,
  requestVehicles: PropTypes.func.isRequired,
  toOrder: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};

BookingFooter.defaultProps = {};

const select = ({ ui, bookings }) => ({
  map: ui.map,
  data: bookings
});

const bindActions = {
  createBooking,
  changeFields,
  changeAddress,
  toggleVisibleModal,
  setReferenceErrors
};

export default connect(select, bindActions)(BookingFooter);
