import { createTypes } from 'redux-compose-reducer';
import { batchActions } from 'redux-batched-actions';
import { userLogout } from 'actions/session';

const TYPES = createTypes('ui/logout',
  ['logoutSuccess']);

export const logoutSuccess = () => ({ type: TYPES.logoutSuccess });

export const NAVIGATION_RESET = 'ui/logout/navigationReset';

export const navigationReset = () => ({ type: NAVIGATION_RESET });

export const logout = () => (dispatch, getState) => {
  const { ui } = getState();

  if (ui.logout.busy) {
    return Promise.resolve();
  }

  dispatch(batchActions([userLogout(), logoutSuccess(), navigationReset()]));

  return Promise.resolve();
};
