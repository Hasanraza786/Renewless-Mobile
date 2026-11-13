import { toInbox, toProfile } from '../../api_services/adapters';
import apiServices from '../../api_services/request-handler';
import type { ProfileInput } from '../../types';
import { successHaptic } from '../../utils/haptics';
import { endSession } from '../endSession';
import { requestHandler, type AppThunk } from '../request-handler';
import { setUser } from '../slices/constant-slice';
import { setDeleteStep, setNotice, setOverview, setOverviewError, setOverviewLoading, setProfileError, setProfileLoading, setProfileUser } from '../slices/profile-slice';
import { trackEvent } from '../../utils/analytics';
import { providerSignIn } from '../../utils/social-sign-in';
import type { Profile } from '../../types';

// Connected inboxes and all-time confirmed payment totals per currency.
async function getProfileData() {
  const [{ connectors }, summary] = await Promise.all([apiServices.getConnectors(), apiServices.getPaymentsSummary()]);
  return { inboxes: connectors.map(toInbox), payment_totals: summary.totals };
}

export function getProfileOverview(): AppThunk {
  return async dispatch => {
    await dispatch(requestHandler({ apiService: getProfileData, setLoading: setOverviewLoading, setError: setOverviewError, onDone: overview => dispatch(setOverview(overview)) }));
  };
}

// Saved → back to Profile with a notice; a failure keeps the draft on screen with the error.
export function updateProfile(input: ProfileInput, onSaved: () => void): AppThunk {
  return async (dispatch, getState) => {
    await dispatch(
      requestHandler({
        apiService: apiServices.updateMe,
        param_data: { revision: getState().constant.user?.revision ?? 0, name: input.name, phone: input.phone || null, dateOfBirth: input.dateOfBirth, gender: input.gender },
        setLoading: setProfileLoading,
        onDone: ({ user }) => {
          trackEvent('profile_updated');
          const profile = toProfile(user);
          dispatch(setUser(profile));
          dispatch(setProfileUser(profile));
          successHaptic();
          dispatch(setNotice('Profile updated.'));
          onSaved();
        },
        onError: error => dispatch(setProfileError(Object.values(error.field_errors)[0] ?? error.message)),
      }),
    );
  };
}

// Deletion ends the session locally only after the server confirms it. A Google/Apple account first verifies
// its sign-in in the provider sheet; closing the sheet keeps the dialog open.
// A password account sends the password typed in the dialog.
export function deleteAccount(provider: Profile['provider'], password: string): AppThunk {
  return async dispatch => {
    let verification: { password: string } | { provider: 'google' | 'apple'; idToken: string; nonce?: string } = { password };
    if (provider !== 'email') {
      dispatch(setDeleteStep('verifying'));
      const token = await providerSignIn(provider).catch(() => null);
      dispatch(setDeleteStep(''));
      if (!token) return;
      verification = { provider, idToken: token.idToken, nonce: token.nonce };
    }
    await dispatch(
      requestHandler({
        apiService: apiServices.deleteMe,
        param_data: verification,
        setLoading: busy => setDeleteStep(busy ? 'deleting' : ''),
        setError: setProfileError,
        endOnUnauthorized: false,
        onDone: () => {
          trackEvent('account_deleted');
          dispatch(endSession());
          dispatch(setNotice('Account deleted.'));
        },
      }),
    );
  };
}
