import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import moment from 'moment';
import { isEmpty, find, isEqual, has } from 'lodash';
import { getFormData } from 'actions/booking';
import { changeFields, changeAddress } from 'actions/ui/map';
import { PointList, AddressModal } from 'components';
import BookingFooter from './BookingFooter';
import { prepareDefaultValues } from './utils';
import styles from './style';

class BookingEditor extends Component {
  state = {
    loadBookingRequested: false
  };

  componentWillReceiveProps({ bookings: { formData }, map }) {
    const { map: propsMap, requestVehicles, memberId, passenger } = this.props;
    if ((!formData.vehicles.loaded && !formData.vehicles.loading) ||
        !isEqual(map.fields.stops, propsMap.fields.stops) ||
        !isEqual(map.fields.pickupAddress, propsMap.fields.pickupAddress) ||
        !isEqual(map.fields.destinationAddress, propsMap.fields.destinationAddress) ||
        !isEqual(map.fields.paymentMethod, propsMap.fields.paymentMethod)) {
      requestVehicles();
    }

    if (memberId && !this.state.loadBookingRequested && isEmpty(passenger)) {
      this.loadBooking();

      this.setState({ loadBookingRequested: true });
    }
  }

  loadBooking = () => {
    const { getFormData, memberId, changeFields } = this.props;

    getFormData()
      .then((data) => {
        const { passenger: dataPassenger, passengers } = data;
        const passenger = dataPassenger || (memberId && find(passengers, { id: memberId }));

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

        changeFields(attrs);
      });
  };

  openAddressModal = (address, meta) => {
    this.addressModal.open(address, meta);
  };

  render() {
    const {
      navigation,
      getCurrentPosition,
      toOrder,
      requestVehicles,
      passenger,
      map: { fields },
      changeAddress
    } = this.props;

    return (
      <View style={styles.wrapper} pointerEvents="box-none">
        <AddressModal
          ref={(el) => { this.addressModal = el; }}
          defaultValues={prepareDefaultValues(passenger)}
          onChange={changeAddress}
        />
        <PointList
          style={styles.pointList}
          onAddressPress={this.openAddressModal}
          data={fields}
        />
        <BookingFooter
          navigation={navigation}
          getCurrentPosition={getCurrentPosition}
          passenger={passenger}
          requestVehicles={requestVehicles}
          toOrder={toOrder}
          openAddressModal={this.openAddressModal}
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
  passenger: PropTypes.object,
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
  changeAddress
};

export default connect(select, bindActions)(BookingEditor);
