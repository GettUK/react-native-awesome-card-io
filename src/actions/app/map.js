import { curry } from 'lodash/fp';

export const CHANGE_ADDRESS = 'APP/MAP/CHANGE_ADDRESS';

export const changeAddress = curry(value => ({
  type: CHANGE_ADDRESS,
  payload: value
}));

export const ADDRESS_VISIBLE_MODAL = 'APP/MAP/ADDRESS_VISIBLE_MODAL';

export const addressVisibleModal = curry(bool => ({
  type: ADDRESS_VISIBLE_MODAL,
  payload: bool
}));

export const INITIAL_REGION_POSITION = 'APP/MAP/INITIAL_REGION_POSITION';

export const initialRegionPosition = curry(obq => ({
  type: INITIAL_REGION_POSITION,
  payload: obq
}));

export const CHANGE_REGION_POSITION = 'APP/MAP/CHANGE_REGION_POSITION';

export const changeRegionPosition = curry(obq => ({
  type: CHANGE_REGION_POSITION,
  payload: obq
}));

export const CHANGE_POSITION = 'APP/MAP/CHANGE_POSITION';

export const changePosition = curry(obq => ({
  type: CHANGE_POSITION,
  payload: obq
}));

export const ERROR_POSITION = 'APP/MAP/ERROR_POSITION';

export const errorPosition = curry(e => ({
  type: ERROR_POSITION,
  payload: e
}));
