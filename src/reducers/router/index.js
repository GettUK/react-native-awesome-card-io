import {
  initialState as initialNavigatorApp,
  reducer as reducerNavigatorApp
} from './navigatorApp';
import {
  initialState as initialNavigatorLogin,
  reducer as reducerNavigatorLogin
} from './navigatorLogin';

export const initialState = {
  navigatorApp: initialNavigatorApp,
  navigatorLogin: initialNavigatorLogin
};

export const reducer = (state, action) => ({
  navigatorApp: reducerNavigatorApp(state.navigatorApp, action),
  navigatorLogin: reducerNavigatorLogin(state.navigatorLogin, action)
});
