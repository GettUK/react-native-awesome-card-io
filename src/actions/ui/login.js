import { createTypes } from 'redux-compose-reducer';
import { batchActions } from 'redux-batched-actions';
import { get, post } from 'utils';
import { userLogin, userData } from 'actions/session';
import { authSuccess, authFailure } from 'actions/ui/auth';
import { registerToken } from 'actions/app/pushNotifications';
import { curry } from 'lodash';

const TYPES = createTypes('ui/login', [
  'changeField',
  'loginStart',
  'loginSuccess',
  'loginFailure'
]);

const changeField = curry((path, field, value) => ({ type: TYPES.changeField, payload: { path, field, value } }));

const changeFields = changeField('fields');

export const changeEmail = changeFields('email');

export const changePassword = changeFields('password');

const changeCheckboxes = changeField('checkboxes');

export const termsConditionsSwitch = changeCheckboxes('termsConditions');

export const privacyPolicySwitch = changeCheckboxes('privacyPolicy');

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

      dispatch(registerToken());
    })
    .catch((errors) => {
      dispatch(loginFailure(errors));
    });
};
