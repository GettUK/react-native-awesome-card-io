import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import { changeCoordinatesToResize, changeRegionToAnimate } from 'actions/ui/map';

import { withTheme } from 'providers';

import { prepareCoordinates } from 'utils';
import {
  IN_PROGRESS_STATUS,
  ACTIVE_DRIVER_STATUSES,
  ARRIVED_STATUS,
  FINAL_STATUSES,
  ORDER_RECEIVED_STATUS,
  DRIVER_ON_WAY,
  POINTER_DISPLAY_STATUSES
} from 'utils/orderStatuses';

import { DriverRoute, OrderRoute, RandomRoutes } from '../Routes';
import { SourceActiveMarker } from '../Markers';

import { preparePointsList, getStops } from './utils';

class OrderSet extends React.Component {
  componentDidMount() {
    if (this.shouldShowOrderPath(this.props.order)) {
      this.resizeMapToOrderRoute();
    }

    this.resizeMapOnOpenOrder();
  }

  componentDidUpdate({ order: oldOrder, isCompletedOrder: isCompletedOldOrder }) {
    const { isCompletedOrder } = this.props;

    if (isCompletedOrder && !isCompletedOldOrder) {
      this.resizeMapToOrderRoute();
    } else if (!isCompletedOrder) {
      this.resizeMapOnActiveOrderChange({ oldOrder });
    }
  }

  shouldResizeMapToDriverAndPickupAddress = ({ oldOrder, order }) =>
    order.pickupAddress && order.driverDetails && order.driverDetails.location &&
    ((this.gotNewStatus(oldOrder, order, DRIVER_ON_WAY))
      || (this.gotNewStatus(oldOrder, order, ARRIVED_STATUS)));

  shouldResizeMapToDriverAndDestinationAddress = ({ oldOrder, order }) =>
    order.destinationAddress && order.driverDetails && order.driverDetails.location &&
      this.gotNewStatus(oldOrder, order, IN_PROGRESS_STATUS);

  shouldShowDriverMarker = order => (
    order.driverDetails && order.driverDetails.location
    && (ACTIVE_DRIVER_STATUSES.includes(order.status) || order.status === IN_PROGRESS_STATUS)
  );

  shouldShowOrderPath = order =>
    this.isCompletedOrderStatus(order)
      || (order.status === ORDER_RECEIVED_STATUS && !order.asap)
      || (order.status === DRIVER_ON_WAY && order.driverDetails && !order.driverDetails.location);

  shouldShowPickupMarker = order =>
    !order.destinationAddress &&
      (!POINTER_DISPLAY_STATUSES.includes(order.status) || (order.status === ORDER_RECEIVED_STATUS && !order.asap));

  resizeMapOnOpenOrder = () => {
    const { order, changeRegionToAnimate } = this.props;

    if ((order.status === DRIVER_ON_WAY || order.status === ARRIVED_STATUS) && this.shouldShowDriverMarker(order)) {
      this.resizeMapToDriverAndTargetAddress('pickup', order);
    }

    if (order.status === IN_PROGRESS_STATUS && this.shouldShowDriverMarker(order)) {
      this.resizeMapToDriverAndTargetAddress('destination', order);
    }

    if ((order.status === ORDER_RECEIVED_STATUS && order.asap) || POINTER_DISPLAY_STATUSES.includes(order.status)) {
      changeRegionToAnimate(prepareCoordinates(order.pickupAddress));
    }
  };

  isPathChanged = (order, oldOrder) => (
    (!isEqual(order.pickupAddress, oldOrder.pickupAddress))
    || (order.destinationAddress && !isEqual(order.destinationAddress, oldOrder.destinationAddress))
    || (getStops(order) && !isEqual(getStops(order), getStops(oldOrder)))
  );

  resizeMapOnActiveOrderChange = ({ oldOrder }) => {
    const { order } = this.props;

    if (this.shouldResizeMapToDriverAndPickupAddress({ oldOrder, order })) {
      this.resizeMapToDriverAndTargetAddress('pickup', order);
    }

    if (this.shouldResizeMapToDriverAndDestinationAddress({ oldOrder, order })) {
      this.resizeMapToDriverAndTargetAddress('destination', order); // TODO: need to resize to stops too
    }

    if ((order.status !== oldOrder.status && order.status === ORDER_RECEIVED_STATUS && !order.asap)
      || this.isPathChanged(order, oldOrder)
    ) {
      this.props.onFutureOrderAcceptedReceive();

      this.resizeMapToOrderRoute();
    }
  };

  resizeMapToDriverAndTargetAddress = (type, order) => {
    const dest = prepareCoordinates(order[`${type}Address`]);
    const source = prepareCoordinates(order.driverDetails.location);

    setTimeout(() => this.props.changeCoordinatesToResize([source, dest]));
  };

  resizeMapToOrderRoute = () => {
    const { source, dest, stops } = preparePointsList(this.props.order);

    setTimeout(() => this.props.changeCoordinatesToResize([source, dest, ...stops]));
  };

  gotNewStatus = (oldOrder, order, status) =>
    oldOrder.status !== status && order.status === status;

  isCompletedOrderStatus = order =>
    FINAL_STATUSES.includes(order.status);

  renderDriverRoutes = () => {
    const { order, theme } = this.props;

    const destinationTypes = {
      [ARRIVED_STATUS]: 'source',
      [IN_PROGRESS_STATUS]: 'destination',
      [DRIVER_ON_WAY]: 'eta'
    };

    const destinationAddress = order.status === IN_PROGRESS_STATUS ? order.destinationAddress : order.pickupAddress;

    return this.shouldShowDriverMarker(order)
      ? (
        <DriverRoute
          destinationType={destinationTypes[order.status]}
          source={order.driverDetails.location}
          destination={{ ...destinationAddress, value: order.driverDetails.eta && `${order.driverDetails.eta} min` }}
          stops={order.stops || order.stopAddresses}
          routeHidden={order.status === ARRIVED_STATUS}
          nightMode={theme.type === 'dark'}
          carType={order.vehicleType}
        />
      )
      : null;
  }

  render() {
    const { order, devSettings } = this.props;

    return (
      <Fragment>
        {this.renderDriverRoutes()}

        {this.shouldShowOrderPath(order) && order.destinationAddress &&
          <OrderRoute
            source={order.pickupAddress}
            destination={order.destinationAddress}
            stops={order.stops || order.stopAddresses}
          />
        }

        {this.shouldShowPickupMarker(order) && <SourceActiveMarker coordinate={order.pickupAddress} />}

        {devSettings.showLocatingCarAnimation && <RandomRoutes order={order} />}
      </Fragment>
    );
  }
}

OrderSet.propTypes = {
  order: PropTypes.object.isRequired
};

const mapState = ({ app, booking }) => ({
  vehicles: booking.vehicles,
  devSettings: app.devSettings
});

const mapDispatch = {
  changeCoordinatesToResize,
  changeRegionToAnimate
};

export default connect(mapState, mapDispatch, null)(withTheme(OrderSet));
