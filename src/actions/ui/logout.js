import { curry } from 'lodash/fp';
import { batchActions } from 'redux-batched-actions';
// import {
//     logout as logoutRequest
// } from 'services/auth';
import { userLogout } from 'actions/session';

export const LOGOUT_START = 'UI/LOGOUT/LOGOUT_START';

export const logoutStart = () => ({
  type: LOGOUT_START
});

export const LOGOUT_SUCCESS = 'UI/LOGOUT/LOGOUT_SUCCESS';

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const LOGOUT_FAILURE = 'UI/LOGOUT/LOGOUT_FAILURE';

export const logoutFailure = curry(errors => ({
  type: LOGOUT_FAILURE,
  payload: errors
}));

export const logout = () => (dispatch, getState) => {
  const { ui } = getState();

  if (ui.logout.busy) {
    return Promise.resolve();
  }
  dispatch(batchActions([userLogout(), logoutSuccess()]));

  // dispatch(logoutStart());
  //
  // return logoutRequest(session.token)
  //     .then(() => {
  //         dispatch(
  //             logoutSuccess()
  //         );
  //     })
  //     .catch(errors => {
  //         dispatch(logoutFailure(errors));
  //     });
  return Promise.resolve();
};
