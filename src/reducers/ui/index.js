import { combineReducers } from 'redux';
import auth from './auth';
import login from './login';
import logout from './logout';
import map from './map';
import navigation from './navigation';
import passengerView from './passenger-view';
import resetPassword from './resetPassword';

export default combineReducers({
  auth,
  login,
  logout,
  map,
  navigation,
  passengerView,
  resetPassword
});
