import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Answers } from 'react-native-fabric';

import { removeFields, resetBookingValues } from 'actions/booking';

import { OrderCreatingHeader, Icon } from 'components';

import { strings } from 'locales';

import {
  showConfirmationAlert,
  bookingFieldsToReset,
  setDefaultTimezone,
  getCurrentRoute,
  isEnoughOrderData
} from 'utils';

import BookingEditor from './BookingEditor';
import PromoBlackTaxi from './components';

import styles from './style';

const CURRENT_ROUTE = 'MapView';

class OrderCreatingScene extends PureComponent {
  state = {
    isPromoAvailable: false,
    isPromoWasShown: false
  };

  componentDidMount() {
    this.backListener = this.setBackButtonHandler();
  }

  componentDidUpdate(prevProps) {
    const { bookingForm: { pickupAddress } } = this.props;
    const { bookingForm: { pickupAddress: pickupAddressProps } } = prevProps;

    if (pickupAddress && pickupAddress !== pickupAddressProps) {
      setDefaultTimezone(pickupAddress.timezone);
    }

    this.showPromo();
  }

  componentWillUnmount() {
    this.backListener.remove();

    BackHandler.removeEventListener('backPress');
  }

  setBackButtonHandler = () => (
    BackHandler.addEventListener('backPress', () => {
      const route = getCurrentRoute(this.props.navigation);

      if (route.routeName !== (CURRENT_ROUTE || 'TransitionLoading')) {
        this.goBack();

        if (route.routeName === 'OrdersView' && route.params.fromSettings) {
          this.goToSettings();
        }
        return true;
      } else if (this.shouldRequestVehicles()) {
        this.cancelOrderCreation();
        return true;
      }

      return true;
    })
  );

  goBack = () => {
    this.props.navigation.dispatch({
      type: 'Navigation/BACK'
    });
  };

  goToSettings = () => {
    Answers.logContentView('Settings was opened', 'screen view', 'settingsOpen');

    this.props.navigation.navigate('Settings', { onGoToRides: this.props.goToOrders });
  };

  clearFields = () => {
    const { removeFields, resetBookingValues } = this.props;
    removeFields(bookingFieldsToReset);
    resetBookingValues();

    setTimeout(() => {
      this.closePromo();
      this.resetPromo();
    }, 500);
  };

  cancelOrderCreation = () => {
    showConfirmationAlert({ title: strings('alert.title.cancelOrderCreation'), handler: this.clearFields });
  };

  shouldRequestVehicles = () =>
    isEnoughOrderData(this.props.bookingForm);

  showPromo = () => {
    const { vehicles, bookingForm, passengerData } = this.props;
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

  closePromo = () => {
    this.setState({ isPromoAvailable: false, isPromoWasShown: true });
  };

  resetPromo = () => {
    this.setState({ isPromoWasShown: false });
  };

  selectBlackCab = () => {
    this.editorView.wrappedInstance.selectVehicle('BlackTaxi');
  }

  renderPickUpMarker = () =>
    <Icon name="sourceMarker" width={32} height={52} style={styles.pickUpMarker} />;

  render() {
    const { bookingForm, nightMode, navigation, getCurrentPosition, goToOrders } = this.props;

    return (
      <Fragment>
        <OrderCreatingHeader
          type={!this.shouldRequestVehicles() ? 'dashboard' : 'orderCreating'}
          handlePressBurger={this.goToSettings}
          handlePressBack={this.cancelOrderCreation}
          handlePressOrder={goToOrders}
          nightMode={nightMode}
        />

        <BookingEditor
          ref={(editor) => { this.editorView = editor; }}
          navigation={navigation}
          getCurrentPosition={getCurrentPosition}
        />

        {this.state.isPromoAvailable &&
          <PromoBlackTaxi onClose={this.closePromo} onSelect={this.selectBlackCab} />
        }

        {!bookingForm.destinationAddress && this.renderPickUpMarker()}
      </Fragment>
    );
  }
}

OrderCreatingScene.propTypes = {
  navigation: PropTypes.object.isRequired,
  nightMode: PropTypes.bool,
  getCurrentPosition: PropTypes.func,
  handleBackBtnPress: PropTypes.func,
  goToOrders: PropTypes.func
};

const mapState = ({ booking, passenger }) => ({
  bookingForm: booking.bookingForm,
  vehicles: booking.vehicles,
  passengerData: passenger.data.passenger
});

const mapDispatch = {
  removeFields,
  resetBookingValues
};

export default connect(mapState, mapDispatch)(OrderCreatingScene);
