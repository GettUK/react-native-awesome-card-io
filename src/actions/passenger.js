import { createTypes } from 'redux-compose-reducer';
import { get, put } from 'utils';

const TYPES = createTypes('passenger', [
  'getPassengerDataStart',
  'getPassengerDataSuccess',
  'getPassengerDataFailure',
  'setInitialProfileValues',
  'changeFieldValue',
  'sendProfileDataStart',
  'sendProfileDataSuccess',
  'sendProfileDataFailure'
]);

export const getPassengerData = () => (dispatch, getState) => {
  if (getState().passenger.busy) {
    return Promise.resolve();
  }

  dispatch({ type: TYPES.getPassengerDataStart });

  const id = getState().session.result.memberId;

  return get(`/passengers/${id}`)
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

export const changeFieldValue = (field, value) => (dispatch) => {
  dispatch({ type: TYPES.changeFieldValue, payload: { field, value }});
};

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
