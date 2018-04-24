import { createTypes } from 'redux-compose-reducer';
import { batchActions } from 'redux-batched-actions';
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
  'makeDefaultPayment',
  'deactivatePayment',
  'changeToggleValueStart',
  'changeToggleValueSuccess',
  'changeToggleValueFailure',
  'touchField',
  'setTempAddress',
  'changeTempAddressField',
  'changeTempAddress',
  'clearPassenger',
  'setValidationError',
  'changePaymentField',
  'changePaymentFields',
  'setDefaultPaymentFields',
  'addPaymentCardType',
  'clearPassenger'
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

export const setValidationError = (path, error) =>
  ({ type: TYPES.setValidationError, payload: { path, error } });

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

export const setTempAddress = address => (dispatch) => {
  dispatch({ type: TYPES.setTempAddress, payload: address });
};

export const changeTempAddressField = (field, value) => (dispatch) => {
  dispatch({ type: TYPES.changeTempAddressField, payload: { field, value } });
};

export const changeTempAddress = address => (dispatch) => {
  dispatch({ type: TYPES.changeTempAddress, payload: address });
};

export const sendPredefinedAddress = (address, type) => (dispatch, getState) => {
  const passengerId = getState().session.result.memberId;

  return put(`/passengers/${passengerId}`, { passenger: { [`${type}Address`]: address } })
    .then((res) => {
      dispatch({ type: TYPES.updatePredefinedAddress, payload: { type, address } });
      return res;
    });
};

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

export const sendAddress = () => (dispatch, getState) => {
  const passengerId = getState().session.result.memberId;
  const address = getState().passenger.temp.address;
  let req;

  if (address.id) {
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

export const makeDefault = id => ({ type: TYPES.makeDefaultPayment, payload: id });

export const makeDefaultPayment = id => (dispatch, getState) => {
  const {
    session: { result: { memberId: passengerId } }
  } = getState();

  return put(`/passengers/${passengerId}/payment_cards/${id}/make_default`)
    .then(() => dispatch(makeDefault(id)));
};

export const deactivate = id => ({ type: TYPES.deactivatePayment, payload: id });

export const deactivatePayment = id => (dispatch, getState) => {
  const passengerId = getState().session.result.memberId;

  return destroy(`/passengers/${passengerId}/payment_cards/${id}`)
    .then(() => dispatch(deactivate(id)));
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

export const changePaymentField = (field, value) => ({ type: TYPES.changePaymentField, payload: { field, value } });

export const changePaymentFields = fields => ({ type: TYPES.changePaymentFields, payload: fields });

export const setDefaultPaymentFields = () => ({ type: TYPES.setDefaultPaymentFields });

export const addPaymentCardType = data => ({ type: TYPES.addPaymentCardType, payload: data });

export const addPaymentCard = () => (dispatch, getState) => {
  const {
    session: { result: { memberId: passengerId } },
    passenger: { newPaymentData }
  } = getState();

  return post(`/passengers/${passengerId}/payment_cards`, { paymentCard: newPaymentData })
    .then((res) => {
      dispatch(batchActions([
        addPaymentCardType(res.data),
        setDefaultPaymentFields()
      ]));
    });
};

export const clearPassenger = () => ({ type: TYPES.clearPassenger });
