import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store, { persistor } from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
