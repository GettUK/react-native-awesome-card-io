import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { createStore } from 'store';
import { withNetworkConnectivity } from 'react-native-offline';
import App from 'containers/App';

const { store, persistor } = createStore();

const Apps = withNetworkConnectivity({
  withRedux: true
})(App);

function wrapper() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Apps />
      </PersistGate>
    </Provider>
  );
}

export default wrapper;
