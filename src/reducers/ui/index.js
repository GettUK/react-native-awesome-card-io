import {
  initialState as initialAuthState,
  reducer as reducerAuth
} from './auth';
import {
  initialState as initialLoginState,
  reducer as reducerLogin
} from './login';
import {
  initialState as initialLogoutState,
  reducer as reducerLogout
} from './logout';
import {
  initialState as initialPassengerViewState,
  reducer as reducerPassengerView
} from './passenger-view';

export const initialState = {
  auth: initialAuthState,
  login: initialLoginState,
  logout: initialLogoutState,
  passengerView: initialPassengerViewState
};

export const reducer = (state, action) => ({
  auth: reducerAuth(state.auth, action),
  login: reducerLogin(state.login, action),
  logout: reducerLogout(state.logout, action),
  passengerView: reducerPassengerView(state.passengerView, action)
});
