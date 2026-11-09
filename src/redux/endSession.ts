import type { UnknownAction } from '@reduxjs/toolkit';
import type { ThunkAction } from '@reduxjs/toolkit';
import type { RootState } from '../types';
import { clearWidgetSnapshot } from '../utils/widget';
import { clearSessionToken } from '../utils/session-token';
import { resetRoot } from '../navigation/service';
import { resetAuth } from './slices/auth-slice';
import { clearSession } from './slices/constant-slice';
import { resetDashboard } from './slices/dashboard-slice';
import { resetDetail } from './slices/detail-slice';
import { resetList } from './slices/list-slice';
import { resetPayments } from './slices/payments-slice';
import { resetCalendar } from './slices/calendar-slice';
import { resetAlerts } from './slices/alerts-slice';
import { resetInbox } from './slices/inbox-slice';
import { resetProfile } from './slices/profile-slice';

export function endSession(): ThunkAction<void, RootState, undefined, UnknownAction> {
  return dispatch => {
    clearWidgetSnapshot();
    clearSessionToken();
    dispatch(clearSession());
    dispatch(resetProfile());
    dispatch(resetDashboard());
    dispatch(resetDetail());
    dispatch(resetList());
    dispatch(resetPayments());
    dispatch(resetCalendar());
    dispatch(resetAlerts());
    dispatch(resetInbox());
    dispatch(resetAuth());
    // Signed out (logout, deletion or an expired token): back to Login.
    resetRoot([{ name: 'AuthStack' }]);
  };
}
