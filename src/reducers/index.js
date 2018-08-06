import { combineReducers } from 'redux';
import network from './network';
import router from './router';
import app from './app';
import ui from './ui';
import session from './session';
import booking from './booking';
import passenger from './passenger';
import orders from './orders';
import notifications from './notifications';

export default combineReducers({
  network,
  router,
  app,
  ui,
  session,
  booking,
  passenger,
  orders,
  notifications
});
