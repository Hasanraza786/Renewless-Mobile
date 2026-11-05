import type { UnknownAction } from '@reduxjs/toolkit';
import type { ThunkAction } from '@reduxjs/toolkit';
import type { RootState } from '../types';
import { resetAuth } from './slices/auth-slice';
import { clearSession } from './slices/constant-slice';
import { resetConnectors } from './slices/connectors-slice';
import { resetDashboard } from './slices/dashboard-slice';
import { resetDetail } from './slices/detail-slice';
import { resetList } from './slices/list-slice';
import { resetNotifications } from './slices/notifications-slice';
import { resetProfile } from './slices/profile-slice';
import { resetSubscriptions } from './slices/subscriptions-slice';

export function endSession(): ThunkAction<void, RootState, undefined, UnknownAction> {
  return dispatch => {
    dispatch(clearSession());
    dispatch(resetProfile());
    dispatch(resetDashboard());
    dispatch(resetDetail());
    dispatch(resetList());
    dispatch(resetSubscriptions());
    dispatch(resetNotifications());
    dispatch(resetConnectors());
    dispatch(resetAuth());
  };
}
