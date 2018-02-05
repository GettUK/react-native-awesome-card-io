import { curry } from 'lodash/fp';
import Permissions from 'react-native-permissions';

export const checkMultiplePermissions = curry((perms, callback) =>
  Permissions.checkMultiple(perms).then(response => {
    callback(response);
  })
);

export const requestPermissions = curry((perm, callback) =>
  Permissions.request(perm).then(response => {
    callback(response);
  })
);

export const openSettingsPermission = curry(() => Permissions.openSettings());
