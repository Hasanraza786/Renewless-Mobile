import type { UnknownAction } from '@reduxjs/toolkit';
import type { ThunkAction } from '@reduxjs/toolkit';
import type { RootState } from '../types';
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
  };
}
