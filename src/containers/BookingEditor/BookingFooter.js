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
import { Icon, Button, Modal, JourneyDetails, CarItem, InformView, Alert, Divider } from 'components';
import { hourForward } from 'utils';
import { strings } from 'locales';
import { onLayoutFooter } from 'actions/app/statuses';
import { changeFields, changeAddress, setReferenceErrors } from 'actions/ui/map';
import { createBooking, toggleVisibleModal } from 'actions/booking';
import {
  paymentTypeToAttrs,
  vehiclesData,
  isCashAllowed,
  paymentTypeLabels,
  isEqualAddress
} from 'containers/shared/bookings/data';
import { LoaderLayer } from './components';

import styles from './style';

class BookingFooter extends PureComponent {
  state = {
    message: ''
  };

  onLayout = (e) => {
    this.props.onLayoutFooter(e.nativeEvent.layout);
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

  goTo = (page) => {
    let payload = {};

    if (page === 'MessageToDriver') {
      const { map: { fields: { message } } } = this.props;

      payload = { message };
    }

    this.toggleSettingsModal();

    this.props.navigation.navigate(page, payload);
  };

  toggleSettingsModal = () => {
    this.props.toggleVisibleModal('settings');
  };

  handleCustomDestinationPress = () => {
    this.props.openAddressModal(null, { type: 'destinationAddress' });
  };

  handlePickupAddressPress = () => {
    const { map: { fields: { pickupAddress } } } = this.props;
    this.props.openAddressModal(pickupAddress, { type: 'pickupAddress' });
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

  areAddressesUnique() {
    const { map: { fields: { pickupAddress, stops, destinationAddress } } } = this.props;
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

  createBooking = () => {
    const { map: { fields }, createBooking } = this.props;

    if (this.areAddressesUnique()) {
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
    }
  };

  togglePickerModal = () => {
    const { toggleVisibleModal, onDateChange, map: { fields } } = this.props;

    toggleVisibleModal('picker');
    onDateChange((fields.scheduledAt || hourForward()).toDate());
  };

  renderPickUpDestination = () => {
    const { map: { fields } } = this.props;

    return (
      <View style={styles.selectAddressView}>
        <View style={styles.rowItem}>
          <View style={styles.iconContainer}>
            <Icon style={styles.iconItem} name="pickUpField" size={16} />
            <Icon style={styles.iconDottedLine} height={12} name="dottedLine" />
          </View>
          <TouchableOpacity
            style={styles.rowView}
            onPress={this.handlePickupAddressPress}
          >
          {has(fields, 'pickupAddress') && !isNull(fields.pickupAddress.line) && (
            <Text style={styles.labelText} numberOfLines={1}>
              {fields.pickupAddress.label || fields.pickupAddress.line}
            </Text>
          )}
          </TouchableOpacity>
        </View>
        <Divider />
        <View style={styles.rowItem}>
          <Icon style={styles.iconItem} name="destinationMarker" width={16} height={19} />
          <TouchableOpacity
            style={styles.rowView}
            onPress={this.handleCustomDestinationPress}
          >
            <Text style={styles.selectDestinationText} numberOfLines={1}>
              {strings('label.selectDestination')}
            </Text>
          </TouchableOpacity>
        </View>
        <Divider />
      </View>
    );
  };

  renderFavouriteAddresses() {
    const { passenger } = this.props;

    return (
      <ScrollView
        horizontal
        contentContainerStyle={styles.destinationBtns}
        showsHorizontalScrollIndicator={false}
      >
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

  renderAddressesSelector() {
    return (
      <View style={styles.selectAddress}>
        {this.renderPickUpDestination()}
        <View style={styles.destinationBtnsContainer}>
          {this.props.data.formData.busy
            ? <ActivityIndicator style={styles.destinationBtnsSpinner} size="small" color="#8794a0" />
            : this.renderFavouriteAddresses()
          }
        </View>
      </View>
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
        {renderMenuItem('Message to driver', message, () => this.goTo('MessageToDriver'))}
        <View style={styles.settingsMenuSeparator} />
        {renderMenuItem('Reasons for travel', getReasonsName(travelReasonId), () => this.goTo('ReasonForTravel'))}
        <View style={styles.settingsMenuSeparator} />
        {renderMenuItem('Payment method', paymentTypeLabels[paymentMethod], () => this.goTo('PaymentsOptions'))}
        <View style={styles.settingsMenuSeparator} />
        {renderMenuItem('Booking References', `${bookingReferences.length} References`, () => this.goTo('References'))}
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
      <View
        onLayout={this.onLayout}
        style={styles.footer}
        pointerEvents="box-none"
      >
        {
          toOrder && availableVehicles.length === 0 && (
            <InformView style={styles.footerOrderInfo}>
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
            <View style={styles.footerOrder} pointerEvents="box-none">
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
  onLayoutFooter,
  createBooking,
  changeFields,
  changeAddress,
  toggleVisibleModal,
  setReferenceErrors
};

export default connect(select, bindActions, null, { withRef: true })(BookingFooter);
