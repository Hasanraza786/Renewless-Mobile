import type { UnknownAction } from '@reduxjs/toolkit';
import type { ThunkAction } from '@reduxjs/toolkit';
import type { RootState } from '../types';
import { resetAuth } from './slices/auth-slice';
import { resetConnectors } from './slices/connectors-slice';
import { resetDashboard } from './slices/dashboard-slice';
import { resetNotifications } from './slices/notifications-slice';
import { resetProfile } from './slices/profile-slice';
import { clearSession } from './slices/session-slice';
import { resetSubscriptions } from './slices/subscriptions-slice';

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
