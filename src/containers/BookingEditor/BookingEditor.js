import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View
} from 'react-native';
import moment from 'moment';
import { isEmpty, find, isEqual, has } from 'lodash';
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
import { PointList } from 'components';
import { prepareDefaultValues } from './utils';
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
        !isEqual(map.fields.pickupAddress, propsMap.fields.pickupAddress) ||
        !isEqual(map.fields.destinationAddress, propsMap.fields.destinationAddress)||
        !isEqual(map.fields.paymentMethod, propsMap.fields.paymentMethod)) {
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
    const { bookings: { formData: { passengers } } } = this.props;
    const passenger = find(passengers, { id: +id });
    const { firstName, lastName, phone } = passenger;

    this.props.changeFields({
      passengerId: id,
      passengerName: `${firstName} ${lastName}`,
      passengerPhone: phone
    });

    this.props.requestVehicles();
  };

  loadBooking = () => {
    this.props.getFormData()
      .then((data) => {
        const { passenger: dataPassenger, booking, passengers } = data;
        const passenger = dataPassenger ||
            (booking && booking.passengerId && find(passengers, { id: +booking.passengerId }));

        let attrs = {
          pickupAddress: data.defaultPickupAddress,
          message: data.defaultDriverMessage && `Pick up: ${data.defaultDriverMessage}`
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

        if (passenger) {
          const { id, firstName, lastName, phone } = passenger;

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
      passenger, changeAddressTyping, addAddressPoint, toggleModal, changeAddress, changeAddressType,
      map: { addressModal, address, fields }
    } = this.props;

    return (
      <View style={{}}>
        <AddressModal
          isVisible={addressModal}
          toggleModal={compose(
            addAddressPoint,
            toggleModal
          )}
          value={address.value}
          defaultValues={prepareDefaultValues(passenger)}
          onChange={changeAddress}
          isTyping={address.isTyping}
          onChangeTyping={changeAddressTyping}
          typingTimeout={address.typingTimeout}
        />
        <PointList
          style={styles.pointList}
          onChangeAddress={changeAddress}
          onChangeAddressType={changeAddressType}
          toggleModal={toggleModal}
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
