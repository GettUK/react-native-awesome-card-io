import { createTypes } from 'redux-compose-reducer';
import { batchActions } from 'redux-batched-actions';

import { userLogout } from 'actions/session';
import { clearPassenger } from 'actions/passenger';
import { clearMap } from 'actions/ui/map';
import { clearList } from 'actions/orders';
import { clearBooking } from 'actions/booking';
import { passegerViewEmpty } from 'actions/ui/passenger-view';

const TYPES = createTypes('ui/logout', [
  'logoutStart',
  'logoutSuccess'
]);

export const logoutStart = () => ({ type: TYPES.logoutStart });

export const logoutSuccess = () => ({ type: TYPES.logoutSuccess });

export const NAVIGATION_RESET = 'ui/logout/navigationReset';

export const navigationReset = () => ({ type: NAVIGATION_RESET });

export const logout = () => (dispatch, getState) => {
  const { ui } = getState();

  if (ui.logout.busy) {
    return Promise.resolve();
  }

  dispatch(logoutStart());

  dispatch(batchActions([userLogout(), navigationReset()]));

  dispatch(batchActions([
    clearList(),
    clearPassenger(),
    clearBooking(),
    passegerViewEmpty(),
    clearMap(),
    logoutSuccess()
  ]));

  return Promise.resolve();
};
