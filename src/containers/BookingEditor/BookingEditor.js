import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import moment from 'moment-timezone';
import { isEmpty, find, isEqual, has } from 'lodash';

import { getFormData, changeFields, changeAddress, setActiveBooking } from 'actions/booking';
import { onLayoutPointList } from 'actions/app/statuses';

import { PointList, AddressModal, StopPointsModal } from 'components';

import { getHeight } from 'utils';
import BookingFooter from './BookingFooter';

import { PromoBlackTaxi } from './components';

import { prepareDefaultValues } from './utils';
import styles from './style';

class BookingEditor extends Component {
  state = {
    loadBookingRequested: false,
    isStopPointsModalVisible: false,
    isPromoAvailable: false,
    isPromoWasShown: false
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

    this.showPromo();
  }

  showPromo = () => {
    const { booking: { vehicles, bookingForm }, passengerData } = this.props;
    const { isPromoAvailable, isPromoWasShown } = this.state;

    const defaultVehicle = passengerData.defaultVehicle;
    const blackCabAvailable = (vehicles.data.find(car => car.name === 'BlackTaxi') || {}).available;
    const isGBPath = bookingForm.pickupAddress && bookingForm.pickupAddress.countryCode === 'GB' &&
      bookingForm.destinationAddress && bookingForm.destinationAddress.countryCode === 'GB';

    if ((vehicles.loaded && defaultVehicle !== 'BlackTaxi') &&
      bookingForm.scheduledType === 'now' && isGBPath && blackCabAvailable &&
      (!isPromoAvailable && !isPromoWasShown)) {
      this.setState({ isPromoAvailable: true });
    }
  }

  loadBooking = () => {
    const { getFormData, memberId, changeFields, activeBookingId, setActiveBooking } = this.props;

    getFormData()
      .then((data) => {
        const { ui: { map: { currentPosition } }, booking: { bookingForm } } = this.props;
        const { passenger: dataPassenger, passengers } = data;
        const passenger = dataPassenger || (memberId && find(passengers, { id: memberId }));

        let attrs = {
          message: data.defaultDriverMessage && `Pick up: ${data.defaultDriverMessage}`,
          bookerReferences: data.bookingReferences.map(r => ({ ...r, bookingReferenceId: r.id }))
        };

        if (!currentPosition && !bookingForm.pickupAddress) {
          attrs = {
            ...attrs,
            pickupAddress: data.defaultPickupAddress
          };
        }

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

        if (activeBookingId && currentPosition) {
          setActiveBooking(activeBookingId);
        }
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

  selectBlackCab = () => {
    this.footerInstance().selectVehicle('BlackTaxi');
  }

  closePromo = () => {
    this.props.onHidePromo();

    this.setState({ isPromoAvailable: false, isPromoWasShown: true });
  }

  resetPromo = () => {
    this.setState({ isPromoWasShown: false });
  }

  onChangeAddress = (address, meta) => {
    const { booking, changeAddress, changeFields } = this.props;

    if (meta.type === 'pickupAddress' && address.countryCode !== 'GB' && booking.bookingForm.stops) {
      changeFields({ stops: [] });
    }

    changeAddress(address, meta);
  }

  render() {
    const {
      navigation,
      getCurrentPosition,
      toOrder,
      requestVehicles,
      passenger,
      booking: { vehicles, bookingForm },
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
          onChange={this.onChangeAddress}
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
          onBookingCreation={this.closePromo}
          ref={(footer) => { this.footerView = footer; }}
        />

        {this.state.isPromoAvailable &&
          <PromoBlackTaxi onClose={this.closePromo} onSelect={this.selectBlackCab} />
        }
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

const select = ({ session, booking, app, ui, passenger }) => ({
  memberId: has(session.user, 'memberId') ? session.user.memberId : undefined,
  booking,
  app,
  ui,
  passengerData: passenger.data.passenger,
  activeBookingId: session.user && session.user.activeBookingId
});

const bindActions = {
  onLayoutPointList,
  getFormData,
  changeFields,
  changeAddress,
  setActiveBooking
};

export default connect(select, bindActions, null, { withRef: true })(BookingEditor);
