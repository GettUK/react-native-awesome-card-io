import { curry } from 'lodash/fp';
import { batchActions } from 'redux-batched-actions';
import { userLogin, userData } from 'actions/session';
import { authSuccess } from 'actions/ui/auth';
import { login as loginRequest } from 'services/auth';

export const CHANGE_EMAIL = 'UI/LOGIN/CHANGE_EMAIL';

export const changeEmail = curry(value => ({
  type: CHANGE_EMAIL,
  payload: value
}));

export const CHANGE_PASSWORD = 'UI/LOGIN/CHANGE_PASSWORD';

export const changePassword = curry(value => ({
  type: CHANGE_PASSWORD,
  payload: value
}));

export const SET_SHOW_PASSWORD = 'UI/LOGIN/SET_SHOW_PASSWORD';

export const setShowPassword = () => ({
  type: SET_SHOW_PASSWORD
});

export const LOGIN_START = 'UI/LOGIN/LOGIN_START';

export const loginStart = () => ({
  type: LOGIN_START
});

export const LOGIN_SUCCESS = 'UI/LOGIN/LOGIN_SUCCESS';

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

export const LOGIN_FAILURE = 'UI/LOGIN/LOGIN_FAILURE';

export const loginFailure = curry(errors => ({
  type: LOGIN_FAILURE,
  payload: errors
}));

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
