import { createTypes } from 'redux-compose-reducer';
import { batchActions } from 'redux-batched-actions';
import { auth as authRequest } from 'services/auth';
import { userData } from 'actions/session';

const TYPES = createTypes('ui/auth',
  ['authStart', 'authSuccess', 'authFailure']);

export const authStart = () => ({ type: TYPES.authStart });

export const authSuccess = () => ({ type: TYPES.authSuccess });

export const authFailure = errors => ({ type: TYPES.authFailure, payload: errors });

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
