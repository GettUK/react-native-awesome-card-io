import { createTypes } from 'redux-compose-reducer';
import { get, post } from 'utils';

import { goToActiveOrderScene, goToPreorderScene } from '../ui/navigation';

import { order } from './mockedData';

const TYPES = createTypes('booking', [
  'createOrderStarted',
  'createOrderSuccess',
  'createOrderError',
  'cancelOrder',
  'getFormDataSuccess',
  'changeTempMessageToDriver',
  'applyMessageToDriver',
  'changeBookingDate',
  'changeTravelReason',
  'openSettingsModal',
  'closeSettingsModal'
]);

export const createOrder = () => (dispatch) => {
  dispatch({ type: TYPES.createOrderStarted });

  return post('/bookings', order)
    .then((res) => {
      dispatch({ type: TYPES.createOrderSuccess, data: res.data });

      dispatch(goToActiveOrderScene());
      return res.data;
    })
    .catch((error) => {
      dispatch({ type: TYPES.createOrderError, error });
    });
};

export const cancelOrder = () => (dispatch) => {
  dispatch(goToPreorderScene());

  dispatch({ type: TYPES.cancelOrder });
}

export const getFormData = () => (dispatch) => {
  return get('/bookings/new')
    .then((res) => {
      dispatch({ type: TYPES.getFormDataSuccess, data: res.data });
      return res.data;
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
