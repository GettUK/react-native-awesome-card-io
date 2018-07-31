import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  BackHandler
} from 'react-native';
import { Answers } from 'react-native-fabric';
import { isEmpty, throttle } from 'lodash';

import { UserGuide, OrderHeader } from 'components';

import { OrderCreatingScene } from 'containers';

import {
  removeFields,
  toggleVisibleModal,
  resetBookingValues,
  clearCurrentOrder,
  setActiveBooking
} from 'actions/booking';
import { AVAILABLE_MAP_SCENES } from 'actions/ui/navigation';

import { bookingFieldsToReset } from 'utils';
import PN from 'utils/notifications';

import OrderScene from './OrderScene';
import OrderDetailsPanel from './ActiveOrderScene/OrderDetailsPanel';

import MapController from './MapController/MapController';

import styles from './style';

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

  componentDidUpdate() {
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
      const { booking: { bookingForm } } = this.props;

      if (!isOrderCreating) {
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

  goToOrders = ({ fromSettings = false }) => {
    Answers.logContentView('Orders was opened', 'screen view', 'ordersOpen');

    this.props.navigation.navigate('OrdersView', {
      onBack: this.handleBackFromOrderList,
      fromSettings,
      onGoToRides: this.goToOrders,
      onChangeTab: this.setActiveRouteTab
    });
  };

  clearFields = () => {
    const { removeFields, resetBookingValues } = this.props;

    removeFields(bookingFieldsToReset);
    resetBookingValues();
  };

  getCurrentPosition = () => {
    this.mapView.wrappedInstance.getCurrentPosition();
  };

  goToInitialization = () => {
    this.clearFields();

    this.props.clearCurrentOrder();

    this.getCurrentPosition();
  };

  handleBackBtnPress = () => {
    const isActiveOrder = this.isActiveSceneIs('activeOrder');
    const isCompletedOrder = this.isActiveSceneIs('completedOrder');
    const { clearCurrentOrder, navigation } = this.props;
    const { routeNameTab, fromOrderList, fromSettings, isPanelDisabled } = this.state;

    if ((isActiveOrder || isCompletedOrder) && !isPanelDisabled) {
      this.handleHidePanel();
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

    return this.isActiveSceneIs('orderCreating')
      ? null
      : (
        <OrderHeader
          status={status}
          handlePressBack={this.handleBackBtnPress}
          handlePressCreateNew={this.createNewOrder}
        />
      );
  };

  onActivatePanel = () => {
    Answers.logCustom('user opens order details');
    this.handleShowPanel();
  };

  createNewOrder = () => {
    Answers.logCustom('user clicks create new order');
    this.goToInitialization();
  };

  render() {
    const { navigation, session: { user } } = this.props;
    const { isPanelDisabled, nightMode } = this.state;
    const isOrderCreating = this.isActiveSceneIs('orderCreating');
    const isActiveOrder = this.isActiveSceneIs('activeOrder');
    const isCompletedOrder = this.isActiveSceneIs('completedOrder');

    return (
      <View style={styles.container}>
        {this.renderHeader()}

        {!isEmpty(user) && !user.guidePassed && <UserGuide />}

        {isOrderCreating &&
          <OrderCreatingScene
            navigation={navigation}
            getCurrentPosition={this.getCurrentPosition}
            nightMode={nightMode}
            goToOrders={this.goToOrders}
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

        {(isActiveOrder || isCompletedOrder) &&
          <OrderDetailsPanel
            navigation={navigation}
            onClose={this.handleHidePanel}
            onActivate={this.onActivatePanel}
            visible={!isPanelDisabled}
          />
        }
      </View>
    );
  }
}

Map.propTypes = {
  navigation: PropTypes.object.isRequired,
  booking: PropTypes.object.isRequired,
  removeFields: PropTypes.func.isRequired,
  toggleVisibleModal: PropTypes.func.isRequired
};

const mapState = ({ ui, booking, session }) => ({
  session,
  activeScene: ui.navigation.activeScene,
  booking,
  status: booking.currentOrder.indicatedStatus || 'connected'
});

const mapDispatch = {
  removeFields,
  toggleVisibleModal,
  clearCurrentOrder,
  resetBookingValues,
  setActiveBooking
};

export default connect(mapState, mapDispatch)(Map);
