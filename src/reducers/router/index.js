import {
  initialState as initialNavigatorApp,
  reducer as reducerNavigatorApp
} from './navigatorApp';

export const initialState = {
  navigatorApp: initialNavigatorApp
};

export function reducer(state, action) {
  const nextNavigatorApp = reducerNavigatorApp(state.navigatorApp, action);

  if (state.navigatorApp === nextNavigatorApp) {
    return state;
  }

  return {
    navigatorApp: nextNavigatorApp
  };
}
