import { curry } from 'lodash/fp';
import { batchActions } from 'redux-batched-actions';
import { auth as authRequest } from 'services/auth';
import { userData } from 'actions/session';

export const AUTH_START = 'UI/AUTH/AUTH_START';

export const authStart = () => ({
  type: AUTH_START
});

export const AUTH_SUCCESS = 'UI/AUTH/AUTH_SUCCESS';

export const authSuccess = () => ({
  type: AUTH_SUCCESS
});

export const AUTH_FAILURE = 'UI/AUTH/AUTH_FAILURE';

export const authFailure = curry(errors => ({
  type: AUTH_FAILURE,
  payload: errors
}));

export const auth = () => (dispatch, getState) => {
  const { ui, session } = getState();

  if (ui.auth.busy) {
    return Promise.resolve();
  }

  dispatch(authStart());

  return authRequest(session.token)
    .then(result => {
      dispatch(batchActions([authSuccess(), userData(result)]));
    })
    .catch(errors => {
      dispatch(authFailure(errors));
    });
};
