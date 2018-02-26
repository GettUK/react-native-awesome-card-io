import { combineReducers } from 'redux';
import addresses from './addresses';
import auth from './auth';
import geocode from './geocode';
import login from './login';
import logout from './logout';
import map from './map';
import navigation from './navigation';
import passengerView from './passenger-view';
import resetPassword from './resetPassword';

export default combineReducers({
  addresses,
  auth,
  geocode,
  login,
  logout,
  map,
  navigation,
  passengerView,
  resetPassword
});
