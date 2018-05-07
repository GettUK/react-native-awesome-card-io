import { createTypes } from 'redux-compose-reducer';

const TYPES = createTypes('session', ['userLogin', 'userData', 'userLogout']);

export const userLogin = token => ({ type: TYPES.userLogin, payload: { token } });

export const userData = result => ({ type: TYPES.userData, payload: result });

export const userLogout = () => ({ type: TYPES.userLogout });
