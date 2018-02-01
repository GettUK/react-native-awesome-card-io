import NavigatorApp from 'navigators/navigatorApp';

export const initialState = NavigatorApp.router.getStateForAction(
  NavigatorApp.router.getActionForPathAndParams('App')
);

export function reducer(state, action) {
  return NavigatorApp.router.getStateForAction(action, state);
}
