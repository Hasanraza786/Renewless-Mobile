import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store, { persistor } from './src/redux/store';
import { restoreToken } from './src/redux/slices/constant-slice';
import MainNavigator from './src/navigation/MainNavigator';
import { loadSessionToken } from './src/utils/session-token';

function App() {
  // The first route depends on the Keychain token, so the navigator waits for it.
  const [token_ready, setTokenReady] = useState(false);

  useEffect(() => {
    loadSessionToken().then(token => {
      store.dispatch(restoreToken(token));
      setTokenReady(true);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <Provider store={store}>
        <PersistGate persistor={persistor}>{token_ready ? <MainNavigator /> : null}</PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
