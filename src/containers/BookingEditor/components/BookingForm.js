import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {includes, find, debounce, isEmpty, times, map, every, compact, uniq, some, noop, has} from 'lodash';
// import { isEqualAddress } from 'utils';
// import moment from 'moment';
import {
  selectedPaymentType,
  paymentTypeToAttrs,
  vehicleEditableStatuses,
  isCashAllowed
} from 'containers/shared/bookings/data';

class BookingForm extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.selectCurrentMemberAsPassenger();
    }, 3000);
  }
  componentWillReceiveProps({ data, form: { destinationAddress } }) {
    console.log('componentWillReceiveProps:', destinationAddress);
    if (
      !data.vehicles.loaded &&
      !data.vehicles.loading
    ) {
      console.log('requestVehicles:');
      this.requestVehicles();
    }
  }
  requestVehicles() {
    console.log('shouldRequestVehicles:');
    if (!this.shouldRequestVehicles()) return;
    console.log('onRequestVehicles:');
    this.props.onRequestVehicles();
  }
  shouldRequestVehicles() {
    const { pickupAddress, destinationAddress } = this.props.form;

    // return !this.isVehicleLocked() &&
    //     pickupAddress && pickupAddress.countryCode &&
    //     destinationAddress && destinationAddress.countryCode &&
    //     this.allStopsValid() && this.isPassengerPresent();
    // countryCode переделать country_сode
    return pickupAddress && pickupAddress.country_code &&
        destinationAddress && destinationAddress.country_code &&
        this.isPassengerPresent();
    // this.allStopsValid() && this.isPassengerPresent();
  }
  // isVehicleLocked() {
  //   const { booking } = this.props.data;
  //
  //   return booking && booking.status && !vehicleEditableStatuses.includes(booking.status);
  // }

  allStopsValid() {
    const {stops} = this.props.form;
    // return every(stops, stop => typeof stop.address.countryCode !== 'undefined');
    return every(stops, stop => typeof stop.address.country_code !== 'undefined');
  }

  isPassengerPresent() {
    return this.props.passenger ||
        (this.props.form.passengerName && this.props.form.passengerPhone);
  }
  selectCurrentMemberAsPassenger = () => {
    const { passenger, memberId } = this.props;
    const { id: passengerId } = passenger || {};

    if (passengerId === memberId) {
      this.clearPassenger();
    } else {
      this.selectPassenger(memberId);
    }
  };
  clearPassenger() {
    this.props.dataTransfer({
      passengerId: null,
      passengerName: '',
      passengerPhone: ''
    });
  }
  selectPassenger = id => {
    const { passengers, paymentTypes, defaultPaymentType } = this.props.data;
    const passenger = find(passengers, { id: +id });
    const { firstName, lastName, phone } = passenger;
    const type = selectedPaymentType({ passenger, paymentTypes, defaultPaymentType });

    this.props.dataTransfer({
      passengerId: id,
      passengerName: `${firstName} ${lastName}`,
      passengerPhone: phone,
      ...paymentTypeToAttrs(type)
    });

    this.requestVehicles();
  };
  render() {
    // console.log('BookingForm:: props:: ', this.props);
    return (
      <View/>
    );
  }
}

BookingForm.propTypes = {
  memberId: PropTypes.number,
  form: PropTypes.object,
  data: PropTypes.shape({
    vehicles: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.object),
      loading: PropTypes.bool
    })
  }),
  passenger: PropTypes.object,
  availableVehicles: PropTypes.arrayOf(PropTypes.object),
  availablePaymentTypes: PropTypes.arrayOf(PropTypes.object),
  renderReferences: PropTypes.bool,
  onRequestReferenceEntries: PropTypes.func,
  onRequestVehicles: PropTypes.func,
  onDropFlight: PropTypes.func,
  dataTransfer: PropTypes.func
};

BookingForm.defaultProps = {
  renderReferences: true
};

export default BookingForm;
