import { createTypes } from 'redux-compose-reducer';
import { get } from 'utils';

const TYPES = createTypes('booking', [
  'getFormDataSuccess',
  'changeTempMessageToDriver',
  'applyMessageToDriver',
  'changeBookingDate',
  'changeTravelReason'
]);

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
