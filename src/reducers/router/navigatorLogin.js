import NavigatorLogin from 'navigators/navigatorLogin';

export const initialState = NavigatorLogin.router.getStateForAction(
  NavigatorLogin.router.getActionForPathAndParams('Login')
);

export const reducer = (state, action) =>
  NavigatorLogin.router.getStateForAction(action, state);
