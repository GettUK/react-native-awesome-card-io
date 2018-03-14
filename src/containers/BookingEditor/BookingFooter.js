import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import moment from 'moment';
import { has, find, isNull } from 'lodash';
import { Icon, Button, JourneyDetails, CarItem } from 'components';
import { strings } from 'locales';
import {
  createBooking
} from 'actions/booking';
import {
  changeFields,
  addAddressPoint,
  changeAddressType,
  changeAddress
} from 'actions/ui/map';
import { order } from 'actions/mockedData';
import {
  paymentTypeToAttrs,
  vehiclesData,
  isCashAllowed
} from 'containers/shared/bookings/data';
import styles from './style';

class BookingFooter extends Component {
  getEarliestAvailableTime = vehicle => {
    const { map: { fields: { vehicleName } }} = this.props;
    let shift = 60;

    if (!vehicle) {
      const { vehicles: { data } } = this.props.data.formData;
      vehicle = find(data, { name: vehicleName });
    }

    if (vehicle) {
      shift = vehicle.earliestAvailableIn;
    }

    return moment().add(shift, 'minutes');
  };

  selectVehicle = vehicleName => {
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
      (fields.vehicleName && fields.vehiclePrice);
  };

  render() {
    const { map: { fields }, data: { formData: { vehicles }, currentOrder: { busy } }, toOrder } = this.props;
    return (
      <View style={styles.footer}>
        {
          !toOrder ? (
            <View>
              <Button
                style={styles.currentPositionBtn}
                onPress={this.props.getCurrentPosition}
              >
                <Icon name="myLocation" height={22} color="#284784" />
              </Button>
              <Button
                style={styles.currentPositionBtn}
                onPress={() => this.props.createBooking(order)}
              >
                <Icon name="pickUpCenter" height={22} color="#284784" />
              </Button>
              <ScrollView
                horizontal
                contentContainerStyle={styles.destinationBtns}
                showsHorizontalScrollIndicator={false}>
                <Button
                  onPress={() => {
                    if (has(fields, 'destinationAddress')) {
                      this.props.changeAddress(fields.destinationAddress);
                    }
                    this.props.changeAddressType('destinationAddress', {}, null);
                    this.props.toggleModal();
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
                {
                  has(this.props.passenger, 'homeAddress') &&
                  !isNull(this.props.passenger.homeAddress) && (
                    <Button
                      onPress={() => {
                        this.props.changeAddress({
                          ...this.props.passenger.homeAddress,
                          label: strings('label.home')
                        });
                        this.props.changeAddressType('destinationAddress', {}, null);
                        this.props.addAddressPoint();
                      }}
                      style={styles.destinationBtn}
                    >
                      <Text style={styles.customDestinationText}>
                        {strings('label.home')}
                      </Text>
                    </Button>
                  )
                }
                {
                  has(this.props.passenger, 'workAddress') &&
                  !isNull(this.props.passenger.workAddress) && (
                    <Button
                      onPress={() => {
                        this.props.changeAddress({
                          ...this.props.passenger.workAddress,
                          label: strings('label.work')
                        });
                        this.props.changeAddressType('destinationAddress', {}, null);
                        this.props.addAddressPoint();
                      }}
                    >
                      <Text style={styles.customDestinationText}>
                        {strings('label.work')}
                      </Text>
                    </Button>
                  )
                }
              </ScrollView>
            </View>
          ) : (
            <View>
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
                      vehicles.data.filter(v => v.available).map(vehicle => {
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
                  onPress={() => {}}
                >
                  <Icon name="time" size={24} color="#d8d8d8" />
                </Button>
                <Button
                  style={styles.orderRideBtn}
                  disabled={busy || vehicles.loading || !!this.shouldOrderRide()}
                  onPress={() => this.props.createBooking(fields)}
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
                  onPress={() => {}}
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
    PropTypes.bool
  ])
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
  changeAddress
};

export default connect(select, bindActions)(BookingFooter);
