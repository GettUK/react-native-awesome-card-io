import { curry } from 'lodash/fp';

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
