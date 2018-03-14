import { combineReducers } from 'redux';
import network from './network';
import router from './router';
import app from './app';
import ui from './ui';
import session from './session';
import bookings from './booking';
import passenger from './passenger';
import orders from './orders';

export const reducer = combineReducers({
  network,
  router,
  app,
  ui,
  session,
  bookings,
  passenger,
  orders
});
