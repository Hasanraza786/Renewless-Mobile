import type { UnknownAction } from '@reduxjs/toolkit';
import type { ThunkAction } from '@reduxjs/toolkit';
import type { RootState } from '../types';
import { resetAuth } from './slices/authSlice';
import { resetConnectors } from './slices/connectorsSlice';
import { resetDashboard } from './slices/dashboardSlice';
import { resetNotifications } from './slices/notificationsSlice';
import { resetProfile } from './slices/profileSlice';
import { clearSession } from './slices/sessionSlice';
import { resetSubscriptions } from './slices/subscriptionsSlice';

export function endSession(): ThunkAction<void, RootState, undefined, UnknownAction> {
  return dispatch => {
    dispatch(clearSession());
    dispatch(resetProfile());
    dispatch(resetDashboard());
    dispatch(resetSubscriptions());
    dispatch(resetNotifications());
    dispatch(resetConnectors());
    dispatch(resetAuth());
  };
}
