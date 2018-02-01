export const CHANGE_ISOPENKEYBOARD = 'APP/STATUSES/CHANGE_ISOPENKEYBOARD';

export function changeIsOpenKeyboard(value) {
  return {
    type: CHANGE_ISOPENKEYBOARD,
    payload: value
  };
}

export const CHANGE_PERMISSIONS = 'APP/STATUSES/CHANGE_PERMISSIONS';

export function changePermissions(value) {
  return {
    type: CHANGE_PERMISSIONS,
    payload: value
  };
}
