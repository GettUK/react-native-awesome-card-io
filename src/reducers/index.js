import {
  initialState as initialNetworkState,
  reducer as reducerNetwork
} from './network';
import { initialState as initialAppState, reducer as reducerApp } from './app';
import {
  initialState as initialRouterState,
  reducer as reducerRouter
} from './router';

export const initialState = {
  network: initialNetworkState,
  app: initialAppState,
  router: initialRouterState
};

export const reducer = (state, action) => ({
  network: reducerNetwork(state.network, action),
  app: reducerApp(state.app, action),
  router: reducerRouter(state.router, action)
});
