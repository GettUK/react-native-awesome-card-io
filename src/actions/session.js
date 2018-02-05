import { curry } from 'lodash/fp';

export const USER_LOGIN = 'SESSION/USER_LOGIN';

export const userLogin = curry((token, realms) => ({
  type: USER_LOGIN,
  payload: { token, realms }
}));

export const USER_DATA = 'SESSION/USER_DATA';

export const userData = curry(result => ({
  type: USER_DATA,
  payload: result
}));

export const USER_LOGOUT = 'SESSION/USER_LOGOUT';

export const userLogout = curry(() => ({
  type: USER_LOGOUT
}));
