import { createTypes } from 'redux-compose-reducer';

const TYPES = createTypes('booking', [
  'changeTempMessageToDriver',
  'applyMessageToDriver',
  'changeBookingDate'
]);

export const changeTempMessageToDriver = (message) => (dispatch) => {
  dispatch({ type: TYPES.changeTempMessageToDriver, message });
};

export const applyMessageToDriver = () => (dispatch) => {
  dispatch({ type: TYPES.applyMessageToDriver });
};

export const changeBookingDate = (date) => (dispatch) => {
  dispatch({ type: TYPES.changeBookingDate, date });
};
