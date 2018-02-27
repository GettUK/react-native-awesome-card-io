import { createTypes } from 'redux-compose-reducer';

const TYPES = createTypes('app/statuses', ['changeKeyboardStatus', 'changePermissions']);

export const changeKeyboardStatus = value => ({ type: TYPES.changeKeyboardStatus, payload: value });

export const changePermissions = perms => ({ type: TYPES.changePermissions, payload: perms });
