import { createTypes } from 'redux-compose-reducer';
import { batchActions } from 'redux-batched-actions';
import { get } from 'utils';
import { userData } from 'actions/session';

const TYPES = createTypes('ui/auth', [
  'authStart',
  'authSuccess',
  'authFailure'
]);

export const authStart = () => ({ type: TYPES.authStart });

export const authSuccess = () => ({ type: TYPES.authSuccess });

export const authFailure = errors => ({ type: TYPES.authFailure, payload: errors });

export const auth = () => (dispatch, getState) => {
  const { ui } = getState();

  if (ui.auth.busy) {
    return Promise.resolve();
  }

  dispatch(authStart());
  return get('/session')
    .then(({ data }) => {
      dispatch(batchActions([authSuccess(), userData(data)]));
    })
    .catch((errors) => {
      dispatch(authFailure(errors));
    });
};
