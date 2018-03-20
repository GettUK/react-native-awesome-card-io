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
import { isEmpty } from 'lodash/fp';
import { auth } from 'actions/ui/auth';
import {
  changeKeyboardStatus,
  checkMultiplePermissions
} from 'actions/app/statuses';

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
      createFilter('app', ['statuses', 'push']),
      createFilter('session', ['token', 'realms', 'result'])
    ],
    whitelist: ['app', 'session']
  };
  const store = createStore_(
    enableBatching(persistReducer(persistConfig, reducer)),
    // getPreloadedState(),
    composeWithDevTools(getEnhancer())
  );
  // const persistor = persistStore(store, {}, () => {
  // store.dispatch(changeKeyboardStatus(false));
  // }).purge([]);
  const persistor = persistStore(store, null, () => {
    if (!isEmpty(store.getState().session.token)) {
      store.dispatch(auth());
    }
    store.dispatch(changeKeyboardStatus(false));
    store.dispatch(checkMultiplePermissions(['location', 'camera', 'photo']));
  });
  return { store, persistor };
}
