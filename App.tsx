import { useCallback, useState } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store, { persistor } from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';
import Splash from './src/screens/Splash';

function App() {
  const [splash_complete, setSplashComplete] = useState(false);
  const onSplashComplete = useCallback(() => setSplashComplete(true), []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {bootstrapped => bootstrapped && splash_complete
            ? <RootNavigator />
            : <Splash onComplete={onSplashComplete} />}
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
