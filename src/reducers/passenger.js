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
  temp: {
    validationError: null
  }
};

const getPassengerDataStart = state => update(state, { busy: true, errors: null });

const getPassengerDataSuccess = (state, { payload }) => update(state, { busy: false, data: payload });

const getPassengerDataFailure = (state, { payload }) => update(state, { busy: false, errors: payload });

const setInitialProfileValues = state => update(state, 'temp', state.data.passenger);

const changeProfileFieldValue = (state, { payload: { field, value } }) =>
  update(state, { 'temp.profileTouched': true, [`temp.${field}`]: value, 'temp.validationError': null });

const sendProfileDataSuccess = state => update.assign(state, 'data.passenger', {
  firstName: state.temp.firstName,
  lastName: state.temp.lastName,
  avatar: state.temp.avatar,
  defaultVehicle: state.temp.defaultVehicle,
  email: state.temp.email,
  phone: state.temp.phone
});

const updatePredefinedAddress = (state, { payload: { predefinedAddressType, address } }) =>
  update(state, `data.passenger.${predefinedAddressType}Address`, address);

const updateFavouriteAddress = (state, { payload }) =>
  update(state, `data.favoriteAddresses.{id:${payload.id}}`, payload);

const addFavouriteAddress = (state, { payload }) =>
  update.push(state, 'data.favoriteAddresses', payload);

const destroyFavoriteAddress = (state, { payload }) =>
  update.remove(state, `data.favoriteAddresses.{id:${payload}}`);

const changeToggleValueStart = (state, { payload: { field, value } }) =>
  update(state, { busy: true, [`data.passenger.${field}`]: value });

const changeToggleValueSuccess = state =>
  update(state, { busy: false, errors: null });

const changeToggleValueFailure = (state, { payload: { field, errors } }) =>
  update(state, { busy: false, errors, [`data.passenger.${field}`]: !state[`data.passenger.${field}`] });

const touchField = (state, { payload: { field, value } }) => update(state, `temp.${field}Touched`, value);

const clearPassenger = () => initialState;

const setValidationError = (state, { payload: { error } }) =>
  update(state, 'temp.validationError', error);

export default composeReducer('passenger', {
  getPassengerDataStart,
  getPassengerDataSuccess,
  getPassengerDataFailure,
  setInitialProfileValues,
  changeProfileFieldValue,
  sendProfileDataSuccess,
  updatePredefinedAddress,
  updateFavouriteAddress,
  addFavouriteAddress,
  destroyFavoriteAddress,
  changeToggleValueStart,
  changeToggleValueSuccess,
  changeToggleValueFailure,
  touchField,
  clearPassenger,
  setValidationError
}, initialState);
