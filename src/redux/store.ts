import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../types';
import {
  authReducer,
  connectorsReducer,
  dashboardReducer,
  notificationsReducer,
  profileReducer,
  sessionReducer,
  subscriptionsReducer,
} from './slices';
import { reduxStorage } from './storage';

const rootReducer = combineReducers({
  session: sessionReducer,
  auth: authReducer,
  profile: profileReducer,
  dashboard: dashboardReducer,
  subscriptions: subscriptionsReducer,
  notifications: notificationsReducer,
  connectors: connectorsReducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: reduxStorage,
    whitelist: ['session'],
  },
  rootReducer,
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
