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

export function reducer(state, action) {
	const nextNetwork = reducerNetwork(state.network, action);
	const nextApp = reducerApp(state.app, action);
	const nextRouter = reducerRouter(state.router, action);

	if (
		state.network === nextNetwork &&
		state.app === nextApp &&
		state.router === nextRouter
	) {
		return state;
	}

	return {
		network: nextNetwork,
		app: nextApp,
		router: nextRouter
	};
}
