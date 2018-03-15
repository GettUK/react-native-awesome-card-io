import NavigatorLogin from 'navigators/navigatorLogin';

const initialState = NavigatorLogin.router.getStateForAction(NavigatorLogin.router.getActionForPathAndParams('Login'));

const reducerNavigatorLogin = (state = initialState, action) =>
  NavigatorLogin.router.getStateForAction(action, state);

export default reducerNavigatorLogin;
