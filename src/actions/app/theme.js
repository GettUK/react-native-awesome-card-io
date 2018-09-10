/* eslint-disable import/prefer-default-export */
import { createTypes } from 'redux-compose-reducer';

const TYPES = createTypes('app/theme', ['changeTheme']);

export const changeTheme = values => dispatch => (
  dispatch({ type: TYPES.changeTheme, payload: { values } })
);
