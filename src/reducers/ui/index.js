import { combineReducers } from 'redux';
import map from './map';
import navigation from './navigation';

export default combineReducers({
  map,
  navigation
});
