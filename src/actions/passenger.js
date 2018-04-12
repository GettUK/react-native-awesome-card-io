import { createTypes } from 'redux-compose-reducer';
import curry from 'lodash/curry';

import { get, put, post, destroy } from 'utils';

const TYPES = createTypes('passenger', [
  'getPassengerDataStart',
  'getPassengerDataSuccess',
  'getPassengerDataFailure',
  'setInitialProfileValues',
  'changeProfileFieldValue',
  'sendProfileDataStart',
  'sendProfileDataSuccess',
  'sendProfileDataFailure',
  'sendAddressStart',
  'updatePredefinedAddress',
  'updateFavouriteAddress',
  'addFavouriteAddress',
  'destroyFavoriteAddress',
  'changeToggleValueStart',
  'changeToggleValueSuccess',
  'changeToggleValueFailure',
  'touchField',
  'clearPassenger',
  'setValidationError'
]);

export const getPassengerData = () => (dispatch, getState) => {
  if (getState().passenger.busy) {
    return Promise.resolve();
  }

  dispatch({ type: TYPES.getPassengerDataStart });

  const id = getState().session.result.memberId;

  return get(`/passengers/${id}/edit`)
    .then(({ data }) => {
      dispatch({ type: TYPES.getPassengerDataSuccess, payload: data });

      return data;
    })
    .catch((err) => {
      dispatch({ type: TYPES.getPassengerDataFailure, payload: err.data, error: true });
      throw err;
    });
};

export const setInitialProfileValues = () => (dispatch) => {
  dispatch({ type: TYPES.setInitialProfileValues });
};

export const changeProfileFieldValue = curry((field, value) => (dispatch) => {
  dispatch({ type: TYPES.changeProfileFieldValue, payload: { field, value } });
});

export const setValidationError = error => (dispatch) => {
  dispatch({ type: TYPES.setValidationError, payload: { error } });
};

export const sendProfileData = () => (dispatch, getState) => {
  dispatch({ type: TYPES.sendProfileDataStart });

  const { session, passenger: { temp } } = getState();
  const id = session.result.memberId;

  return put(`/passengers/${id}`, temp)
    .then(() => {
      dispatch({ type: TYPES.sendProfileDataSuccess });
    })
    .catch((err) => {
      dispatch({ type: TYPES.sendProfileDataFailure, payload: err.data, error: true });
      throw err;
    });
};

const sendPredefinedAddress = ({ passengerId, address, predefinedAddressType }) => dispatch =>
  put(`/passengers/${passengerId}`, { passenger: { [`${predefinedAddressType}Address`]: address } })
    .then((res) => {
      dispatch({ type: TYPES.updatePredefinedAddress, payload: { predefinedAddressType, address } });
      return res;
    });

const sendFavouriteAddress = ({ passengerId, address }) => dispatch =>
  put(`/passengers/${passengerId}/addresses/${address.id}`, { passengerAddress: address })
    .then((res) => {
      dispatch({ type: TYPES.updateFavouriteAddress, payload: res.data });
      return res;
    });

const createFavouriteAddress = ({ passengerId, address }) => dispatch =>
  post(`/passengers/${passengerId}/addresses`, { passengerAddress: { ...address, type: 'favorite' } })
    .then((res) => {
      dispatch({ type: TYPES.addFavouriteAddress, payload: res.data });
      return res;
    });

export const sendAddress = (address, predefinedAddressType) => (dispatch, getState) => {
  const passengerId = getState().session.result.memberId;
  let req;

  if (predefinedAddressType) {
    req = dispatch(sendPredefinedAddress({ passengerId, address, predefinedAddressType }));
  } else if (address.id) {
    req = dispatch(sendFavouriteAddress({ passengerId, address }));
  } else {
    req = dispatch(createFavouriteAddress({ passengerId, address }));
  }

  return req
    .catch((err) => {
      throw err;
    });
};

export const destroyFavoriteAddress = id => (dispatch, getState) => {
  const passengerId = getState().session.result.memberId;

  return destroy(`/passengers/${passengerId}/addresses/${id}`)
    .then(() => dispatch({ type: TYPES.destroyFavoriteAddress, payload: id }));
};

export const changeToggleValue = curry((field, value) => (dispatch, getState) => {
  if (getState().passenger.busy) {
    return Promise.resolve();
  }

  dispatch({ type: TYPES.changeToggleValueStart, payload: { field, value } });

  const id = getState().session.result.memberId;

  return put(`/passengers/${id}`, { [field]: value })
    .then(() => {
      dispatch({ type: TYPES.changeToggleValueSuccess });
    })
    .catch((err) => {
      dispatch({ type: TYPES.changeToggleValueFailure, payload: { errors: err.data, field }, error: true });
      throw err;
    });
});

export const touchField = (field, value = true) => (dispatch) => {
  dispatch({ type: TYPES.touchField, payload: { field, value } });
};

export const clearPassenger = () => ({ type: TYPES.clearPassenger });
