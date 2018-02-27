import { createTypes } from 'redux-compose-reducer';
import { batchActions } from 'redux-batched-actions';
import { userLogin, userData } from 'actions/session';
import { authSuccess } from 'actions/ui/auth';
import { login as loginRequest } from 'services/auth';

const TYPES = createTypes('ui/login',
  ['changeEmail', 'changePassword', 'setShowPassword', 'loginStart', 'loginSuccess', 'loginFailure']);

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

  return loginRequest({ user: { ...ui.login.fields } })
    .then(({ token, realms, result }) => {
      dispatch(
        batchActions([
          loginSuccess(),
          userLogin(token, realms),
          userData(result),
          authSuccess()
        ])
      );
    })
    .catch(errors => {
      dispatch(loginFailure(errors));
    });
};
