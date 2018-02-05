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

export const initialState = {
  auth: initialAuthState,
  login: initialLoginState,
  logout: initialLogoutState
};

export const reducer = (state, action) => ({
  auth: reducerAuth(state.auth, action),
  login: reducerLogin(state.login, action),
  logout: reducerLogout(state.logout, action)
});
