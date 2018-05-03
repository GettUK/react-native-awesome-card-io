import { Platform } from 'react-native';
import Permissions from 'react-native-permissions';
import { createTypes } from 'redux-compose-reducer';
import { curry } from 'lodash/fp';

const TYPES = createTypes('app/statuses', ['changePermissions', 'changeParamsField']);

const changeParamsField = curry((field, value) => ({ type: TYPES.changeParamsField, payload: { field, value } }));

export const onLayoutFooter = changeParamsField('footer');

export const onLayoutPointList = changeParamsField('pointList');

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

export const requestLocation = () => (dispatch, getState) => {
  const { app: { statuses } } = getState();
  if (!(statuses.permissions &&
    statuses.permissions.location === PERMISSION_STATUS.authorized)) {
    try {
      if (Platform.OS === 'ios') {
        navigator.geolocation.requestAuthorization();
      }
      dispatch(requestPermissions('location', { type: 'always' }));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Cannot request authorization location', e);
    }
    dispatch(checkMultiplePermissions(['location']));
  }
};
