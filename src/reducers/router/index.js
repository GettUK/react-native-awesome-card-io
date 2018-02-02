import {
  initialState as initialNavigatorApp,
  reducer as reducerNavigatorApp
} from './navigatorApp';

export const initialState = {
  navigatorApp: initialNavigatorApp
};

export const reducer = (state, action) => ({
  navigatorApp: reducerNavigatorApp(state.navigatorApp, action)
});
