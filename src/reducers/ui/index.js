import { combineReducers } from 'redux';
import map from './map';
import navigation from './navigation';
import weather from './weather';

export default combineReducers({
  map,
  navigation,
  weather
});
