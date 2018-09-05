import { combineReducers } from 'redux';
import devSettings from './devSettings';
import statuses from './statuses';
import push from './push';
import theme from './theme';

export default combineReducers({
  devSettings,
  statuses,
  push,
  theme
});
