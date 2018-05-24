import { composeReducer } from 'redux-compose-reducer';
import update from 'update-js';

const initPaymentCardType = {
  kind: 'business',
  personal: false
};

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
  },
  newPaymentData: initPaymentCardType,
  validationPaymentError: null,
  touched: false,
  companySettings: {}
};

const getCompanySettings = (state, { payload }) => update(state, 'companySettings', payload);

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

const setTempAddress = (state, { payload }) => update(state, 'temp.address', payload);

const changeTempAddressField = (state, { payload }) =>
  update(state, { [`temp.address.${payload.field}`]: payload.value, 'temp.addressTouched': true });

const changeTempAddress = (state, { payload }) =>
  update(state, { 'temp.address.address': payload, 'temp.addressTouched': true });

const updatePredefinedAddress = (state, { payload: { type, address } }) =>
  update(state, `data.passenger.${type}Address`, address);

const updateFavouriteAddress = (state, { payload }) =>
  update(state, `data.favoriteAddresses.{id:${payload.id}}`, payload);

const addFavouriteAddress = (state, { payload }) =>
  update.push(state, 'data.favoriteAddresses', payload);

const destroyFavoriteAddress = (state, { payload }) =>
  update.remove(state, `data.favoriteAddresses.{id:${payload}}`);

const makeDefaultPayment = (state, { payload }) =>
  update.with(state, 'data.paymentCards', old => old.map(item => ({ ...item, default: (item.id === payload) })));

const deactivatePayment = (state, { payload }) =>
  update.remove(state, `data.paymentCards.{id:${payload}}`);

const changeToggleValueStart = (state, { payload: { field, value } }) =>
  update(state, { busy: true, [`data.passenger.${field}`]: value });

const changeToggleValueSuccess = state =>
  update(state, { busy: false, errors: null });

const changeToggleValueFailure = (state, { payload: { field, errors } }) =>
  update(state, { busy: false, errors, [`data.passenger.${field}`]: !state[`data.passenger.${field}`] });

const touchField = (state, { payload: { field, value } }) => update(state, `temp.${field}Touched`, value);

const changePaymentField = (state, { payload: { field, value } }) =>
  update(state, { [`newPaymentData.${field}`]: value, touched: true });

const changePaymentFields = (state, { payload }) =>
  update(state, { newPaymentData: { ...state.newPaymentData, ...payload }, touched: true });

const resetPaymentFields = state =>
  update(state, { newPaymentData: initPaymentCardType, touched: false, validationPaymentError: null });

const addPaymentCardType = (state, { payload }) =>
  update.push(state, 'data.paymentCards', payload);

const clearPassenger = () => initialState;

const setValidationError = (state, { payload: { path, error } }) =>
  update(state, path, error);

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
  makeDefaultPayment,
  deactivatePayment,
  changeToggleValueStart,
  changeToggleValueSuccess,
  changeToggleValueFailure,
  setTempAddress,
  changeTempAddressField,
  changeTempAddress,
  touchField,
  clearPassenger,
  setValidationError,
  changePaymentField,
  changePaymentFields,
  resetPaymentFields,
  addPaymentCardType,
  getCompanySettings
}, initialState);
