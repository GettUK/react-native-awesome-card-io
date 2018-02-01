export const CHANGE_ISOPENKEYBOARD = 'APP/STATUSES/CHANGE_ISOPENKEYBOARD';

export function changeIsOpenKeyboard(value) {
  return {
    type: CHANGE_ISOPENKEYBOARD,
    payload: value
  };
}
