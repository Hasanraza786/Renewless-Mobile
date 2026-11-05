import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../types';
import {
  authReducer,
  connectorsReducer,
  constantReducer,
  onboardingReducer,
  dashboardReducer,
  detailReducer,
  listReducer,
  notificationsReducer,
  paymentsReducer,
  calendarReducer,
  alertsReducer,
  inboxReducer,
  profileReducer,
  subscriptionsReducer,
} from './slices';
import { redux_storage } from './storage';

const root_reducer = combineReducers({
  constant: constantReducer,
  auth: authReducer,
  profile: profileReducer,
  dashboard: dashboardReducer,
  detail: detailReducer,
  list: listReducer,
  payments: paymentsReducer,
  calendar: calendarReducer,
  alerts: alertsReducer,
  inbox: inboxReducer,
  subscriptions: subscriptionsReducer,
  notifications: notificationsReducer,
  connectors: connectorsReducer,
  onboarding: onboardingReducer,
});

const persisted_reducer = persistReducer(
  {
    key: 'root',
    storage: redux_storage,
    whitelist: ['constant'],
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
