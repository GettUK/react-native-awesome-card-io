import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

export const initialState = {
  data: {
    favoriteAddresses: [],
    passenger: {},
    paymentCards: []
  },
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
  return update(state, 'temp', { ...state.temp, ...state.data.passenger });
};

const changeFieldValue = (state, { payload: { field, value } }) => {
  return update(state, `temp.${field}`, value);
};

const sendProfileDataSuccess = (state) => {
  return update(state, 'data.passenger', {
    ...state.data,
    firstName: state.temp.firstName,
    lastName: state.temp.lastName,
    avatar: state.temp.avatar
  });
};

const updatePredefinedAddress = (state, { payload: { predefinedAddressType, address } }) => {
  return update(state, `data.passenger.${predefinedAddressType}Address`, address);
};

const updateFavouriteAddress = (state, { payload }) => {
  return update(state, `data.favoriteAddresses.{id:${payload.id}}`, payload);
};

const addFavouriteAddress = (state, { payload }) => {
  return update.push(state, 'data.favoriteAddresses', payload);
};

const destroyFavoriteAddress = (state, { payload }) => {
  return update.remove(state, `data.favoriteAddresses.{id:${payload}}`);
};

const changeToggleValueStart = (state, { payload: { field, value } }) => {
  return update(state, { busy: true, [`data.passenger.${field}`]: value });
};

const changeToggleValueSuccess = (state) => {
  return update(state, { busy: false, errors: null });
};

const changeToggleValueFailure = (state, { payload }) => {
  return update(state, { busy: false, errors: payload, [`data.passenger.${field}`]: !state[`data.passenger.${field}`] });
};

export default composeReducer('passenger', {
  getPassengerDataStart,
  getPassengerDataSuccess,
  getPassengerDataFailure,
  setInitialProfileValues,
  changeFieldValue,
  sendProfileDataSuccess,
  updatePredefinedAddress,
  updateFavouriteAddress,
  addFavouriteAddress,
  destroyFavoriteAddress,
  changeToggleValueStart,
  changeToggleValueSuccess,
  changeToggleValueFailure
}, initialState);
