import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import moment from 'moment-timezone';
import { isEmpty, isEqual, has, isNull } from 'lodash';
import { color } from 'theme';

import { changeRegionToAnimate } from 'actions/ui/map';
import {
  getFormData,
  changeFields,
  changeAddress,
  setActiveBooking,
  getVehicles,
  saveAvailableCarsScroll,
  setDefaultMessageToDriver
} from 'actions/booking';
import { onLayoutPointList, onLayoutFooter, openSettingsPermissions, PERMISSION_STATUS } from 'actions/app/statuses';
import { getPassengerData } from 'actions/passenger';

import { ServiceSuspendedPopup, LocationPopup, Button, Icon } from 'components';

import { strings } from 'locales';
import { getHeight, prepareCoordinates, getPassengerPayload } from 'utils';

import BookingController from 'containers/BookingController';

import styles from './style';

class BookingEditor extends BookingController {
  state = {
    loadBookingRequested: false,
    isStopPointsModalVisible: false
  };

  componentDidUpdate(prevProps) {
    super.componentDidUpdate(prevProps);

    const { booking: { bookingForm: bookingFormProps }, memberId } = prevProps;
    const { booking: { bookingForm }, getFormData } = this.props;
    const { loadBookingRequested } = this.state;

    this.requestVehiclesOnOrderChange(bookingFormProps);

    // TODO pls refactor next check to avoid indirect evidence
    if (memberId && !loadBookingRequested && isEmpty(this.getPassenger())) {
      this.loadBooking();

      this.setState({ loadBookingRequested: true });
    }

    if (bookingForm.destinationAddress && !bookingFormProps.destinationAddress) {
      getFormData();
    }
  }

  requestVehiclesOnOrderChange = (bookingFormProps) => {
    const { booking: { vehicles, bookingForm } } = this.props;
    const { isStopPointsModalVisible } = this.state;
    const isDriveChanged = (!vehicles.loaded && !vehicles.loading) ||
      !isEqual(bookingForm.stops, bookingFormProps.stops) ||
      !isEqual(bookingForm.pickupAddress, bookingFormProps.pickupAddress) ||
      !isEqual(bookingForm.destinationAddress, bookingFormProps.destinationAddress) ||
      !isEqual(bookingForm.paymentMethod, bookingFormProps.paymentMethod);

    if (!isStopPointsModalVisible && isDriveChanged) {
      this.requestVehicles();
    }
  }

  showServiceSuspendedPopup = () => this.serviceSuspendedPopup.open();

