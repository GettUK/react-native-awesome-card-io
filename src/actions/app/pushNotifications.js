import { createTypes } from 'redux-compose-reducer';

import { destroy, post } from 'utils';
import PN from 'utils/notifications';

const TYPES = createTypes('app/push', [
  'saveToken',
  'registerToken',
  'deleteToken'
]);

export const saveToken = token => (dispatch) => {
  dispatch({ type: TYPES.saveToken, payload: { token } });
};

export const registerToken = () => (dispatch, getState) => {
  const token = getState().app.push.token;

  if (!token) {
    PN.registerFCMToken().then((deviceToken) => {
      post('/user_devices', { deviceToken });
    });
  } else {
    post('/user_devices', { deviceToken: token });
  }
};

export const deleteToken = () => (dispatch, getState) => {
  const token = getState().app.push.token;

  return destroy('/user_devices', { data: { deviceToken: token } });
};
