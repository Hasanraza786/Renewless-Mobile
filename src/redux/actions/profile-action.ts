import { deleteAccount as deleteAccountRequest, updateProfile as updateProfileRequest, type ProfileInput } from '../../api_services/auth';
import { getProfileOverview } from '../../api_services/profile';
import { resetMockInbox } from '../../api_services/inbox';
import { resetMockSubscriptions } from '../../api_services/subscription-store';
import { USE_MOCK_API } from '../../config/api';
import { endSession } from '../endSession';
import { runRequest, type AppThunk } from '../runRequest';
import { setSession } from '../slices/constant-slice';
import { setNotice, setOverview, setOverviewError, setOverviewLoading, setProfileError, setProfileLoading, setProfileUser } from '../slices/profile-slice';
import { successHaptic } from '../../utils/haptics';

export function loadProfileOverview(): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return;
    await dispatch(
      runRequest({
        request: () => getProfileOverview(token),
        loading: setOverviewLoading,
        error: setOverviewError,
        success: setOverview,
      }),
    );
  };
}

// Resolves true when saved; a failure keeps the draft on screen with the error.
export function updateProfile(input: ProfileInput): AppThunk<boolean> {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return false;
    const result = await dispatch(
      runRequest({
        request: () => updateProfileRequest(token, input),
        loading: setProfileLoading,
        error: setProfileError,
        success: response => [setSession(response), setProfileUser(response.user)],
      }),
    );
    if (!result) return false;
    successHaptic();
    dispatch(setNotice('Profile updated.'));
    return true;
  };
}

// Deletion ends the session locally only after the server confirms it.
export function deleteAccount(): AppThunk<boolean> {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return false;
    const result = await dispatch(
      runRequest({ request: () => deleteAccountRequest(token), loading: setProfileLoading, error: setProfileError, endOnUnauthorized: false }),
    );
    if (!result) return false;
    if (USE_MOCK_API) {
      resetMockSubscriptions();
      resetMockInbox();
    }
    dispatch(endSession());
    dispatch(setNotice('Account deleted.'));
    return true;
  };
}
