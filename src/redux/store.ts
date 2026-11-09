import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../types';
import {
  authReducer,
  constantReducer,
  onboardingReducer,
  dashboardReducer,
  detailReducer,
  listReducer,
  paymentsReducer,
  calendarReducer,
  alertsReducer,
  inboxReducer,
  profileReducer,
} from './slices';
import { redux_storage } from './storage';

// The login token is never written to storage here; it lives in the Keychain (utils/session-token).
const constant_reducer = persistReducer({ key: 'constant', storage: redux_storage, blacklist: ['token'] }, constantReducer);

const root_reducer = combineReducers({
  constant: constant_reducer,
  auth: authReducer,
  profile: profileReducer,
  dashboard: dashboardReducer,
  detail: detailReducer,
  list: listReducer,
  payments: paymentsReducer,
  calendar: calendarReducer,
  alerts: alertsReducer,
  inbox: inboxReducer,
  onboarding: onboardingReducer,
});

const persisted_reducer = persistReducer(
  {
    key: 'root',
    storage: redux_storage,
    whitelist: [],
  },
  root_reducer,
);

const store = configureStore({
  reducer: persisted_reducer,
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
