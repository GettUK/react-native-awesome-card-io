import { createTypes } from 'redux-compose-reducer';
import { curry } from 'lodash/fp';

const TYPES = createTypes('app/devSettings', ['changeField']);

// eslint-disable-next-line import/prefer-default-export
export const changeDevSettingField = curry((field, value) => ({ type: TYPES.changeField, payload: { field, value } }));
