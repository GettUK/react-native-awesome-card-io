import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

export const initialState = {
  data: {},
  busy: false,
  errors: null,
  temp: {}
};

const getPassengerDataStart = (state) => {
  return update(state, { busy: true, errors: null });
};

const getPassengerDataSuccess = (state, { payload }) => {
  return update(state, { busy: false, data: payload });
};

const getPassengerDataFailure = (state, { payload }) => {
  return update(state, { busy: false, errors: payload });
};

const setInitialProfileValues = (state) => {
  return update(state, 'temp', { ...state.temp, ...state.data });
};

const changeFieldValue = (state, { payload: { field, value } }) => {
  return update(state, `temp.${field}`, value);
};

const sendProfileDataSuccess = (state) => {
  return update(state, 'data', { ...state.data, firstName: state.temp.firstName, lastName: state.temp.lastName });
};

export default composeReducer('passenger', {
  getPassengerDataStart,
  getPassengerDataSuccess,
  getPassengerDataFailure,
  setInitialProfileValues,
  changeFieldValue,
  sendProfileDataSuccess
}, initialState);
