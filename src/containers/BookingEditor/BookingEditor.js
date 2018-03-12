import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import moment from 'moment';
import update from 'update-js/fp';
import axios from 'axios';
import {
  isEmpty, first, find, flatMap, compact, intersection,
  filter, without, has
} from 'lodash';
import {
  getFormData,
  createBooking,
  getVehicles
} from 'actions/booking';
import {
  paymentTypes as allPaymentTypes,
  paymentTypeLabels,
  selectedPaymentType,
  paymentTypeToAttrs,
  isCashAllowed
} from 'containers/shared/bookings/data';
import { BookingForm } from './components';
import styles from './style';

const initialForm = {
  scheduledAt: null,
  scheduledType: 'now',
  travelReasonId: '',
  bookerReferences: []
};

class BookingEditor extends Component {
  state = {
    form: initialForm,
    saving: false
  };
  componentDidMount() {
    this.loadBooking();
  }

  componentWillReceiveProps({ validatedReferences, fields }) {
    const { validatedReferences: propsValidatedReferences, fields: propsFields } = this.props;

    if (isEmpty(propsValidatedReferences) && !isEmpty(validatedReferences)) {
      this.loadBooking();
    }
    if (propsFields !== fields) {
      this.setState({ form: {...this.state.form, ...fields} });
    }
  }

  loadBooking() {
    this.props.getFormData()
      .then(data => {
        const { validatedReferences } = this.props;
        const { passenger: dataPassenger, booking, passengers, paymentTypes, defaultPaymentType } = data;
        const passenger = dataPassenger ||
            (booking && booking.passengerId && find(passengers, { id: +booking.passengerId }));
        const paymentType = selectedPaymentType({ passenger, paymentTypes, defaultPaymentType });
        const bookerReferences = !isEmpty(validatedReferences) ?
          validatedReferences : data.bookingReferences.map(ref => ({
            bookingReferenceId: ref.id,
            mandatory: ref.mandatory,
            conditional: ref.conditional,
            value: ref.value
          }));
        const nextForm = {
          ...initialForm,
          ...paymentTypeToAttrs(paymentType),
          pickupAddress: data.defaultPickupAddress,
          message: data.defaultDriverMessage && `Pick up: ${data.defaultDriverMessage}`,
          bookerReferences
        };

        if (!isEmpty(data.booking)) {
          Object.assign(nextForm, {
            ...data.booking,
            scheduledAt: moment(data.booking.scheduledAt)
          });
        }

        if (dataPassenger) {
          const { id, firstName, lastName, phone } = dataPassenger;

          Object.assign(nextForm, {
            passengerId: id,
            passengerName: `${firstName} ${lastName}`,
            passengerPhone: phone
          });
        }

        this.setState({ form: nextForm });
      });
  }

  createBooking = booking => {
    this.setState({ saving: true });

    return this.props.createBooking({ ...booking })
      .then(savedBooking => {
        this.setState({ saving: false });
      })
      .catch(err => {
        this.setState({ saving: false });
        if (err.response) {
          handleResponseError(err.response);
        } else {
          console.error(err);
        }
      });

    function handleResponseError({ data, status }) {
      if (status === 422) {
        if (typeof data.errors === 'string') {
          console.log({ content: data.errors });
        } else {
          console.log('setErrors', data.errors);
        }
      } else {
        console.log('Something went wrong. Please try again later');
      }
    }
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
      paymentCardId,
      stops
    } = this.state.form;
    const passenger = this.getPassenger();

