import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import moment from 'moment-timezone';
import { isEmpty, has, isNull } from 'lodash';
import { color } from 'theme';

import { changeRegionToAnimate } from 'actions/ui/map';
import {
  getFormData,
  changeFields,
  changeAddress,
  setActiveBooking,
  getVehicles,
  saveAvailableCarsScroll,
  setDefaultMessageToDriver,
  resetSuggestedAddresses
} from 'actions/booking';
import { onLayoutPointList, onLayoutFooter, openSettingsPermissions, PERMISSION_STATUS } from 'actions/app/statuses';
import { getPassengerData } from 'actions/passenger';

import { ServiceSuspendedPopup, LocationPopup, Button, Icon, Badge } from 'components';

import { strings } from 'locales';
import { getHeight, prepareCoordinates, getPassengerPayload } from 'utils';

import BookingController from 'containers/BookingController';

import { withTheme } from 'providers';

import styles from './style';

class BookingEditor extends BookingController {
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

  showServiceSuspendedPopup = () => this.serviceSuspendedPopup.open();

  loadBooking = () => {
    const { getFormData, memberId, changeFields, activeBookingId, setActiveBooking,
      setDefaultMessageToDriver, changeRegionToAnimate, resetSuggestedAddresses } = this.props;

    getFormData()
      .then((data) => {
        const { ui: { map: { currentPosition } }, booking: { bookingForm } } = this.props;

        let attrs = {
          message: data.defaultDriverMessage && `Pick up: ${data.defaultDriverMessage}`,
          bookerReferences: data.bookingReferences.map(r => ({ ...r, bookingReferenceId: r.id }))
        };

        if (!currentPosition && !bookingForm.pickupAddress) {
          attrs = { ...attrs, pickupAddress: data.defaultPickupAddress };

          setDefaultMessageToDriver(data.defaultPickupAddress, { type: 'pickupAddress' });

          changeRegionToAnimate(prepareCoordinates(data.defaultPickupAddress));

          resetSuggestedAddresses({ lat: data.defaultPickupAddress.lat, lng: data.defaultPickupAddress.lng });
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

        if (activeBookingId) {
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
      this.props.navigation.navigate('EditOrderDetails', { theme: this.props.theme });
    }
  };

  goToClosestFutureBooking = bookingId => this.props.setActiveBooking(bookingId);

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
        styleContent={[styles.destinationBtn, { backgroundColor: this.props.theme.color.bgSecondary }]}
        style={styles.padding}
      >
        <Text style={[styles.customDestinationText, { color: this.props.theme.color.primaryText }]}>{label}</Text>
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
      <View style={[styles.selectAddress, { backgroundColor: this.props.theme.color.bgPrimary }]}>
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

  renderBtn = ({ iconName, style, iconSize = 22, onPress }) => (
    <Button
      style={[styles.btnWrapper, style]}
      styleContent={[styles.btnView, { backgroundColor: this.props.theme.color.bgPrimary }]}
      onPress={onPress}
    >
      <Icon name={iconName} size={iconSize} color={this.props.theme.color.primaryBtns}/>
    </Button>
  );

  renderActionsBar = () => {
    const {
      getCurrentPosition,
      closestFutureBookingId,
      futureBookingsCount,
      ui: { map: { currentPosition } }
    } = this.props;

    const isActiveLocation = this.isAuthorizedPermission('location') && !isNull(currentPosition);
    const isActiveFutureOrder = !isNull(closestFutureBookingId) && futureBookingsCount > 0;

    return (
      <View pointerEvents="box-none" style={styles.actionsBar}>
        {this.renderBtn({
          iconName: isActiveLocation ? 'myLocation' : 'inactiveLocation',
          onPress: isActiveLocation ? getCurrentPosition : this.showLocationPopup,
          style: styles.currentPositionBtn
        })}
        {isActiveFutureOrder && (
          <Fragment>
            {this.renderBtn({
              iconName: 'futureOrder',
              iconSize: 26,
              onPress: () => this.goToClosestFutureBooking(closestFutureBookingId),
              style: styles.futureOrderBtn
            })}
            <Badge
              wrapperStyle={styles.badgeWrapper}
              style={styles.badgeStyle}
              textStyle={styles.badgeTextStyle}
              label={futureBookingsCount}
            />
          </Fragment>
        )}
      </View>
    );
  };

  renderFooter = () => {
    const { booking: { vehicles } } = this.props;

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
            {this.renderActionsBar()}
            {this.renderAddressesSelector()}

            <LocationPopup
              popupRef={(popup) => { this.locationPopup = popup; }}
              onPress={this.openSettings}
            />
          </View>
        )}
        {shouldRequestVehicles && !vehicles.loading && availableVehicles.length === 0 &&
          this.renderNoVehiclesMessage()
        }
        {shouldRequestVehicles && availableVehicles.length > 0 &&
          <View style={styles.footerOrder} pointerEvents="box-none">
            {this.renderPickUpTime({ style: styles.pickUpTimeWrapper })}

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
  };

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
  closestFutureBookingId: session.user && session.user.closestFutureBookingId,
  futureBookingsCount: session.user && session.user.futureBookingsCount,
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
  setDefaultMessageToDriver,
  resetSuggestedAddresses
};

export default connect(select, bindActions, null, { pure: false })(withTheme(BookingEditor));
