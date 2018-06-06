import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import moment from 'moment-timezone';
import { isEmpty, find, isEqual, has } from 'lodash';

import { getFormData, changeFields, changeAddress } from 'actions/booking';
import { onLayoutPointList } from 'actions/app/statuses';

import { PointList, AddressModal, StopPointsModal } from 'components';

import { getHeight } from 'utils';
import BookingFooter from './BookingFooter';
import { prepareDefaultValues } from './utils';
import styles from './style';

class BookingEditor extends Component {
  state = {
    loadBookingRequested: false,
    isStopPointsModalVisible: false
  };

  componentDidUpdate({ booking: { bookingForm: bookingFormProps }, requestVehicles, memberId, passenger }) {
    const { booking: { vehicles, bookingForm }, getFormData } = this.props;
    const { isStopPointsModalVisible } = this.state;

    const isDriveChanged = (!vehicles.loaded && !vehicles.loading) ||
      !isEqual(bookingForm.stops, bookingFormProps.stops) ||
      !isEqual(bookingForm.pickupAddress, bookingFormProps.pickupAddress) ||
      !isEqual(bookingForm.destinationAddress, bookingFormProps.destinationAddress) ||
      !isEqual(bookingForm.paymentMethod, bookingFormProps.paymentMethod);

    if (!isStopPointsModalVisible && isDriveChanged) {
      requestVehicles();
    }

    if (memberId && !this.state.loadBookingRequested && isEmpty(passenger)) {
      this.loadBooking();

      this.setState({ loadBookingRequested: true });
    }

    if (bookingForm.destinationAddress && !bookingFormProps.destinationAddress) {
      getFormData();
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
          message: data.defaultDriverMessage && `Pick up: ${data.defaultDriverMessage}`,
          bookerReferences: data.bookingReferences.map(r => ({ ...r, bookingReferenceId: r.id }))
        };

        if (!isEmpty(data.booking)) {
          const { scheduledAt, pickupAddress, destinationAddress } = data.booking;
          attrs = {
            ...attrs,
            ...data.booking,
            scheduledAt: moment(scheduledAt).tz(pickupAddress && pickupAddress.timezone),
            schedule: this.getScheduleParams(data.booking),
            asDirected: !destinationAddress
          };
        }

        if (passenger) {
          const { id, firstName, lastName, phone, costCentre } = passenger;

          attrs = {
            ...attrs,
            passengerId: id,
            passengerName: `${firstName} ${lastName}`,
            passengerPhone: phone,
            costCentre
          };
        }

        changeFields(attrs);
      });
  };

  openAddressModal = (address, meta) => {
    this.addressModal.open(address, meta);
  };

  handleEditPoint = (address, meta) => {
    this.setState({ isStopPointsModalVisible: false }, () => {
      setTimeout(() => this.openAddressModal(address, meta), 500);
    });
  };

  handleAddStop = () => {
    this.handleEditPoint(null, { type: 'stops' });
  };

  showStopPointsModal = () => {
    this.setState({ isStopPointsModalVisible: true });
  };

  hideStopPointsModal = () => {
    this.setState({ isStopPointsModalVisible: false });
  };

  prepareStopsData = () => {
    const { booking: { bookingForm: { destinationAddress, stops } } } = this.props;

    const stopsObject = (stops || []).reduce((stop, item, index) => ({
      ...stop,
      [`stop${index}`]: item
    }), {});

    return {
      ...stopsObject,
      [`stop${(stops || []).length}`]: destinationAddress
    };
  };

  getPointListPosition = () => {
    const { app: { statuses: { params: { footer } } } } = this.props;

    if (getHeight(footer)) {
      return { bottom: getHeight(footer) + 5 };
    }

    return { bottom: 0 };
  };

  footerInstance = () => this.footerView && this.footerView.wrappedInstance;

  render() {
    const {
      navigation,
      getCurrentPosition,
      toOrder,
      requestVehicles,
      passenger,
      booking: { vehicles, bookingForm },
      changeAddress,
      changeFields,
      isAuthorizedPermission,
      onLayoutPointList,
      onDateChange,
      isLoadingPickup
    } = this.props;

    return (
      <View style={styles.wrapper} pointerEvents="box-none">
        <AddressModal
          ref={(el) => { this.addressModal = el; }}
          defaultValues={prepareDefaultValues(passenger)}
          onChange={changeAddress}
        />

        {toOrder && !vehicles.loading &&
          <PointList
            onLayout={onLayoutPointList}
            style={[styles.pointList, this.getPointListPosition()]}
            onAddressPress={this.openAddressModal}
            onStopAdd={this.showStopPointsModal}
            data={bookingForm}
            isLoadingPickup={isLoadingPickup}
          />
        }

        <StopPointsModal
          data={this.prepareStopsData()}
          isVisible={this.state.isStopPointsModalVisible}
          onAddPoint={this.handleAddStop}
          onEditAddress={this.handleEditPoint}
          onRowMoved={requestVehicles}
          onChangeAddress={changeFields}
          onClose={this.hideStopPointsModal}
        />

        <BookingFooter
          navigation={navigation}
          getCurrentPosition={getCurrentPosition}
          passenger={passenger}
          requestVehicles={requestVehicles}
          toOrder={toOrder}
          openAddressModal={this.openAddressModal}
          isAuthorizedPermission={isAuthorizedPermission}
          onDateChange={onDateChange}
          ref={(footer) => { this.footerView = footer; }}
        />
      </View>
    );
  }
}

BookingEditor.propTypes = {
  navigation: PropTypes.object.isRequired,
  memberId: PropTypes.number,
  booking: PropTypes.object,
  getFormData: PropTypes.func.isRequired,
  changeFields: PropTypes.func.isRequired,
  passenger: PropTypes.object,
  requestVehicles: PropTypes.func.isRequired,
  isAuthorizedPermission: PropTypes.func.isRequired
};

BookingEditor.defaultProps = {
  passenger: {}
};

const select = ({ session, booking, app }) => ({
  memberId: has(session.user, 'memberId') ? session.user.memberId : undefined,
  booking,
  app
});

const bindActions = {
  onLayoutPointList,
  getFormData,
  changeFields,
  changeAddress
};

export default connect(select, bindActions, null, { withRef: true })(BookingEditor);
