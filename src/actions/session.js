import { createTypes } from 'redux-compose-reducer';
import { Answers } from 'react-native-fabric';
import { auth } from 'api';
import { put } from 'utils';
import { registerToken } from 'actions/app/pushNotifications';
import { clearPassenger } from 'actions/passenger';
import { clearMap, cancelDriverSubscription } from 'actions/ui/map';
import { clearOrdersList } from 'actions/orders';
import { clearBooking } from 'actions/booking';
import { clearPermissions } from 'actions/app/statuses';
import { getNotifications } from 'actions/notifications';

const TYPES = createTypes('session', [
  'loginSuccess',
  'getCurrentUserStart',
  'getCurrentUserSuccess',
  'getCurrentUserFailure',
  'logout',
  'passGuide',
  'resetGuide'
]);

export const logout = () => (dispatch) => {
  dispatch({ type: TYPES.logout });
  dispatch(cancelDriverSubscription());
  dispatch(clearPassenger());
  dispatch(clearMap());
  dispatch(clearOrdersList());
  dispatch(clearBooking());
  dispatch(clearPermissions());
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
      if (token) {
        Answers.logLogin('Basic', true);
        dispatch({ type: TYPES.loginSuccess, payload: token });
        dispatch(getCurrentUser());
        dispatch(registerToken());
      }
    })
    .then(() => {
      dispatch(getNotifications());
    });

export const passGuide = () => dispatch => (
  put('/user/pass_guide')
    .then(() => dispatch({ type: TYPES.passGuide }))
);

export const resetGuide = () => dispatch =>
  dispatch({ type: TYPES.resetGuide });
