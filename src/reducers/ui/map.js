import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

import { LATTITIDE_DELTA, LONGTITUDE_DELTA } from 'utils';

const initialState = {
  errors: null,
  currentPosition: null,
  drivers: []
};

const changePosition = (state, { payload }) => {
  const coords = payload.coords || payload;
  return update(state, {
    currentPosition: coords.latitude && coords.longitude
      ? {
        latitude: parseFloat(coords.latitude),
        longitude: parseFloat(coords.longitude),
        latitudeDelta: LATTITIDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA
      }
      : state.currentPosition,
    errors: null
  });
};

const errorPosition = (state, { payload }) => ({
  ...state,
  errors: payload
});

const clearMap = () => initialState;

const setDrivers = (state, { payload }) =>
  update(state, 'drivers', payload.drivers);

export default composeReducer(
  'ui/map',
  {
    changePosition,
    errorPosition,
    clearMap,
    setDrivers
  },
  initialState
);
