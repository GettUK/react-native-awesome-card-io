import NavigatorApp from 'navigators/navigatorApp';

export const initialState = NavigatorApp.router.getStateForAction(
  NavigatorApp.router.getActionForPathAndParams('MapView')
);

export const reducer = (state, action) =>
  NavigatorApp.router.getStateForAction(action, state);
