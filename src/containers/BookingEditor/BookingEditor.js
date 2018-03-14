import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View
} from 'react-native';
import moment from 'moment';
import {
  isEmpty, find, flatMap, isEqual, compact, intersection, without, has
} from 'lodash';
import {compose} from 'lodash/fp';
import AddressModal from 'containers/Map/AddressModal';
import {
  getFormData
} from 'actions/booking';
import {
  changeFields,
  addAddressPoint,
  changeAddressType,
  changeAddressTyping,
  changeAddress
} from 'actions/ui/map';
import {
  paymentTypes as allPaymentTypes,
  paymentTypeLabels,
  selectedPaymentType,
  paymentTypeToAttrs,
  vehicleEditableStatuses,
  isCashAllowed
} from 'containers/shared/bookings/data';
import { PointList } from 'components';
import styles from './style';

class BookingEditor extends Component {
  componentDidMount() {
    if (isEmpty(this.props.passenger)) {
      this.loadBooking();
    }
  }

  componentWillReceiveProps({ data, map }) {
    const { map: propsMap, requestVehicles } = this.props;
    if (!data.vehicles.loaded && !data.vehicles.loading ||
        !isEqual(map.fields.stops, propsMap.fields.stops) ||
        !isEqual(map.fields.destinationAddress, propsMap.fields.destinationAddress)) {
      requestVehicles();
    }
  }

  getAvailablePaymentTypes = () => {
    const { passenger, data: { paymentTypes }, fields: { vehicleName } } = this.props;

    const availableTypes = isCashAllowed(vehicleName) ? paymentTypes : without(paymentTypes, 'cash');

    return compact(flatMap(intersection(allPaymentTypes, availableTypes), type => {
      if (type !== 'passenger_payment_card') {
        return { value: type, label: paymentTypeLabels[type] };
      } else if (passenger) {
        return passenger.paymentCards.map(card =>
          ({ value: `${card.type}_payment_card:${card.id}`, label: card.title }));
      }
    }));
  };

  selectCurrentMemberAsPassenger = () => {
    const { memberId, passenger: {id: passengerId} } = this.props;

    if (passengerId === memberId) {
      this.clearPassenger();
    } else {
      this.selectPassenger(memberId);
    }
  };

  clearPassenger = () => {
    this.props.changeFields({
      passengerId: null,
      passengerName: '',
      passengerPhone: ''
    });
  };

  selectPassenger = id => {
    const { passengers, paymentTypes, defaultPaymentType } = this.props.data;
    const passenger = find(passengers, { id: +id });
    const { firstName, lastName, phone } = passenger;
    const type = selectedPaymentType({ passenger, paymentTypes, defaultPaymentType });

    this.props.changeFields({
      passengerId: id,
      passengerName: `${firstName} ${lastName}`,
      passengerPhone: phone,
      ...paymentTypeToAttrs(type)
    });

    this.props.requestVehicles();
  };

  loadBooking = () => {
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
            value: ref.mandatory && 'default' || ref.value
          }));
        const nextForm = {
          ...paymentTypeToAttrs(paymentType),
          pickupAddress: data.defaultPickupAddress,
          message: data.defaultDriverMessage && `Pick up: ${data.defaultDriverMessage}`,
          bookerReferences
        };

        if (!isEmpty(data.booking)) {
          Object.assign(nextForm, {
            ...data.booking,
            scheduledAt: moment(data.booking.scheduledAt).tz(data.booking.pickupAddress.timezone),
            schedule: this.getScheduleParams(data.booking),
            asDirected: !data.booking.destinationAddress
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
        this.props.changeFields(nextForm);
        this.selectCurrentMemberAsPassenger();
      });
  };

  render() {
    const {
      map: { addressModal, address, fields }
    } = this.props;

    return (
      <View style={{}}>
        <AddressModal
          isVisible={addressModal}
          toggleModal={compose(
            this.props.addAddressPoint,
            this.props.toggleModal
          )}
          value={address.value}
          onChange={this.props.changeAddress}
          isTyping={address.isTyping}
          onChangeTyping={this.props.changeAddressTyping}
          typingTimeout={address.typingTimeout}
        />
        <PointList
          style={styles.pointList}
          onChangeAddress={this.props.changeAddress}
          onChangeAddressType={this.props.changeAddressType}
          toggleModal={this.props.toggleModal}
          data={{ ...fields }}
        />
      </View>
    );
  }
}


BookingEditor.propTypes = {
  navigation: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  memberId: PropTypes.number,
  data: PropTypes.object,
  validatedReferences: PropTypes.arrayOf(PropTypes.object),
  fields: PropTypes.object.isRequired,
  getFormData: PropTypes.func.isRequired,
  changeFields: PropTypes.func.isRequired,
  addAddressPoint: PropTypes.func.isRequired,
  changeAddressType: PropTypes.func.isRequired,
  changeAddressTyping: PropTypes.func.isRequired,
  changeAddress: PropTypes.func.isRequired,
  passenger: PropTypes.object,
  toggleModal: PropTypes.func.isRequired,
  requestVehicles: PropTypes.func.isRequired
};

BookingEditor.defaultProps = {
  passenger: {}
};

const select = ({ ui, session, bookings }) => ({
  map: ui.map,
  memberId: has(session.result, 'memberId') ? session.result.memberId : undefined,
  data: bookings.formData,
  validatedReferences: bookings.validatedReferences,
  fields: ui.map.fields
});

const bindActions = {
  getFormData,
  changeFields,
  addAddressPoint,
  changeAddressType,
  changeAddressTyping,
  changeAddress
};

export default connect(select, bindActions)(BookingEditor);
