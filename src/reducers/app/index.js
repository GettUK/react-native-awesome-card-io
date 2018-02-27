import { combineReducers } from 'redux';
import statuses from './statuses';
import orders from './orders';
import booking from './booking';

export default combineReducers({
  booking,
  statuses,
  orders
});
