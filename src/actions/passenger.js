import { createTypes } from 'redux-compose-reducer';
import { get, put, post, destroy } from 'utils';
import curry from 'lodash/curry';

const TYPES = createTypes('passenger', [
  'getPassengerDataStart',
  'getPassengerDataSuccess',
  'getPassengerDataFailure',
  'setInitialProfileValues',
  'changeFieldValue',
  'sendProfileDataStart',
  'sendProfileDataSuccess',
  'sendProfileDataFailure',
  'sendAddressStart',
  'updatePredefinedAddress',
  'updateFavouriteAddress',
  'addFavouriteAddress',
  'destroyFavoriteAddress'
]);

export const getPassengerData = () => (dispatch, getState) => {
  if (getState().passenger.busy) {
    return Promise.resolve();
  }

  dispatch({ type: TYPES.getPassengerDataStart });

  const id = getState().session.result.memberId;

  return get(`/passengers/${id}/edit`)
    .then((res) => {
      dispatch({ type: TYPES.getPassengerDataSuccess, payload: res.data });
      return res.data;
    })
    .catch(err => {
      dispatch({ type: TYPES.getPassengerDataFailure, payload: err.data, error: true });
      throw err;
    });
};

export const setInitialProfileValues = () => (dispatch) => {
  dispatch({ type: TYPES.setInitialProfileValues });
};

export const changeFieldValue = curry((field, value) => (dispatch) => {
  dispatch({ type: TYPES.changeFieldValue, payload: { field, value }});
});

export const sendProfileData = () => (dispatch, getState) => {
  dispatch({ type: TYPES.sendProfileDataStart });

  const { session, passenger: { temp } } = getState();
  const id = session.result.memberId;

  return put(`/passengers/${id}`, temp)
    .then(() => {
      dispatch({ type: TYPES.sendProfileDataSuccess });
    })
    .catch(err => {
      dispatch({ type: TYPES.sendProfileDataFailure, payload: err.data, error: true });
      throw err;
    });
};

export const sendAddress = (address, predefinedAddressType) => (dispatch, getState) => {
  const passengerId = getState().session.result.memberId;
  let req;

  if (predefinedAddressType) {
    req = dispatch(sendPredefinedAddress({ passengerId, address, predefinedAddressType }));
  } else {
    if (address.id) {
      req = dispatch(sendFavouriteAddress({ passengerId, address }));
    } else {
      req = dispatch(createFavouriteAddress({ passengerId, address }));
    }
  }

  return req
    .catch(err => {
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
  post(`/passengers/${passengerId}/addresses`, { passengerAddress: { ...address, type: 'favorite' }})
    .then((res) => {
      dispatch({ type: TYPES.addFavouriteAddress, payload: res.data });
      return res;
    });

export const destroyFavoriteAddress = (id) => (dispatch, getState) => {
  const passengerId = getState().session.result.memberId;

  return destroy(`/passengers/${passengerId}/addresses/${id}`)
    .then(() => dispatch({ type: TYPES.destroyFavoriteAddress, payload: id }));
};
