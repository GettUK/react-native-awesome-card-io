import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  BackHandler
} from 'react-native';
import { has, isEmpty, throttle } from 'lodash';

import { Icon, UserGuide, OrderCreatingHeader, OrderHeader } from 'components';

import { BookingEditor } from 'containers/BookingEditor';

import { changePosition, errorPosition } from 'actions/ui/map';
import {
  createBooking,
  removeFields,
  changeFields,
  getVehicles,
  toggleVisibleModal,
  completeOrder,
  resetBookingValues,
  clearCurrentOrder,
  setActiveBooking,
  changeAddress
} from 'actions/booking';
import { checkMultiplePermissions } from 'actions/app/statuses';
import { AVAILABLE_MAP_SCENES } from 'actions/ui/navigation';

import { strings } from 'locales';
import {
  showConfirmationAlert,
  setDefaultTimezone
} from 'utils';
import PN from 'utils/notifications';

import OrderScene from './OrderScene';
import OrderDetailsPanel from './ActiveOrderScene/OrderDetailsPanel';

import MapController from './MapController/MapController';

import styles from './style';

const CURRENT_ROUTE = 'MapView';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeNameTab: 'Personal',
      isPanelDisabled: true,
      fromOrderList: false,
      fromSettings: false,
      nightMode: false
    };
  }

  componentDidMount() {
    this.registerBackListener();

    PN.addNotificationListener({ userToken: this.props.session.token, setActiveBooking: this.props.setActiveBooking });
  }

  componentDidUpdate(prevProps) {
    const { booking: { bookingForm: { pickupAddress } } } = this.props;
    const { booking: { bookingForm: { pickupAddress: pickupAddressProps } } } = prevProps;

    if (pickupAddress !== pickupAddressProps && pickupAddress) {
      setDefaultTimezone(pickupAddress.timezone);
    }

    this.checkForNightMode();
  }

  componentWillUnmount() {
    PN.clearNotificationListener();

    this.backListener.remove();

    BackHandler.removeEventListener('hardwareBack');
  }

  registerBackListener = () => {
    this.backListener = BackHandler.addEventListener('hardwareBack', () => {
      const isOrderCreating = this.isActiveSceneIs('orderCreating');
      const orderCreatingRoutes = [
        'MessageToDriver', 'ReasonForTravel', 'PaymentsOptions', 'References', 'FlightSettings'
      ];
      const { booking: { bookingForm }, navigation: { dangerouslyGetParent } } = this.props;
      const parentRoute = dangerouslyGetParent().state;
      const route = parentRoute.routes[parentRoute.index];

      if (route.routeName !== (CURRENT_ROUTE || 'TransitionLoading')) {
        if (orderCreatingRoutes.includes(route.routeName) &&
          isOrderCreating && bookingForm.destinationAddress
        ) {
          this.props.toggleVisibleModal('settings');
        }
        this.goBack();
        if (route.routeName === 'OrdersView' && route.params.fromSettings) {
          this.goToSettings();
        }
        return true;
      } else if (!(isOrderCreating && !this.shouldRequestVehicles())) {
        this.handleBackBtnPress();
        return true;
      } else if (!isOrderCreating || bookingForm.destinationAddress) {
        this.goBack();
        return true;
      }

      return false;
    });
  };

  checkForNightMode = throttle(() => {
    const hour = (new Date()).getHours();
    this.setState({ nightMode: hour >= 21 || hour < 5 });
  }, 20000);

  goBack = () => {
    this.props.navigation.dispatch({
      type: 'Navigation/BACK'
    });
  };

  resizeMapToDriverAndTargetAddress = (type, order) =>
    this.mapView && this.mapView.wrappedInstance.resizeMapToDriverAndTargetAddress(type, order);

  isActiveSceneIs = (name = 'orderCreating') => this.props.activeScene === AVAILABLE_MAP_SCENES[name];

  shouldRequestVehicles = () => {
    const { booking: { bookingForm } } = this.props;
    return has(bookingForm, 'pickupAddress') &&
      bookingForm.pickupAddress.countryCode &&
      has(bookingForm, 'destinationAddress') &&
      bookingForm.destinationAddress.countryCode &&
      this.isPassengerPresent();
  };

  isPassengerPresent = () => {
    const { booking: { bookingForm } } = this.props;
    return !!bookingForm.passengerId;
  };

  handleBackFromOrderList = ({ fromSettings = false }) => {
    this.setState({ fromOrderList: true, fromSettings });
  };

  setActiveRouteTab = (routeNameTab) => {
    this.setState({ routeNameTab });
  };

  handleShowPanel = () => {
    this.setState({ isPanelDisabled: false });
  };

  handleHidePanel = () => {
    this.setState({ isPanelDisabled: true });
  };

  goToSettings = () => {
    this.props.navigation.navigate('Settings', { onGoToRides: this.goToOrders });
  };

  goToOrders = ({ fromSettings = false }) => {
    this.props.navigation.navigate('OrdersView', {
      onBack: this.handleBackFromOrderList,
      fromSettings,
      onGoToRides: this.goToOrders,
      onChangeTab: this.setActiveRouteTab
    });
  };

  clearFields = () => {
    const { removeFields, resetBookingValues } = this.props;
    removeFields([
      'stops', 'destinationAddress',
      'vehiclePrice', 'vehicleValue', 'vehicleName',
      'travelReasonId', 'flight'
    ]);
    resetBookingValues();

    setTimeout(() => {
      this.editorView.wrappedInstance.closePromo();
      this.editorView.wrappedInstance.resetPromo();
    }, 500);
  };

  getCurrentPosition = () => {
    this.mapView.wrappedInstance.getCurrentPosition();
  };

  goToInitialization = () => {
    this.clearFields();

    this.props.clearCurrentOrder();

    this.getCurrentPosition();
  };

  cancelOrderCreation = () => {
    showConfirmationAlert({ title: strings('alert.title.cancelOrderCreation'), handler: this.clearFields });
  };

  handleBackBtnPress = () => {
    const isOrderCreating = this.isActiveSceneIs('orderCreating');
    const isActiveOrder = this.isActiveSceneIs('activeOrder');
    const isCompletedOrder = this.isActiveSceneIs('completedOrder');
    const { clearCurrentOrder, navigation } = this.props;
    const { routeNameTab, fromOrderList, fromSettings, isPanelDisabled } = this.state;

    if ((isActiveOrder || isCompletedOrder) && !isPanelDisabled) {
      this.handleHidePanel();
    } else if (isOrderCreating) {
      this.cancelOrderCreation();
    } else if (fromOrderList) {
      this.goToOrders({ fromSettings });
      navigation.navigate(routeNameTab);
      setTimeout(clearCurrentOrder); // needed for smooth navigation animation

      this.getCurrentPosition();

      this.setState({ fromOrderList: false, fromSettings: false });
    } else {
      this.goToInitialization();
    }
  };

  renderHeader = () => {
    const { status } = this.props;
    const { nightMode } = this.state;

    return this.isActiveSceneIs('orderCreating')
      ? (
        <OrderCreatingHeader
          type={!this.shouldRequestVehicles() ? 'dashboard' : 'orderCreating'}
          handlePressBurger={this.goToSettings}
          handlePressBack={this.handleBackBtnPress}
          handlePressOrder={this.goToOrders}
          nightMode={nightMode}
        />
      )
      : (
        <OrderHeader
          status={status}
          handlePressBack={this.handleBackBtnPress}
          handlePressCreateNew={this.goToInitialization}
        />
      );
  };

  renderPickUpMarker = () => (
    <Icon name="sourceMarker" width={32} height={52} style={styles.pickUpMarker} />
  );

  render() {
    const { navigation, booking: { bookingForm }, session: { user } } = this.props;
    const { isPanelDisabled, nightMode } = this.state;
    const isOrderCreating = this.isActiveSceneIs('orderCreating');
    const isActiveOrder = this.isActiveSceneIs('activeOrder');
    const isCompletedOrder = this.isActiveSceneIs('completedOrder');

    return (
      <View style={styles.container}>

        {this.renderHeader()}

        {!isEmpty(user) && !user.guidePassed && <UserGuide />}

        {isOrderCreating &&
          <BookingEditor
            navigation={navigation}
            getCurrentPosition={this.getCurrentPosition}
            toOrder={this.shouldRequestVehicles()} // TODO pls rename this prop
            onHidePromo={this.handleHidePanel}
            ref={(editor) => { this.editorView = editor; }}
          />
        }
        {(isActiveOrder || isCompletedOrder) &&
          <OrderScene
            resizeMapToDriverAndTargetAddress={this.resizeMapToDriverAndTargetAddress}
            nightMode={nightMode}
          />
        }

        <MapController
          ref={(el) => { this.mapView = el; }}
          nightMode={nightMode}
          onFutureOrderAcceptedReceive={this.handleShowPanel}
        />

        {isOrderCreating && !bookingForm.destinationAddress && this.renderPickUpMarker()}

        {(isActiveOrder || isCompletedOrder) &&
          <OrderDetailsPanel
            navigation={navigation}
            onClose={this.handleHidePanel}
            onActivate={this.handleShowPanel}
            visible={!isPanelDisabled}
          />
        }
      </View>
    );
  }
}

Map.propTypes = {
  navigation: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  booking: PropTypes.object.isRequired,
  getVehicles: PropTypes.func.isRequired,
  removeFields: PropTypes.func.isRequired,
  changeFields: PropTypes.func.isRequired,
  changePosition: PropTypes.func.isRequired,
  errorPosition: PropTypes.func.isRequired,
  toggleVisibleModal: PropTypes.func.isRequired,
  checkMultiplePermissions: PropTypes.func.isRequired
};

Map.defaultProps = {
};

const mapState = ({ app, ui, booking, session, passenger }) => ({
  app,
  map: ui.map,
  session,
  activeScene: ui.navigation.activeScene,
  booking,
  status: booking.currentOrder.indicatedStatus || 'connected',
  passenger
});

const mapDispatch = {
  removeFields,
  changeFields,
  changePosition,
  errorPosition,
  createBooking,
  getVehicles,
  toggleVisibleModal,
  completeOrder,
  checkMultiplePermissions,
  clearCurrentOrder,
  resetBookingValues,
  setActiveBooking,
  changeAddress
};

export default connect(mapState, mapDispatch)(Map);
