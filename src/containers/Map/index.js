import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Answers } from 'react-native-fabric';
import { isEmpty, throttle } from 'lodash';

import { UserGuide } from 'components';

import { OrderCreatingScene, OrderScene } from 'containers';

import { setActiveBooking, clearCurrentOrder } from 'actions/booking';
import { AVAILABLE_MAP_SCENES } from 'actions/ui/navigation';

import PN from 'utils/notifications';

import MapController from './MapController/MapController';

import styles from './style';

class Map extends Component {
  state = {
    routeNameTab: 'Personal',
    fromOrderList: false,
    fromNotifications: false,
    fromSettings: false,
    nightMode: false
  };

  componentDidMount() {
    PN.addNotificationListener({ userToken: this.props.session.token, setActiveBooking: this.props.setActiveBooking });
  }

  componentDidUpdate() {
    this.checkForNightMode();
  }

  // eslint-disable-next-line class-methods-use-this
  componentWillUnmount() {
    PN.clearNotificationListener();
  }

  checkForNightMode = throttle(() => {
    const hour = (new Date()).getHours();
    this.setState({ nightMode: hour >= 21 || hour < 5 });
  }, 20000);

  resizeMapToDriverAndTargetAddress = (type, order) =>
    this.mapView && this.mapView.wrappedInstance.resizeMapToDriverAndTargetAddress(type, order);

  isActiveSceneIs = (name = 'orderCreating') => this.props.activeScene === AVAILABLE_MAP_SCENES[name];

  handleBackFromScreen = ({ fromOrderList = false, fromNotifications = false, fromSettings = false }) => (
    () => {
      this.setState({ fromOrderList, fromNotifications, fromSettings });
    }
  );

  handleBackFromOrderList = ({ fromSettings = false }) => {
    this.setState({ fromOrderList: true, fromSettings });
  };

  setActiveRouteTab = (routeNameTab) => {
    this.setState({ routeNameTab });
  };

  handleShowPanel = () => {
    this.orderScene.wrappedInstance.showPanel();
  };

  goToOrders = ({ fromSettings = false }) => {
    Answers.logContentView('Orders was opened', 'screen view', 'ordersOpen');

    this.props.navigation.navigate('OrdersView', {
      onBack: this.handleBackFromScreen({ fromOrderList: true }),
      fromSettings,
      onGoToRides: this.goToOrders,
      onChangeTab: this.setActiveRouteTab,
      onGoToNotifications: this.goToNotifications
    });
  };

  goToNotifications = ({ fromSettings = false }) => {
    this.props.navigation.navigate('NotificationsView', {
      onBack: this.handleBackFromScreen({ fromNotifications: true }),
      fromSettings,
      onGoToRides: this.goToOrders,
      onGoToNotifications: this.goToNotifications
    });
  };

  returnToOrdersList = () => {
    const { fromSettings, routeNameTab } = this.state;
    const { navigation, clearCurrentOrder } = this.props;

    this.goToOrders({ fromSettings });
    navigation.navigate(routeNameTab);
    setTimeout(clearCurrentOrder); // needed for smooth navigation animation

    this.getCurrentPosition();

    this.handleBackFromOrderList({});
  }

  getCurrentPosition = () => {
    this.mapView.wrappedInstance.getCurrentPosition();
  };

  render() {
    const { navigation, session: { user } } = this.props;
    const { fromOrderList, nightMode } = this.state;
    const isOrderCreating = this.isActiveSceneIs('orderCreating');
    const isActiveOrder = this.isActiveSceneIs('activeOrder');
    const isCompletedOrder = this.isActiveSceneIs('completedOrder');

    return (
      <View style={styles.container}>
        {!isEmpty(user) && !user.guidePassed && <UserGuide />}

        {isOrderCreating &&
          <OrderCreatingScene
            navigation={navigation}
            getCurrentPosition={this.getCurrentPosition}
            nightMode={nightMode}
            goToOrders={this.goToOrders}
            goToNotifications={this.goToNotifications}
          />
        }
        {(isActiveOrder || isCompletedOrder) &&
          <OrderScene
            ref={(el) => { this.orderScene = el; }}
            navigation={navigation}
            fromOrderList={fromOrderList}
            getCurrentPosition={this.getCurrentPosition}
            resizeMapToDriverAndTargetAddress={this.resizeMapToDriverAndTargetAddress}
            returnToOrdersList={this.returnToOrdersList}
            nightMode={nightMode}
          />
        }

        <MapController
          ref={(el) => { this.mapView = el; }}
          nightMode={nightMode}
          onFutureOrderAcceptedReceive={this.handleShowPanel}
        />
      </View>
    );
  }
}

Map.propTypes = {
  navigation: PropTypes.object.isRequired,
  booking: PropTypes.object.isRequired
};

const mapState = ({ ui, booking, session }) => ({
  session,
  activeScene: ui.navigation.activeScene,
  booking,
  status: booking.currentOrder.indicatedStatus || 'connected'
});

const mapDispatch = {
  setActiveBooking,
  clearCurrentOrder
};

export default connect(mapState, mapDispatch)(Map);
