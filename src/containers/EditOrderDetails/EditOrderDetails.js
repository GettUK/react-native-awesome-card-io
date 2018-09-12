import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';

import {
  changeFields,
  changeAddress,
  asyncChangeFields,
  getVehicles,
  createBooking,
  saveFlight,
  setReferenceErrors,
  validateReferences,
  saveAvailableCarsScroll,
  updateBooking
} from 'actions/booking';
import { getPassengerData } from 'actions/passenger';

import BookingController from 'containers/BookingController';
import { strings } from 'locales';

import { withTheme } from 'providers';

import styles from './styles';

class EditOrderDetails extends BookingController {
  componentDidMount() {
    if (this.props.onCloseEditor) {
      this.props.navigation.setParams({ restoreFutureOrder: this.props.onCloseEditor });
    }
  }

  componentDidUpdate({ booking: { bookingForm } }) {
    super.componentDidMount();
    const { params } = this.props.navigation.state;

    if ((params && params.futureFlightOrder && this.props.booking.bookingForm.destinationAddress)
      || (params && params.shouldRequestVehicles)) {
      this.requestVehiclesOnOrderChange(bookingForm);
    }
  }

  renderOrderOptions = () => {
    const { theme, booking: { formData } } = this.props;

    return (
      <ScrollView style={[styles.flex, { backgroundColor: theme.color.bgSettings }]}>
        {this.renderPickUpTime({ style: styles.pickUpTimeWrapper })}

        <View style={[styles.contentBlock, styles.mainInfoContainer, { backgroundColor: theme.color.bgPrimary }]}>
          {this.renderPointList({ style: styles.pointList })}
          {this.renderCars()}
        </View>
        {this.renderAdditionalDetails({
            style: [styles.contentBlock, styles.detailsContainer, { backgroundColor: theme.color.bgPrimary }],
            items: this.getAdditionalDetailsItems()
        })}
        {formData.bookingReferences.length > 0 && (
          this.renderAdditionalDetails({
            style: [styles.contentBlock, styles.detailsContainer, { backgroundColor: theme.color.bgPrimary }],
            items: this.getReferencesItems(),
            label: strings('order.text.bookingReferences'),
            labelStyle: styles.labelStyle
          })
        )}
        <View style={styles.spacer} />
      </ScrollView>
    );
  };

  renderContent() {
    const { booking: { formData, vehicles, currentOrder: { busy } } } = this.props;

    const isOrderBtnDisabled = formData.serviceSuspended || busy || vehicles.loading || !this.shouldOrderRide();

    return (
      <Fragment>
        {this.renderOrderOptions()}
        {this.renderBookingBtn({
          title: 'Order Ride',
          style: [styles.orderRideBtnWrapper, { backgroundColor: this.props.theme.color.bgPrimary }],
          disabled: isOrderBtnDisabled,
          loading: busy,
          onPress: this.handleBookingCreation
        })}
      </Fragment>
    );
  }

  render() {
    return super.render(this.renderContent);
  }
}

EditOrderDetails.propTypes = {
  navigation: PropTypes.object,
  booking: PropTypes.object,
  passenger: PropTypes.object,
  getPassengerData: PropTypes.func,
  getVehicles: PropTypes.func,
  changeFields: PropTypes.func,
  changeAddress: PropTypes.func,
  setReferenceErrors: PropTypes.func,
  saveFlight: PropTypes.func,
  createBooking: PropTypes.func,
  validateReferences: PropTypes.func,
  getFormData: PropTypes.func
};

EditOrderDetails.defaultProps = {
  passenger: {},
  orderType: 'bookingForm'
};

const select = ({ booking, passenger }) => ({
  booking,
  passenger
});

const bindActions = {
  changeFields,
  changeAddress,
  asyncChangeFields,
  getVehicles,
  createBooking,
  getPassengerData,
  setReferenceErrors,
  validateReferences,
  saveFlight,
  saveAvailableCarsScroll,
  updateBooking
};

export default connect(select, bindActions)(withTheme(EditOrderDetails));
