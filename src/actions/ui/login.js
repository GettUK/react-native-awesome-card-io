import { createTypes } from 'redux-compose-reducer';
import { batchActions } from 'redux-batched-actions';
import { get, post } from 'utils';
import { userLogin, userData } from 'actions/session';
import { authSuccess, authFailure } from 'actions/ui/auth';

const TYPES = createTypes('ui/login', [
  'changeEmail',
  'changePassword',
  'setShowPassword',
  'loginStart',
  'loginSuccess',
  'loginFailure'
]);

export const changeEmail = value => ({ type: TYPES.changeEmail, payload: value });

export const changePassword = value => ({ type: TYPES.changePassword, payload: value });

export const setShowPassword = () => ({ type: TYPES.setShowPassword });

export const loginStart = () => ({ type: TYPES.loginStart });

export const loginSuccess = () => ({ type: TYPES.loginSuccess });

export const loginFailure = errors => ({ type: TYPES.loginFailure, payload: errors });

export const login = () => (dispatch, getState) => {
  const { ui } = getState();

  if (ui.login.busy) {
    return Promise.resolve();
  }

  dispatch(loginStart());

  return post('/session', { user: { ...ui.login.fields } })
    .then(({ data: { token, realms } }) => {
      get('/session')
        .then(({ data }) => {
          dispatch(batchActions([authSuccess(), userData(data)]));
        })
        .catch((errors) => {
          dispatch(authFailure(errors));
        });

      dispatch(batchActions([
        loginSuccess(),
        userLogin(token, realms)
      ]));
    })
    .catch((errors) => {
      dispatch(loginFailure(errors));
    });
};
