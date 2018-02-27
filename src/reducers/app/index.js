import { combineReducers } from 'redux';
import statuses from './statuses';
import orders from './orders';

export default combineReducers({
  statuses,
  orders
});