    this.props.getVehicles({
      fromPostalCode: pickupAddress.postalCode,
      fromLat: pickupAddress.lat,
      fromLng: pickupAddress.lng,
      fromLine: pickupAddress.line,
      fromCountryCode: pickupAddress.countryCode,
      fromTimezone: pickupAddress.timezone,
      fromPlaceId: pickupAddress.placeId,
      toPostalCode: destinationAddress.postalCode,
      toLat: destinationAddress.lat,
      toLng: destinationAddress.lng,
      toLine: destinationAddress.line,
      toCountryCode: destinationAddress.countryCode,
      toPlaceId: destinationAddress.placeId,
      scheduledAt: scheduledType === 'now' ? null : scheduledAt.format(),
      passengerName: passenger ? `${passenger.firstName} ${passenger.lastName}` : passengerName,
      passengerPhone: passenger ? passenger.phone : passengerPhone,
      passengerId,
      paymentMethod,
      paymentCardId,
      stops
    }).then(() => {
      if (this.unmounted) return;

      const vehicle = this.lookupVehicle();

      this.setState(update.assign('form', {
        quoteId: vehicle.quoteId,
        vehicleName: vehicle.name,
        vehicleValue: vehicle.value,
        vehiclePrice: vehicle.price
      }));
    }).catch(err => {
      if (this.unmounted || axios.isCancel(err)) return;

      this.setState(update.assign('form', { quoteId: undefined, vehicleName: undefined }));

      console.log({
        title: 'Something went wrong',
        content: 'Please try again later.'
      });
    });
  };

  lookupVehicle() {
    const { vehicleName } = this.state.form;
    const availableVehicles = this.getAvailableVehicles();
    const passenger = this.getPassenger();
    let vehicle = { quoteId: undefined, name: undefined, value: undefined };

    if (availableVehicles.length) {
      vehicle =
        (vehicleName && find(availableVehicles, { name: vehicleName })) ||
        (passenger && find(availableVehicles, { name: passenger.defaultVehicle })) ||
        first(availableVehicles);
    }
    return vehicle;
  }

  getAvailableVehicles = () => (
    filter(has(this.props.data, 'vehicles') ? this.props.data.vehicles.data : [], v => v.available)
  );

  getPassenger() {
    const { passengerId } = this.state.form;
    const { passenger, passengers } = this.props.data;

    return passenger || find(passengers, { id: +passengerId });
  }

  getAvailablePaymentTypes() {
    const passenger = this.getPassenger();
    const { paymentTypes } = this.props.data;
    const { vehicleName } = this.state.form;

    const availableTypes = isCashAllowed(vehicleName) ? paymentTypes : without(paymentTypes, 'cash');

    return compact(flatMap(intersection(allPaymentTypes, availableTypes), type => {
      if (type !== 'passenger_payment_card') {
        return { value: type, label: paymentTypeLabels[type] };
      } else if (passenger) {
        return passenger.paymentCards.map(card =>
          ({ value: `${card.type}_payment_card:${card.id}`, label: card.title }));
      }
    }));
  }

  render() {
    const { memberId, data, bookingsValidationEnabled } = this.props;
    // console.log('BookingEditor:: props:: ', this.props);
    // console.log('BookingEditor:: state:: ', this.state);
    return (<View style={styles.layout}>
      <BookingForm
        dataTransfer={res => {
          this.setState(update.assign('form', {
            ...res
          }));
        }}
        memberId={ memberId }
        data={ data }
        form={this.state.form}
        onRequestSave={ this.createBooking }
        onRequestVehicles={ this.requestVehicles }
        // onRequestFlightVerification={ this.verifyFlight }
        // onRequestReferenceEntries={ this.requestReferenceEntries }
        // onDropFlight={ dropFlight }
        renderReferences={ !bookingsValidationEnabled }
        passenger={ this.getPassenger() }
        availableVehicles={ this.getAvailableVehicles() }
        availablePaymentTypes={ this.getAvailablePaymentTypes() }
        // onCancel={ this.onCancel }
      />
    </View>);
  }
}


BookingEditor.propTypes = {
  memberId: PropTypes.number,
  data: PropTypes.object,
  bookingsValidationEnabled: PropTypes.bool,
  validatedReferences: PropTypes.arrayOf(PropTypes.object),
  fields: PropTypes.object,
  getFormData: PropTypes.func,
  createBooking: PropTypes.func,
  getVehicles: PropTypes.func
};

BookingEditor.defaultProps = {};

const select = ({ ui, session, bookings }) => ({
  memberId: session.result.member_id,
  data: bookings.formData,
  bookingsValidationEnabled: session.result.bookings_validation_enabled,
  validatedReferences: bookings.validatedReferences,
  fields: ui.map.fields
});

const bindActions = {
  getFormData,
  createBooking,
  getVehicles
};

export default connect(select, bindActions)(BookingEditor);
