import Permissions from 'react-native-permissions';
import { createTypes } from 'redux-compose-reducer';
import { curry } from 'lodash/fp';

const TYPES = createTypes('app/statuses', ['changeKeyboardStatus', 'changePermissions']);

export const changeKeyboardStatus = value => ({ type: TYPES.changeKeyboardStatus, payload: value });

export const changePermissions = perms => ({ type: TYPES.changePermissions, payload: perms });

export const PERMISSION_STATUS = {
  undetermined: 'undetermined',
  authorized: 'authorized',
  denied: 'denied'
};

export const checkMultiplePermissions = perms => dispatch => Permissions.checkMultiple(perms).then((response) => {
  dispatch(changePermissions({ ...response }));
  return response;
});

export const requestPermissions = curry((perm, type) => dispatch => Permissions.request(perm, type).then((response) => {
  dispatch(changePermissions({ [perm]: response }));
  return { [perm]: response };
}));

export const openSettingsPermissions = () => Permissions.openSettings();
