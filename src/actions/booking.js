import { createTypes } from 'redux-compose-reducer';
import axios, { CancelToken } from 'axios';
import { get, post } from 'utils';
import { goToActiveOrderScene, goToPreorderScene } from 'actions/ui/navigation';

const TYPES = createTypes('booking', [
  'createBookingStart',
  'createBookingSuccess',
  'createBookingFailure',
  'cancelOrder',
  'getFormDataSuccess',
  'getVehiclesStart',
  'getVehiclesSuccess',
  'getVehiclesFailure',
  'changeTempMessageToDriver',
  'applyMessageToDriver',
  'changeBookingDate',
  'changeTravelReason',
  'openSettingsModal',
  'closeSettingsModal'
]);

export const createBooking = booking => dispatch => {
  // booking = {
  //   ...booking,
  //   scheduledAt: booking.scheduledType === 'now' ? undefined : booking.scheduledAt.format()
  // };
  dispatch({ type: TYPES.createBookingStart });

  return post('/bookings', booking)
    .then(({ data }) => {
      dispatch({ type: TYPES.createBookingSuccess, payload: data });

      dispatch(goToActiveOrderScene());
      return data;
    })
    .catch(errors => {
      dispatch({ type: TYPES.createBookingFailure, payload: errors });
    });
};

export const cancelOrder = () => dispatch => {
  dispatch(goToPreorderScene());
  dispatch({ type: TYPES.cancelOrder });
};

export const getFormData = () => dispatch => (
  get('/bookings/new')
    .then(({ data }) => {
      dispatch({ type: TYPES.getFormDataSuccess, payload: data });
      return data;
    })
);

let cancelGetVehicles;

export const getVehicles = params => dispatch => {
  if (cancelGetVehicles) {
    cancelGetVehicles();
  } else {
    dispatch({ type: TYPES.getVehiclesStart });
  }
  return post('/bookings/vehicles', params, { cancelToken: new CancelToken(c => cancelGetVehicles = c) })
    .then(({ data }) => {
      cancelGetVehicles = null;

      dispatch({ type: TYPES.getVehiclesSuccess, payload: data });

      return data;
    }).catch(err => {
      if (!axios.isCancel(err)) {
        cancelGetVehicles = null;
        dispatch({ type: TYPES.getVehiclesFailure });
      }
      throw err;
    });
};

export const changeTempMessageToDriver = (message) => (dispatch) => {
  dispatch({ type: TYPES.changeTempMessageToDriver, message });
};

export const applyMessageToDriver = () => (dispatch) => {
  dispatch({ type: TYPES.applyMessageToDriver });
};

export const changeBookingDate = (date) => (dispatch) => {
  dispatch({ type: TYPES.changeBookingDate, date });
};

export const changeTravelReason = (reasonId) => (dispatch) => {
  dispatch({ type: TYPES.changeTravelReason, reasonId });
};

export const openSettingsModal = () => (dispatch) => {
  dispatch({ type: TYPES.openSettingsModal });
};

export const closeSettingsModal = () => (dispatch) => {
  dispatch({ type: TYPES.closeSettingsModal });
};
