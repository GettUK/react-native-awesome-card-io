import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import moment from 'moment-timezone';
import { isEmpty, isEqual, has, isNull } from 'lodash';

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

import { Popup, Button, Icon } from 'components';

import { strings } from 'locales';
import { getHeight, prepareCoordinates, getPassengerPayload } from 'utils';

import BookingController from './BookingController';
import { PromoBlackTaxi } from './components';

import styles from './style';

class BookingEditor extends BookingController {
  state = {
    loadBookingRequested: false,
    isStopPointsModalVisible: false,
    isPromoAvailable: false,
    isPromoWasShown: false
  };

  componentDidUpdate(prevProps) {
    super.componentDidUpdate(prevProps);
    const { booking: { bookingForm: bookingFormProps }, memberId } = prevProps;
    const { booking: { vehicles, bookingForm }, getFormData } = this.props;
    const { isStopPointsModalVisible } = this.state;

    const isDriveChanged = (!vehicles.loaded && !vehicles.loading) ||
      !isEqual(bookingForm.stops, bookingFormProps.stops) ||
      !isEqual(bookingForm.pickupAddress, bookingFormProps.pickupAddress) ||
      !isEqual(bookingForm.destinationAddress, bookingFormProps.destinationAddress) ||
      !isEqual(bookingForm.paymentMethod, bookingFormProps.paymentMethod);

    if (!isStopPointsModalVisible && isDriveChanged) {
      this.requestVehicles();
    }

    // TODO pls refactor next check to avoid indirect evidence
    if (memberId && !this.state.loadBookingRequested && isEmpty(this.getPassenger())) {
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
  };

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
          attrs = {
            ...attrs,
            pickupAddress: data.defaultPickupAddress
          };

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

    if (getHeight(footer)) {
      return { bottom: getHeight(footer) + 5 };
    }

    return { bottom: 0 };
  };

  onLayout = (e) => {
    this.props.onLayoutFooter(e.nativeEvent.layout);
  };

  selectBlackCab = () => {
    this.selectVehicle('BlackTaxi');
  };

  showLocationPopup = () => {
    this.locationPopup.open();
  };

  closePromo = () => {
    this.props.onHidePromo();

    this.setState({ isPromoAvailable: false, isPromoWasShown: true });
  };

  resetPromo = () => {
    this.setState({ isPromoWasShown: false });
  };

  isAuthorizedPermission = (permission) => {
    const { permissions } = this.props;

    return permissions && permissions[permission] === PERMISSION_STATUS.authorized;
  };

  openSettings = () => {
    this.locationPopup.close();
    openSettingsPermissions();
  };

  renderAddressItem = (address, label) => {
    const handlerPress = () => this.props.changeAddress({ ...address, label }, { type: 'destinationAddress' });

    return (
      <Button
        key={address.id || label}
        onPress={handlerPress}
        styleContent={styles.destinationBtn}
        style={styles.padding}
      >
        <Text style={styles.customDestinationText}>{label}</Text>
      </Button>
    );
  };

  renderFavouriteAddresses() {
    const passenger = this.getPassenger();

    return (
      <ScrollView
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
      </ScrollView>
    );
  }

  renderAddressesSelector() {
    return (
      <View style={styles.selectAddress}>
        {this.renderPointList({ style: styles.pointList })}
        <View style={styles.destinationBtnsContainer}>
          {this.props.booking.formData.busy
            ? <ActivityIndicator style={styles.destinationBtnsSpinner} size="small" color="#8794a0" />
            : this.renderFavouriteAddresses()
          }
        </View>
      </View>
    );
  }

  renderContent() {
    const {
      getCurrentPosition,
      booking: { vehicles },
      onLayoutPointList,
      ui: { map: { currentPosition } }
    } = this.props;

    const isActiveLocation = this.isAuthorizedPermission('location') && !isNull(currentPosition);
    const availableVehicles = this.getAvailableVehicles();
    const shouldRequestVehicles = this.shouldRequestVehicles();

    return (
      <View style={styles.wrapper} pointerEvents="box-none">
        {shouldRequestVehicles && !vehicles.loading &&
          this.renderPointList({
            style: [styles.floatedPointList, this.getPointListPosition()],
            onLayout: onLayoutPointList
          })
        }

        <View
          onLayout={this.onLayout}
          style={styles.footer}
          pointerEvents="box-none"
        >
          {
            !shouldRequestVehicles && (
              <View pointerEvents="box-none">
                <Button
                  style={styles.currentPositionBtn}
                  styleContent={[styles.currentPositionBtnContent, styles.btnView]}
                  onPress={isActiveLocation ? getCurrentPosition : this.showLocationPopup}
                >
                  <Icon name={isActiveLocation ? 'myLocation' : 'inactiveLocation' } size={22} color="#284784" />
                </Button>
                {this.renderAddressesSelector()}
                <Popup
                  ref={(popup) => { this.locationPopup = popup; }}
                  titleStyle={styles.popupLocationTitle}
                  title={strings('popup.locationService.title')}
                  buttons={[
                    {
                      title: strings('popup.locationService.button.сancel'),
                      style: styles.btnStyle,
                      textStyle: styles.btnTextStyle
                    },
                    {
                      title: strings('popup.locationService.button.сonfirm'),
                      onPress: this.openSettings
                    }
                  ]}
                />
              </View>
            )
          }
          {shouldRequestVehicles && !vehicles.loading && availableVehicles.length === 0 &&
            this.renderNoVehiclesMessage()
          }
          {
            shouldRequestVehicles && availableVehicles.length > 0 &&
            (
              <View style={styles.footerOrder} pointerEvents="box-none">
                {this.renderPickUpTime(styles.pickUpTimeWrapper)}

                {this.renderAvailableCars()}
                {this.renderBookingBtn({
                  title: 'Next',
                  style: styles.nextStepBtn,
                  onPress: this.goToEditOrderDetails
                })}
              </View>
            )
          }
        </View>

        {this.state.isPromoAvailable &&
          <PromoBlackTaxi onClose={this.closePromo} onSelect={this.selectBlackCab} />
        }
        <Popup
          ref={(popup) => { this.serviceSuspendedPopup = popup; }}
          title={strings('popup.serviceSuspended.title')}
          titleStyle={styles.serviceSuspendedTitle}
          content={(
            <View>
              <Text style={[styles.serviceSuspendedDescription, styles.serviceSuspendedGreeting]}>
                {strings('popup.serviceSuspended.greeting')}
              </Text>
              <Text style={styles.serviceSuspendedDescription}>
                {strings('popup.serviceSuspended.description')}
              </Text>
              <Text style={styles.serviceSuspendedSign}>
                {strings('popup.serviceSuspended.sign')}
              </Text>
            </View>
          )}
        />
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
  passengerData: passenger.data.passenger,
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
