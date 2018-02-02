import { curry } from 'lodash/fp';

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
