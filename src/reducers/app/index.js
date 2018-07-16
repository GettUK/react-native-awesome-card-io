import { combineReducers } from 'redux';
import devSettings from './devSettings';
import statuses from './statuses';
import push from './push';

export default combineReducers({
  devSettings,
  statuses,
  push
});
