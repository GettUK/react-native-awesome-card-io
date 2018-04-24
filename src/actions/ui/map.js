import { createTypes } from 'redux-compose-reducer';
import { post } from 'utils';

const TYPES = createTypes('ui/map', [
  'removeFields',
  'changeFields',
  'changeAddress',
  'changePosition',
  'errorPosition',
  'changeReference',
  'setReferenceErrors',
  'resetReferenceValues',
  'changeMessageToDriver',
  'saveMessageToDriver',
  'clearMap'
]);

export const removeFields = fields => ({ type: TYPES.removeFields, payload: fields });

export const changeFields = fields => ({ type: TYPES.changeFields, payload: fields });

export const changeAddress = (address, meta) => ({ type: TYPES.changeAddress, payload: { address, meta } });

export const changePosition = obq => ({ type: TYPES.changePosition, payload: obq });

export const errorPosition = e => ({ type: TYPES.errorPosition, payload: e });

export const changeReference = reference => ({ type: TYPES.changeReference, payload: reference });

export const validateReferences = () => (_, getState) =>
  post('bookings/validate_references', { bookerReferences: getState().ui.map.fields.bookerReferences });

export const setReferenceErrors = errors => ({ type: TYPES.setReferenceErrors, payload: errors });

export const resetReferenceValues = () => ({ type: TYPES.resetReferenceValues });

export const changeMessageToDriver = (message, touched = false) =>
  ({ type: TYPES.changeMessageToDriver, payload: { message, touched } });

export const saveMessageToDriver = () => (dispatch, getState) =>
  dispatch(changeFields({ message: getState().ui.map.tempMessageToDriver }));

export const clearMap = () => ({ type: TYPES.clearMap });
