import { createTypes } from 'redux-compose-reducer';

const TYPES = createTypes('ui/map', [
  'changePosition',
  'errorPosition',
  'clearMap'
]);

export const changePosition = obq => ({ type: TYPES.changePosition, payload: obq });

export const errorPosition = e => ({ type: TYPES.errorPosition, payload: e });

export const clearMap = () => ({ type: TYPES.clearMap });
