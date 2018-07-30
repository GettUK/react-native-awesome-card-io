import { createTypes } from 'redux-compose-reducer';
import DeviceInfo from 'react-native-device-info';

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

  DeviceInfo.getMACAddress().then((mac) => {
    if (!token) {
      PN.registerFCMToken().then((deviceToken) => {
        post('/user_devices', { deviceToken, uuid: mac });
      });
    } else {
      post('/user_devices', { deviceToken: token, uuid: mac });
    }
  });
};

export const deleteToken = () => (dispatch, getState) => {
  const token = getState().app.push.token;

  return destroy('/user_devices', { data: { deviceToken: token } });
};
