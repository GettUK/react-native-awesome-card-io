import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import moment from 'moment';
import { has, find, isNull } from 'lodash';
import { Icon, Button, Modal, JourneyDetails, CarItem } from 'components';
import { strings } from 'locales';
import {
  changeFields,
  addAddressPoint,
  changeAddressType,
  changeAddress
} from 'actions/ui/map';
import {
  createBooking,
  toggleVisibleModal
} from 'actions/booking';
import order from 'actions/mockedData';
import {
  paymentTypeToAttrs,
  vehiclesData,
  isCashAllowed,
  paymentTypeLabels
} from 'containers/shared/bookings/data';

import styles from './style';

class BookingFooter extends Component {
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
  }

  toggleSettingsModal = () => {
    this.props.toggleVisibleModal('settings');
  };

  renderAddressItem = (address, label) => {
    const {
      changeAddress,
      changeAddressType,
      addAddressPoint
    } = this.props;

    return (
      <Button
        key={address.id || label}
        onPress={() => {
          changeAddress({ ...address, label });
          changeAddressType('destinationAddress', {}, null);
          addAddressPoint();
        }}
        style={styles.destinationBtn}
      >
        <Text style={styles.customDestinationText}>{label}</Text>
      </Button>
    );
  };

  renderAddressesSelector() {
    const {
      map: { fields },
      changeAddress,
      changeAddressType,
      toggleModal,
      passenger
    } = this.props;

    return (
      <ScrollView
        horizontal
        contentContainerStyle={styles.destinationBtns}
        showsHorizontalScrollIndicator={false}
      >
        <Button
          onPress={() => {
            if (has(fields, 'destinationAddress')) {
              changeAddress(fields.destinationAddress);
            }
            changeAddressType('destinationAddress', {}, null);
            toggleModal();
          }}
          style={styles.destinationBtn}
        >
          <Icon
            style={styles.searchIcon}
            name="search"
            color="#284784"
            size={18}
          />
          <Text style={styles.selectDestinationText}>
            Select Destination
          </Text>
        </Button>
        {passenger && !isNull(passenger.homeAddress) &&
          this.renderAddressItem(passenger.homeAddress, strings('label.home'))
        }
        {passenger && !isNull(passenger.workAddress) &&
          this.renderAddressItem(passenger.workAddress, strings('label.work'))
        }
        {passenger && (passenger.favoriteAddresses || []).map(address =>
          this.renderAddressItem(address.address, address.name))
        }
      </ScrollView>
    );
  }

  renderSettings() {
    const { data: { formData: { travelReasons }, modals: { settings } },
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
      </Modal>
    );
  }

  render() {
    const {
      map: { fields },
      data: { formData: { vehicles }, currentOrder: { busy } },
      toOrder,
      getCurrentPosition,
      createBooking,
      toggleVisibleModal
    } = this.props;

    return (
      <View style={styles.footer} pointerEvents="box-none">
        {this.renderSettings()}
        {
          !toOrder ? (
            <View pointerEvents="box-none">
              <Button
                style={styles.currentPositionBtn}
                onPress={getCurrentPosition}
              >
                <Icon name="myLocation" height={22} color="#284784" />
              </Button>
              {this.renderAddressesSelector()}
            </View>
          ) : (
            <View pointerEvents="box-none">
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
                      vehicles.data.filter(v => v.available).map((vehicle) => {
                        const vehicleData = vehiclesData[vehicle.name];
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
                  onPress={() => toggleVisibleModal('picker')}
                >
                  <Icon name="time" size={24} color="#d8d8d8" />
                </Button>
                <Button
                  style={styles.orderRideBtn}
                  disabled={busy || vehicles.loading || !this.shouldOrderRide()}
                  onPress={() => createBooking(fields)}
                >
                  {
                    busy && (
                      <ActivityIndicator style={styles.carLoading} size="small" color="#d8d8d8" />
                    )
                  }
                  <Text style={styles.orderBtnBottomText}>Order Ride</Text>
                </Button>
                <Button
                  style={styles.settingsBtn}
                  onPress={this.toggleSettingsModal}
                >
                  <Icon name="settings" size={20} color="#d8d8d8" />
                </Button>
              </View>
            </View>
          )
        }
      </View>
    );
  }
}

BookingFooter.propTypes = {
  navigation: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  getCurrentPosition: PropTypes.func.isRequired,
  createBooking: PropTypes.func.isRequired,
  changeFields: PropTypes.func.isRequired,
  addAddressPoint: PropTypes.func.isRequired,
  changeAddressType: PropTypes.func.isRequired,
  changeAddress: PropTypes.func.isRequired,
  passenger: PropTypes.object,
  toggleModal: PropTypes.func.isRequired,
  requestVehicles: PropTypes.func.isRequired,
  toOrder: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool]),
  toggleVisibleModal: PropTypes.func.isRequired
};

BookingFooter.defaultProps = {};

const select = ({ ui, bookings }) => ({
  map: ui.map,
  data: bookings
});

const bindActions = {
  createBooking,
  changeFields,
  addAddressPoint,
  changeAddressType,
  changeAddress,
  toggleVisibleModal
};

export default connect(select, bindActions)(BookingFooter);
