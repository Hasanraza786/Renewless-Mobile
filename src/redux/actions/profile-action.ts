import { updateProfile as updateProfileRequest } from '../../api_services/auth';
import type { Gender } from '../../types';
import { runRequest, type AppThunk } from '../runRequest';
import { setProfileError, setProfileLoading, setProfileUser } from '../slices/profile-slice';
import { setSession } from '../slices/session-slice';

export function updateProfile(
  input: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth?: string;
    gender?: Gender | null;
  },
  onDone?: () => void,
): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().session.token;
    if (!token) return;
    await dispatch(
      runRequest({
        request: () => updateProfileRequest(token, input),
        loading: setProfileLoading,
        error: setProfileError,
        success: result => [setSession(result), setProfileUser(result.user)],
        onDone,
      }),
    );
  };
}
