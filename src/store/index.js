import { createStore as createStore_, applyMiddleware, compose } from 'redux';
// import { createNetworkMiddleware } from 'react-native-offline';
import thunk from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createFilter } from 'redux-persist-transform-filter';
// import {
//     createLogger
// } from 'redux-logger';
// TODO fix when go to prod;
// import {
//     composeWithDevTools
// } from 'redux-devtools-extension/logOnlyInProduction';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer, initialState } from 'reducers';
import { changeIsOpenKeyboard } from 'actions/app/statuses';

export function getMiddlewares() {
	// const middlewares = [thunk, createNetworkMiddleware()];
	const middlewares = [thunk];
	if (process.env.NODE_ENV === 'development') {
		// TODO fix logger if needed;
		// middlewares.push(createLogger());
	}
	return middlewares;
}
function getPreloadedState() {
	return initialState;
}
function getEnhancer() {
	const chain = [applyMiddleware(...getMiddlewares())];
	return compose(...chain);
}
export function createStore() {
	const persistConfig = {
		key: 'root',
		storage,
		transforms: [createFilter('app', ['statuses'])],
		whitelist: ['app']
	};
	const store = createStore_(
		enableBatching(persistReducer(persistConfig, reducer)),
		getPreloadedState(),
		composeWithDevTools(getEnhancer())
	);
	// const persistor = persistStore(store, {}, () => {
	// 	store.dispatch(changeIsOpenKeyboard(false));
	// }).purge([]);
	const persistor = persistStore(store, null, () => {
		store.dispatch(changeIsOpenKeyboard(false));
	});
	return { store, persistor };
}
