import { createStore as createStore_, applyMiddleware, compose } from 'redux';
import { createNetworkMiddleware } from 'react-native-offline';
import thunk from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createFilter } from 'redux-persist-transform-filter';
// import {
//     createLogger
// } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { reducer, initialState } from 'reducers';
import {
  changeKeyboardStatus
  // changePermissions
} from 'actions/app/statuses';
// import { checkMultiplePermissions } from 'utils';

export function getMiddlewares() {
  const middlewares = [thunk, createNetworkMiddleware()];
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
  // 	store.dispatch(changeKeyboardStatus(false));
  // }).purge([]);
  const persistor = persistStore(store, null, () => {
    store.dispatch(changeKeyboardStatus(false));
    // checkMultiplePermissions(['location'], perms => {
    //   store.dispatch(changePermissions({ ...perms }));
    // });
  });
  return { store, persistor };
}
