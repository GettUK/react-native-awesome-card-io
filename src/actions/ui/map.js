import { createTypes } from 'redux-compose-reducer';

const TYPES = createTypes('ui/map', [
  'removeFields',
  'changeFields',
  'changeAddress',
  'changePosition',
  'errorPosition',
  'clearMap'
]);

export const removeFields = fields => ({ type: TYPES.removeFields, payload: fields });

export const changeFields = fields => ({ type: TYPES.changeFields, payload: fields });

export const changeAddress = (address, meta) => ({ type: TYPES.changeAddress, payload: { address, meta } });

export const changePosition = obq => ({ type: TYPES.changePosition, payload: obq });

export const errorPosition = e => ({ type: TYPES.errorPosition, payload: e });

export const clearMap = () => ({ type: TYPES.clearMap });
