import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import {
  changeRegionToAnimate,
  changeCoordinatesToResize,
  getDriversLocations,
  subscribeToDriversLocations
} from 'actions/ui/map';

import { prepareCoordinates } from 'utils';

import {
  CurrentLocation,
  DriversMarkers
} from '../Markers';

import { OrderRoute } from '../Routes';

import { preparePointsList } from './utils';

const pollingInterval = 45 * 1000;

class OrderCreatingSet extends React.Component {
  componentDidMount() {
    this.handleAnimateToRegion();
  }

  componentDidUpdate({ order: oldOrder, dragEnable: oldDragEnable }) {
    const { order, changeCoordinatesToResize, onEndLoadingPickup, dragEnable } = this.props;

    if (this.isPickupAddressWasUpdatedByMapDrag({ order, dragEnable, oldDragEnable, oldOrder })) {
      onEndLoadingPickup();
    } else if (this.shouldAnimateToPickUp({ order, oldOrder })) {
      this.handleAnimateToRegion();
    }

    if (this.isPathChanged(order, oldOrder)) {
      const { source, dest, stops } = preparePointsList(order);
      setTimeout(() => changeCoordinatesToResize([source, dest, ...stops]));
    }

    if (this.shouldGetDriversLocations({ order, oldOrder })) {
      this.getDriversLocations(order.pickupAddress);
    }
  }

  componentWillUnmount() {
    clearInterval(this.getDriversInterval);
  }

  getDriversLocations = (pickupAddress) => {
    clearInterval(this.getDriversInterval);

    this.props.getDriversLocations(pickupAddress);
    this.props.subscribeToDriversLocations(pickupAddress);

    this.getDriversInterval = setInterval(() => {
      const pickUpAddress = this.props.order.pickupAddress;

      this.props.subscribeToDriversLocations(pickUpAddress);
    }, pollingInterval);
  };

  isPathChanged = (order, oldOrder) => (
    (order.pickupAddress && order.destinationAddress) && (
      (order.pickupAddress && !isEqual(order.pickupAddress, oldOrder.pickupAddress))
      || (order.destinationAddress && !isEqual(order.destinationAddress, oldOrder.destinationAddress))
      || (order.stops && !isEqual(order.stops, oldOrder.stops))
    )
  );

  shouldAnimateToPickUp = ({ order, oldOrder }) => (
    (order.pickupAddress !== oldOrder.pickupAddress && !order.destinationAddress && oldOrder.pickupAddress)
    || (!order.destinationAddress && oldOrder.destinationAddress)
  );

  shouldGetDriversLocations = ({ order, oldOrder }) =>
    order.pickupAddress && order.pickupAddress !== oldOrder.pickupAddress;

  isPickupAddressWasUpdatedByMapDrag = ({ order, dragEnable, oldDragEnable, oldOrder }) =>
    !dragEnable && !oldDragEnable && order.pickupAddress !== oldOrder.pickupAddress;

  handleAnimateToRegion = () => {
    const { order, changeRegionToAnimate, disableDrag } = this.props;

    const source = prepareCoordinates(order.pickupAddress);
    disableDrag();
    changeRegionToAnimate(source);
  };

  renderMapItems = () => {
    const { order, vehicles, drivers, nightMode } = this.props;

    return !order.destinationAddress
      ? <DriversMarkers drivers={drivers} nightMode={nightMode} />
      : (
        <OrderRoute
          sourceType={vehicles.duration ? 'journey' : 'default'}
          destinationType={vehicles.distance ? 'distance' : 'default'}
          source={{ ...order.pickupAddress, value: vehicles.duration }}
          destination={{ ...order.destinationAddress, value: vehicles.distance }}
          stops={order.stops || order.stopAddresses}
        />
      );
  };

  render() {
    const { currentPosition, order } = this.props;

    return (
      <Fragment>
        {currentPosition && !order.destinationAddress &&
          <CurrentLocation coordinate={currentPosition} />}

        {this.renderMapItems()}
      </Fragment>
    );
  }
}

OrderCreatingSet.propTypes = {
  order: PropTypes.object.isRequired
};

const mapState = ({ ui, booking }) => ({
  currentPosition: ui.map.currentPosition,
  vehicles: booking.vehicles,
  drivers: ui.map.drivers
});

const mapDispatch = {
  changeRegionToAnimate,
  changeCoordinatesToResize,
  getDriversLocations,
  subscribeToDriversLocations
};

export default connect(mapState, mapDispatch)(OrderCreatingSet);
