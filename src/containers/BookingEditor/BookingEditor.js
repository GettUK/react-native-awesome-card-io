import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Dimensions } from 'react-native';
import moment from 'moment-timezone';
import { isEmpty, find, isEqual, has } from 'lodash';

import { getFormData } from 'actions/booking';
import { changeFields, changeAddress } from 'actions/ui/map';
import { onLayoutPointList } from 'actions/app/statuses';

import { PointList, AddressModal, StopPointsModal } from 'components';

import { isIphoneX } from 'utils';
import BookingFooter from './BookingFooter';
import { prepareDefaultValues } from './utils';
import styles from './style';

class BookingEditor extends Component {
  state = {
    loadBookingRequested: false,
    isStopPointsModalVisible: false
  };

  componentWillReceiveProps({ bookings: { formData }, map }, { isStopPointsModalVisible }) {
    const { map: propsMap, requestVehicles, memberId, passenger } = this.props;

    const isDriveChanged = (!formData.vehicles.loaded && !formData.vehicles.loading) ||
      !isEqual(map.fields.stops, propsMap.fields.stops) ||
      !isEqual(map.fields.pickupAddress, propsMap.fields.pickupAddress) ||
      !isEqual(map.fields.destinationAddress, propsMap.fields.destinationAddress) ||
      !isEqual(map.fields.paymentMethod, propsMap.fields.paymentMethod);

    if (!isStopPointsModalVisible && isDriveChanged) {
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
          message: data.defaultDriverMessage && `Pick up: ${data.defaultDriverMessage}`,
          defaultDriverMessage: `Pick up: ${data.defaultDriverMessage}`,
          bookerReferences: data.bookingReferences.map(r => ({ ...r, bookingReferenceId: r.id }))
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
    const { map: { fields: { destinationAddress, stops } } } = this.props;

    const stopsObject = (stops || []).reduce((stop, item, index) => ({
      ...stop,
      [`stop${index}`]: item
    }), {});

    return {
      ...stopsObject,
      [`stop${(stops || []).length}`]: destinationAddress
    };
  };

  getHeight = (type) => {
    const { app: { statuses: { params } } } = this.props;
    return (params[type] && params[type].height) || 0;
  };

  getPointListPosition = () => {
    const { height } = Dimensions.get('window');
    const header = ((isIphoneX() ? 49 : 30) + 55);

    if (!!this.getHeight('footer') && !!this.getHeight('pointList')) {
      return { top: (height - this.getHeight('footer') - this.getHeight('pointList') - header) };
    }

    return { top: 0 };
  };

  footerInstance = () => this.footerView && this.footerView.wrappedInstance;

  render() {
    const {
      navigation,
      getCurrentPosition,
      toOrder,
      requestVehicles,
      passenger,
      map: { fields },
      bookings: { formData: { vehicles } },
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
            data={fields}
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
  map: PropTypes.object.isRequired,
  memberId: PropTypes.number,
  bookings: PropTypes.object,
  getFormData: PropTypes.func.isRequired,
  changeFields: PropTypes.func.isRequired,
  passenger: PropTypes.object,
  requestVehicles: PropTypes.func.isRequired,
  isAuthorizedPermission: PropTypes.func.isRequired
};

BookingEditor.defaultProps = {
  passenger: {}
};

const select = ({ ui, session, bookings, app }) => ({
  map: ui.map,
  memberId: has(session.result, 'memberId') ? session.result.memberId : undefined,
  bookings,
  app
});

const bindActions = {
  onLayoutPointList,
  getFormData,
  changeFields,
  changeAddress
};

export default connect(select, bindActions, null, { withRef: true })(BookingEditor);
