import { createTypes } from 'redux-compose-reducer';
import { get } from 'utils';
import faye from 'utils/faye';

const TYPES = createTypes('ui/map', [
  'changePosition',
  'errorPosition',
  'setDrivers',
  'clearMap',
  'changeRegionToAnimate',
  'changeCoordinatesToResize',
  'clearCoordinates'
]);

export const changePosition = obq => ({ type: TYPES.changePosition, payload: obq });

export const errorPosition = e => ({ type: TYPES.errorPosition, payload: e });

export const clearMap = () => ({ type: TYPES.clearMap });

let driversSubscription = null;

const subscribeToChannel = channel => (dispatch) => {
  driversSubscription = faye.on((channel), ({ data }) => {
    if (data.drivers.length) dispatch({ type: TYPES.setDrivers, payload: data });
  });
};

export const subscribeToDriversLocations = location => dispatch =>
  get('/drivers/channel', location)
    .then(({ data }) => {
      // eslint-disable-next-line no-underscore-dangle
      if (driversSubscription && driversSubscription._channels.replace('/', '') === data.channel) return;

      faye.cancelSubscription(driversSubscription);
      dispatch(subscribeToChannel(data.channel));
    });

export const cancelDriverSubscription = () => () => {
  faye.cancelSubscription(driversSubscription);
};

export const getDriversLocations = location => dispatch =>
  get('/drivers/locations', location)
    .then(({ data }) => {
      dispatch({ type: TYPES.setDrivers, payload: data });
    });

export const changeRegionToAnimate = region => (dispatch) => {
  dispatch({ type: TYPES.changeRegionToAnimate, payload: region });
};

export const changeCoordinatesToResize = coordinates => (dispatch) => {
  dispatch({ type: TYPES.changeCoordinatesToResize, payload: coordinates });
};

export const clearCoordinates = () => (dispatch) => {
  dispatch({ type: TYPES.clearCoordinates });
};
