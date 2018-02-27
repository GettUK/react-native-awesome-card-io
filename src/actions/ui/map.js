import { createTypes } from 'redux-compose-reducer';

const TYPES = createTypes('ui/map',
  ['addAddressPoint', 'changeAddressType', 'changeAddressTyping', 'changeAddress', 'addressVisibleModal',
    'initialRegionPosition', 'changeRegionPosition', 'changePosition', 'errorPosition']);

export const addAddressPoint = () => ({ type: TYPES.addAddressPoint });

export const changeAddressType = (name, value, object) =>
  ({ type: TYPES.changeAddressType, payload: { name, value, object } });

export const changeAddressTyping = value => ({ type: TYPES.changeAddressTyping, payload: value });

export const changeAddress = value => ({ type: TYPES.changeAddress, payload: value });

export const addressVisibleModal = bool => ({ type: TYPES.addressVisibleModal, payload: bool });

export const initialRegionPosition = obq => ({ type: TYPES.initialRegionPosition, payload: obq });

export const changeRegionPosition = obq => ({ type: TYPES.changeRegionPosition, payload: obq });

export const changePosition = obq => ({ type: TYPES.changePosition, payload: obq });

export const errorPosition = e => ({ type: TYPES.changePosition, payload: e });