  loadBooking = () => {
    const { getFormData, memberId, changeFields, activeBookingId, setActiveBooking } = this.props;

    getFormData()
      .then((data) => {
        const { ui: { map: { currentPosition } }, booking: { bookingForm } } = this.props;

        let attrs = {
          message: data.defaultDriverMessage && `Pick up: ${data.defaultDriverMessage}`,
          bookerReferences: data.bookingReferences.map(r => ({ ...r, bookingReferenceId: r.id }))
        };

        if (!currentPosition && !bookingForm.pickupAddress) {
          attrs = { ...attrs, pickupAddress: data.defaultPickupAddress };

          this.props.setDefaultMessageToDriver(data.defaultPickupAddress, { type: 'pickupAddress' });

          this.props.changeRegionToAnimate(prepareCoordinates(data.defaultPickupAddress));
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

        attrs = { ...attrs, ...getPassengerPayload(data, memberId) };

        changeFields(attrs);

        this.props.getPassengerData();

        if (activeBookingId && currentPosition) {
          setActiveBooking(activeBookingId);
        }
        if (data.serviceSuspended) {
          this.showServiceSuspendedPopup();
        }
      });
  };

  goToEditOrderDetails = () => {
    const { booking: { formData: { serviceSuspended } } } = this.props;

    if (serviceSuspended) {
      this.showServiceSuspendedPopup();
    } else {
      this.props.navigation.navigate('EditOrderDetails');
    }
  };

  getPointListPosition = () => {
    const { app: { statuses: { params: { footer } } } } = this.props;

    return getHeight(footer) ? { bottom: getHeight(footer) + 5, opacity: 1 } : { bottom: 0 };
  };

  onLayout = (e) => {
    this.props.onLayoutFooter(e.nativeEvent.layout);
  };

  showLocationPopup = () => {
    this.locationPopup.open();
  };

  isAuthorizedPermission = permission =>
    this.props.permissions && this.props.permissions[permission] === PERMISSION_STATUS.authorized;

  openSettings = () => {
    this.locationPopup.close();
    openSettingsPermissions();
  };

  renderAddressItem = (address, label) => {
    const handlerPress = () => this.props.changeAddress({ ...address, label }, { type: 'destinationAddress' });

    return <Button
        key={address.id || label}
        onPress={handlerPress}
        styleContent={styles.destinationBtn}
        style={styles.padding}
      >
        <Text style={styles.customDestinationText}>{label}</Text>
      </Button>;
  };

  renderFavouriteAddresses() {
    const passenger = this.getPassenger();

    return <ScrollView
      horizontal
      contentContainerStyle={styles.destinationBtns}
      showsHorizontalScrollIndicator={false}
    >
      {passenger && passenger.homeAddress && passenger.homeAddress.line &&
        this.renderAddressItem(passenger.homeAddress, strings('app.label.home'))
      }
      {passenger && passenger.workAddress && passenger.workAddress.line &&
        this.renderAddressItem(passenger.workAddress, strings('app.label.work'))
      }
      {passenger && (passenger.favoriteAddresses || []).map(address =>
        this.renderAddressItem(address.address, address.name))
      }
    </ScrollView>;
  }

  renderAddressesSelector() {
    return (
      <View style={styles.selectAddress}>
        {this.renderPointList({ style: styles.pointList })}
        <View style={styles.destinationBtnsContainer}>
          {this.props.booking.formData.busy
            ? <ActivityIndicator style={styles.destinationBtnsSpinner} size="small" color={color.secondaryText} />
            : this.renderFavouriteAddresses()
          }
        </View>
      </View>
    );
  }

  renderFooter = () => {
    const { getCurrentPosition, booking: { vehicles }, ui: { map: { currentPosition } } } = this.props;

    const isActiveLocation = this.isAuthorizedPermission('location') && !isNull(currentPosition);
    const availableVehicles = this.getAvailableVehicles();
    const shouldRequestVehicles = this.shouldRequestVehicles();

    return (
      <View
        onLayout={this.onLayout}
        style={styles.footer}
        pointerEvents="box-none"
      >
        {!shouldRequestVehicles && (
          <View pointerEvents="box-none">
            <Button
              style={styles.currentPositionBtn}
              styleContent={[styles.currentPositionBtnContent, styles.btnView]}
              onPress={isActiveLocation ? getCurrentPosition : this.showLocationPopup}
            >
              <Icon name={isActiveLocation ? 'myLocation' : 'inactiveLocation' } size={22} color={color.primaryBtns} />
            </Button>
            {this.renderAddressesSelector()}

            <LocationPopup
              innerRef={(popup) => { this.locationPopup = popup; }}
              onPress={this.openSettings}
            />
          </View>
        )}
        {shouldRequestVehicles && !vehicles.loading && availableVehicles.length === 0 &&
          this.renderNoVehiclesMessage()
        }
        {shouldRequestVehicles && availableVehicles.length > 0 &&
          <View style={styles.footerOrder} pointerEvents="box-none">
            {this.renderPickUpTime(styles.pickUpTimeWrapper)}

            {this.renderAvailableCars()}
            {this.renderBookingBtn({
              title: 'Next',
              style: styles.nextStepBtn,
              onPress: this.goToEditOrderDetails
            })}
          </View>
        }
      </View>
    );
  }

  renderContent() {
    const { booking: { vehicles }, onLayoutPointList } = this.props;

    const shouldRequestVehicles = this.shouldRequestVehicles();

    return (
      <View style={styles.wrapper} pointerEvents="box-none">
        {shouldRequestVehicles && !vehicles.loading &&
          this.renderPointList({
            style: [styles.floatedPointList, this.getPointListPosition()],
            onLayout: onLayoutPointList
          })
        }

        {this.renderFooter()}

        <ServiceSuspendedPopup innerRef={(popup) => { this.serviceSuspendedPopup = popup; }} />
      </View>
    );
  }

  render() {
    return super.render(this.renderContent);
  }
}

BookingEditor.propTypes = {
  navigation: PropTypes.object.isRequired,
  memberId: PropTypes.number,
  booking: PropTypes.object,
  getFormData: PropTypes.func.isRequired,
  changeFields: PropTypes.func.isRequired,
  passenger: PropTypes.object
};

const select = ({ session, booking, app, ui, passenger }) => ({
  memberId: has(session.user, 'memberId') ? session.user.memberId : undefined,
  booking,
  app,
  ui,
  passenger,
  activeBookingId: session.user && session.user.activeBookingId,
  permissions: app.statuses.permissions
});

const bindActions = {
  onLayoutFooter,
  onLayoutPointList,
  getFormData,
  getVehicles,
  getPassengerData,
  changeFields,
  changeAddress,
  setActiveBooking,
  changeRegionToAnimate,
  saveAvailableCarsScroll,
  setDefaultMessageToDriver
};

export default connect(select, bindActions, null, { withRef: true })(BookingEditor);
