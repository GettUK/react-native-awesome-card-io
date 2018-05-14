import { createTypes } from 'redux-compose-reducer';
import { auth } from 'api';
import { registerToken } from 'actions/app/pushNotifications';
import { clearPassenger } from 'actions/passenger';
import { clearMap } from 'actions/ui/map';
import { clearOrdersList } from 'actions/orders';
import { clearBooking } from 'actions/booking';

const TYPES = createTypes('session', [
  'loginSuccess',
  'getCurrentUserStart',
  'getCurrentUserSuccess',
  'getCurrentUserFailure',
  'logout'
]);

export const logout = () => (dispatch) => {
  dispatch({ type: TYPES.logout });
  dispatch(clearPassenger());
  dispatch(clearMap());
  dispatch(clearOrdersList());
  dispatch(clearBooking());
};

export const getCurrentUser = () => (dispatch) => {
  dispatch(({ type: TYPES.getCurrentUserStart }));
  return auth.getCurrentUser()
    .then(({ data }) => {
      dispatch(({ type: TYPES.getCurrentUserSuccess, payload: data }));
      return data;
    })
    .catch((err) => {
      dispatch(logout());
      throw err;
    });
};

export const login = user => dispatch =>
  auth.login(user)
    .then(({ data: { token } }) => {
      dispatch({ type: TYPES.loginSuccess, payload: token });
      dispatch(getCurrentUser());
      dispatch(registerToken());
    });

