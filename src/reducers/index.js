import {
  initialState as initialNetworkState,
  reducer as reducerNetwork
} from './network';
import {
  initialState as initialRouterState,
  reducer as reducerRouter
} from './router';
import { initialState as initialAppState, reducer as reducerApp } from './app';
import { initialState as initialUIState, reducer as reducerUI } from './ui';
import {
  initialState as initialSessionState,
  reducer as reducerSession
} from './session';

export const initialState = {
  network: initialNetworkState,
  router: initialRouterState,
  app: initialAppState,
  ui: initialUIState,
  session: initialSessionState
};

export const reducer = (state, action) => ({
  network: reducerNetwork(state.network, action),
  router: reducerRouter(state.router, action),
  app: reducerApp(state.app, action),
  ui: reducerUI(state.ui, action),
  session: reducerSession(state.session, action)
});
