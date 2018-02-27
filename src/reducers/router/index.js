import { combineReducers } from 'redux';
import navigatorApp from './navigatorApp';
import navigatorLogin from './navigatorLogin';

export default combineReducers({
  navigatorApp,
  navigatorLogin
});
