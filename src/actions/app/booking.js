import { createTypes } from 'redux-compose-reducer';
import { get, post } from 'utils';

import { changeToActiveOrderScene } from '../ui/navigation';

import { order } from './mockedData';

const TYPES = createTypes('booking', [
  'createOrderStarted',
  'createOrderSuccess',
  'createOrderError',
  'getFormDataSuccess',
  'changeTempMessageToDriver',
  'applyMessageToDriver',
  'changeBookingDate',
  'changeTravelReason'
]);

export const createOrder = () => (dispatch) => {
  dispatch({ type: TYPES.createOrderStarted });

  return post('/bookings', order)
    .then((res) => {
      dispatch({ type: TYPES.createOrderSuccess, data: res.data });

      dispatch(changeToActiveOrderScene());
      return res.data;
    })
    .catch((error) => {
      dispatch({ type: TYPES.createOrderError, error });
    });
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
