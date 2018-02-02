import { curry } from 'lodash/fp';

export const CHANGE_ISOPENKEYBOARD = 'APP/STATUSES/CHANGE_ISOPENKEYBOARD';

export const changeIsOpenKeyboard = curry(value => ({
  type: CHANGE_ISOPENKEYBOARD,
  payload: value
}));

export const CHANGE_PERMISSIONS = 'APP/STATUSES/CHANGE_PERMISSIONS';

export const changePermissions = curry(perms => ({
  type: CHANGE_PERMISSIONS,
  payload: perms
}));
