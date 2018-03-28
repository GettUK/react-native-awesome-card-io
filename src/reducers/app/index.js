import { combineReducers } from 'redux';
import statuses from './statuses';
import push from './push';

export default combineReducers({
  statuses,
  push
});
