import React from 'react';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { Sentry } from 'react-native-sentry';
import { SENTRY_CONFIG } from 'react-native-dotenv';
import ConnectedNavigator from './navigation';
import SplashScreen from './components/SplashScreen';

import store from './config/store';

if (SENTRY_CONFIG) {
  Sentry.config(SENTRY_CONFIG).install();
}

const persistor = persistStore(store);

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      {bootstraped => (
        <SplashScreen bootstraped={bootstraped}>
          <ConnectedNavigator />
        </SplashScreen>
      )}
    </PersistGate>
  </Provider>
);

export default App;
