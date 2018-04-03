import { createTypes } from 'redux-compose-reducer';

const TYPES = createTypes('ui/map', [
  'removeFields',
  'changeFields',
  'clearMap',
  'addAddressPoint',
  'changeAddressType',
  'changeAddressTyping',
  'changeAddress',
  'addressVisibleModal',
  'changePosition',
  'errorPosition'
]);

export const removeFields = fields => ({ type: TYPES.removeFields, payload: fields });

export const changeFields = fields => ({ type: TYPES.changeFields, payload: fields });

export const addAddressPoint = () => (dispatch, getState) => {
  const { ui: { map: { address } } } = getState();

  if (address.value.lat && address.value.lng) {
    dispatch({ type: TYPES.addAddressPoint });
  }
};

export const changeAddressType = (name, value, object) =>
  ({ type: TYPES.changeAddressType, payload: { name, value, object } });

export const changeAddressTyping = value => ({ type: TYPES.changeAddressTyping, payload: value });

export const changeAddress = value => ({ type: TYPES.changeAddress, payload: value });

export const addressVisibleModal = bool => ({ type: TYPES.addressVisibleModal, payload: bool });

export const changePosition = obq => ({ type: TYPES.changePosition, payload: obq });

export const errorPosition = e => ({ type: TYPES.errorPosition, payload: e });

export const clearMap = () => ({ type: TYPES.clearMap });
