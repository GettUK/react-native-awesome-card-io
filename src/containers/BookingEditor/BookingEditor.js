import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View
} from 'react-native';
import moment from 'moment';
import {
  isEmpty, find, isEqual, has
} from 'lodash';
import { compose } from 'lodash/fp';
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
  selectedPaymentType,
  paymentTypeToAttrs
} from 'containers/shared/bookings/data';
import { PointList } from 'components';
import styles from './style';

class BookingEditor extends Component {
  componentDidMount() {
    if (isEmpty(this.props.passenger)) {
      this.loadBooking();
    }
  }

  componentWillReceiveProps({ bookings: { formData }, map }) {
    const { map: propsMap, requestVehicles } = this.props;
    if ((!formData.vehicles.loaded && !formData.vehicles.loading) ||
        !isEqual(map.fields.stops, propsMap.fields.stops) ||
        !isEqual(map.fields.destinationAddress, propsMap.fields.destinationAddress)) {
      requestVehicles();
    }
  }

  selectCurrentMemberAsPassenger = () => {
    const { memberId, passenger: { id: passengerId } } = this.props;

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

  selectPassenger = (id) => {
    const { bookings: { formData: { passengers, paymentTypes, defaultPaymentType } } } = this.props;
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
      .then((data) => {
        const { bookings: { validatedReferences } } = this.props;
        const { passenger: dataPassenger, booking, passengers, paymentTypes, defaultPaymentType } = data;
        const passenger = dataPassenger ||
            (booking && booking.passengerId && find(passengers, { id: +booking.passengerId }));
        const paymentType = selectedPaymentType({ passenger, paymentTypes, defaultPaymentType });
        const bookerReferences = !isEmpty(validatedReferences) ?
          validatedReferences : data.bookingReferences.map(ref => ({
            bookingReferenceId: ref.id,
            mandatory: ref.mandatory,
            conditional: ref.conditional,
            value: (ref.mandatory && 'default') || ref.value
          }));
        let attrs = {
          ...paymentTypeToAttrs(paymentType),
          pickupAddress: data.defaultPickupAddress,
          message: data.defaultDriverMessage && `Pick up: ${data.defaultDriverMessage}`,
          bookerReferences
        };

        if (!isEmpty(data.booking)) {
          attrs = {
            ...attrs,
            ...data.booking,
            scheduledAt: moment(data.booking.scheduledAt).tz(data.booking.pickupAddress.timezone),
            schedule: this.getScheduleParams(data.booking),
            asDirected: !data.booking.destinationAddress
          };
        }

        if (dataPassenger) {
          const { id, firstName, lastName, phone } = dataPassenger;

          attrs = {
            ...attrs,
            passengerId: id,
            passengerName: `${firstName} ${lastName}`,
            passengerPhone: phone
          };
        }
        this.props.changeFields(attrs);
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
  bookings: PropTypes.object,
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
  bookings
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
