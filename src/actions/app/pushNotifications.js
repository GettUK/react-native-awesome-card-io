import { createTypes } from 'redux-compose-reducer';

import { destroy, post } from 'utils';
import PN from 'utils/notifications';

const TYPES = createTypes('app/push', ['saveToken', 'registerToken', 'deleteToken']);

export const saveToken = token => dispatch => {
  dispatch({ type: TYPES.saveToken, payload: { token } });
}

export const registerToken = () => (dispatch, getState) => {
  const { app: { push: { token } } } = getState();

  return post('/devices', { "device_token": token })
    .then(() => {
      dispatch({ type: TYPES.registerToken });
    });
};

export const deleteToken = () => (dispatch, getState) => {
  const { app: { push: { token } } } = getState();

  return destroy('/devices', { data: { "device_token": token } })
    .then(() => {
      dispatch({ type: TYPES.deleteToken });
    });
};
