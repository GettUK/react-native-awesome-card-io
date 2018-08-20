import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { isNull } from 'lodash';
import { AppState } from 'react-native';

import { AVAILABLE_MAP_SCENES } from 'actions/ui/navigation';
import { changeAddress, setActiveBooking, resetSuggestedAddresses } from 'actions/booking';
import { changePosition, changeRegionToAnimate } from 'actions/ui/map';
import {
  checkMultiplePermissions,
  requestLocation,
  locationPermissions,
  PERMISSION_STATUS
} from 'actions/app/statuses';

import { Alert } from 'components';

import { strings } from 'locales';

import { Coordinates } from 'utils';

import { OrderSet, OrderCreatingSet } from './ViewSets';

import MapView from './MapView';

class MapController extends React.PureComponent {
  state = {
    dragEnable: true,
    isLoadingPickup: false,
    appState: ''
  }

  componentDidMount() {
    this.props.requestLocation();

    this.setWatchPosition();

    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentDidUpdate(prevProps) {
    const {
      currentPosition,
      statuses,
      changeAddress,
      activeBookingId,
      setActiveBooking,
      changeRegionToAnimate
    } = this.props;
    const { currentPosition: currentPositionProps, statuses: statusesProps } = prevProps;

    if (currentPosition !== currentPositionProps && isNull(currentPositionProps)) {
      setTimeout(() => {
        if (activeBookingId) {
          setActiveBooking(activeBookingId);
        } else {
          Coordinates.getNavigatorLocation(this.changePosition, changeAddress);
          changeRegionToAnimate(currentPosition);
        }
      }, 500);
    }

    this.isWatchPosition(statuses, statusesProps);
  }

  // eslint-disable-next-line class-methods-use-this
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);

    Coordinates.clearWatcher();
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/)
      && nextAppState === 'active'
      && !this.getOrder().destinationAddress
    ) {
      this.props.checkMultiplePermissions(['location']).then(({ location }) => {
        if (location === PERMISSION_STATUS.authorized) {
          Coordinates.getNavigatorLocation(this.changePosition, this.props.changeAddress);

          this.setWatchPosition();
        }
      });
    }

    this.setState({ appState: nextAppState });
  }

  isWatchPosition(statuses, statusesProps) {
    if (
      statuses.permissions && statusesProps.permissions &&
      statuses.permissions.location !== statusesProps.permissions.location &&
      locationPermissions.includes(statuses.permissions.location)
    ) {
      this.setWatchPosition();
    }
  }

  setWatchPosition = () => {
    this.props.checkMultiplePermissions(['location']).then(({ location }) => {
      if (location === PERMISSION_STATUS.authorized) {
        Coordinates.watchCoordinates(this.changePosition, this.props.changeAddress);
      } else if (location === PERMISSION_STATUS.denied) {
        this.alertGPS.show();
      }
    });
  };

  changePosition = (coordinates) => {
    const { currentPosition, currentOrder } = this.props;
    const { latitude, longitude } = currentPosition || {};

    if (coordinates && (coordinates.latitude !== latitude || coordinates.longitude !== longitude) && !currentOrder.id) {
      this.props.changePosition(coordinates);

      this.props.resetSuggestedAddresses({ lat: coordinates.latitude, lng: coordinates.longitude });
    }
  };

  getCurrentPosition = () => {
    const { currentPosition, currentOrder } = this.props;

    Coordinates.getNavigatorLocation(this.changePosition, this.props.changeAddress);
    if (!isNull(currentPosition) && !currentOrder.id) {
      this.props.changeRegionToAnimate(currentPosition);
    }
  };

  resizeToCoordinate = (coordinates, params) => {
    this.mapView.resizeMapToCoordinates(coordinates, params);
  }

  getOrder(props = this.props) {
    return props.currentOrder.id ? props.currentOrder : props.bookingForm;
  }

  isActiveSceneIs = (name = 'orderCreating') => this.props.activeScene === AVAILABLE_MAP_SCENES[name];

  disableDrag = () => {
    this.setState({ dragEnable: false });
  };

  enableDrag = () => {
    this.setState({ dragEnable: true });
  };

  startLoadingPickup = () => {
    this.setState({ isLoadingPickup: true });
  };

  endLoadingPickup = () => {
    this.setState({ isLoadingPickup: false });
  };

  resizeMapToDriverAndTargetAddress = (type, order) => {
    this.orderSet.resizeMapToDriverAndTargetAddress(type, order);
  }

  renderMap = () => {
    const { dragEnable, isLoadingPickup } = this.state;
    const { onFutureOrderAcceptedReceive } = this.props;
    const isOrderCreating = this.isActiveSceneIs('orderCreating');
    const isCompletedOrder = this.isActiveSceneIs('completedOrder');
    const order = this.getOrder();

    return (
      <MapView
        isOrderCreating={isOrderCreating}
        order={order}
        dragEnable={!isLoadingPickup && dragEnable}
        enableDrag={this.enableDrag}
        disableDrag={this.disableDrag}
        onStartLoadingPickup={this.startLoadingPickup}
        onEndLoadingPickup={this.endLoadingPickup}
      >
        {isOrderCreating
          ? <OrderCreatingSet
            order={order}
            dragEnable={!isLoadingPickup && dragEnable}
            disableDrag={this.disableDrag}
            onEndLoadingPickup={this.endLoadingPickup}
          />
          : <OrderSet
            innerRef={(orderSet) => { this.orderSet = orderSet; }}
            order={order}
            isCompletedOrder={isCompletedOrder}
            disableDrag={this.disableDrag}
            onFutureOrderAcceptedReceive={onFutureOrderAcceptedReceive}
          />
        }
      </MapView>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderMap()}

        <Alert
          ref={(alert) => { this.alertGPS = alert; }}
          type="warning"
          message={strings('alert.message.notReceivedCoordinates')}
          position="top"
        />
      </Fragment>
    );
  }
}


const mapState = ({ ui, booking, app, session }) => ({
  activeScene: ui.navigation.activeScene,
  bookingForm: booking.bookingForm,
  currentOrder: booking.currentOrder,
  currentPosition: ui.map.currentPosition,
  statuses: app.statuses,
  activeBookingId: session.user && session.user.activeBookingId
});

const mapDispatch = {
  requestLocation,
  checkMultiplePermissions,
  changeAddress,
  changePosition,
  setActiveBooking,
  changeRegionToAnimate,
  resetSuggestedAddresses
};

export default connect(mapState, mapDispatch, null, { withRef: true })(MapController);
