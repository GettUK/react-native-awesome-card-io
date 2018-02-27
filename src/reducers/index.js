import { combineReducers } from 'redux';
import network from './network';
import router from './router';
import app from './app';
import ui from './ui';
import session from './session';

export const reducer = combineReducers({
  network,
  router,
  app,
  ui,
  session
});
