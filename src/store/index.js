import { createStore as createStore_, applyMiddleware, compose } from 'redux';
import { createNetworkMiddleware } from 'react-native-offline';
import thunk from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createFilter } from 'redux-persist-transform-filter';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import reducer from 'reducers';

import { checkMultiplePermissions } from 'actions/app/statuses';

export function getMiddlewares() {
  const middlewares = [thunk, createNetworkMiddleware()];
  if (process.env.NODE_ENV === 'development') {
    global.XMLHttpRequest = global.originalXMLHttpRequest ?
      global.originalXMLHttpRequest :
      global.XMLHttpRequest;
    global.FormData = global.originalFormData ?
      global.originalFormData :
      global.FormData;
    // TODO fix logger if needed;
    middlewares.push(createLogger({ collapsed: true }));
  }
  return middlewares;
}

// function getPreloadedState() {
//   return initialState;
// }

function getEnhancer() {
  const chain = [applyMiddleware(...getMiddlewares())];
  return compose(...chain);
}

export function createStore() {
  const persistConfig = {
    key: 'root',
    storage,
    transforms: [
      createFilter('app', ['statuses', 'push', 'devSettings', 'theme']),
      createFilter('session', ['token'])
    ],
    whitelist: ['app', 'session', 'notifications']
  };
  const store = createStore_(
    enableBatching(persistReducer(persistConfig, reducer)),
    // getPreloadedState(),
    composeWithDevTools(getEnhancer())
  );

  const persistor = persistStore(store, null, () => {
    store.dispatch(checkMultiplePermissions(['camera', 'photo']));
  });

  return { store, persistor };
}
