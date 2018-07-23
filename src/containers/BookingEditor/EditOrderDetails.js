import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';

import {
  changeFields,
  changeAddress,
  getVehicles,
  createBooking,
  saveFlight,
  setReferenceErrors,
  validateReferences
} from 'actions/booking';
import { getPassengerData } from 'actions/passenger';

import BookingController from './BookingController';

import styles from './style';
import editStyles from './EditOrderDetailsStyles';

class EditOrderDetails extends BookingController {
  renderContent() {
    const { booking: {
      formData,
      vehicles,
      currentOrder: { busy },
      bookingForm: { bookerReferencesErrors }
    } } = this.props;

    const isOrderBtnDisabled = formData.serviceSuspended || busy || vehicles.loading || !this.shouldOrderRide();

    return (
      <Fragment>
        <ScrollView style={styles.flex}>
          {this.renderPickUpTime(editStyles.pickUpTimeWrapper)}

          <View style={[editStyles.contentBlock, editStyles.mainInfoContainer]}>
            {this.renderPointList({ style: editStyles.pointList })}
            {this.renderAvailableCars()}
          </View>
          {this.renderAdditionalDetails([editStyles.contentBlock, editStyles.detailsContainer])}
          {formData.bookingReferences.length > 0 &&
            <View style={editStyles.contentBlock}>
              {this.renderDetailItem({
                title: 'Booking References',
                value: `${formData.bookingReferences.length} References`,
                onPress: () => this.goTo('References'),
                error: Object.keys(bookerReferencesErrors).length > 0
              })}
            </View>
          }
          <View style={editStyles.spacer} />
        </ScrollView>
        {this.renderBookingBtn({
          title: 'Order Ride',
          style: editStyles.orderRideBtnWrapper,
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
  validateReferences: PropTypes.func
};

EditOrderDetails.defaultProps = {
  passenger: {}
};

const select = ({ booking, passenger }) => ({
  booking,
  passenger
});

const bindActions = {
  changeFields,
  changeAddress,
  getVehicles,
  createBooking,
  getPassengerData,
  setReferenceErrors,
  validateReferences,
  saveFlight
};

export default connect(select, bindActions)(EditOrderDetails);
