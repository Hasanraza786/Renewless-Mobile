import { getGoogleAccount, getScanStatus, importCandidates, signInWithProvider, startScan } from '../../api_services/onboarding';
import type { AccountProvider } from '../../types';
import { errorMessage } from '../../utils/errors';
import { runRequest, type AppThunk } from '../runRequest';
import { setSession } from '../slices/constant-slice';
import {
  setGoogleEmail,
  setGoogleError,
  setGoogleLoading,
  setSaved,
  setSaveError,
  setSaveLoading,
  setScanFailed,
  setScanJob,
  setScanStatus,
} from '../slices/onboarding-slice';
import { setProfileUser } from '../slices/profile-slice';

export function loadGoogleAccount() {
  return runRequest({
    request: getGoogleAccount,
    loading: setGoogleLoading,
    error: setGoogleError,
    success: account => setGoogleEmail(account.email),
    endOnUnauthorized: false,
  });
}

export function startOnboardingScan(): AppThunk {
  return async dispatch => {
    try {
      const { job_id } = await startScan();
      dispatch(setScanJob(job_id));
    } catch (caught) {
      dispatch(setScanFailed(errorMessage(caught)));
    }
  };
}

export function pollOnboardingScan(): AppThunk {
  return async (dispatch, getState) => {
    const job_id = getState().onboarding.scan_job_id;
    if (!job_id) return;
    try {
      dispatch(setScanStatus(await getScanStatus(job_id)));
    } catch (caught) {
      dispatch(setScanFailed(errorMessage(caught)));
    }
  };
}

// Signs in, then imports only the selected candidates; Ready is shown only after the import succeeds.
export function saveOnboardingFinds(provider: AccountProvider): AppThunk<boolean> {
  return async (dispatch, getState) => {
    const { scan_job_id, selected_ids } = getState().onboarding;
    const saved = await dispatch(
      runRequest({
        request: async () => {
          const session = await signInWithProvider(provider);
          return { session, saved: await importCandidates(scan_job_id, selected_ids) };
        },
        loading: setSaveLoading,
        error: setSaveError,
        success: result => [setSession(result.session), setProfileUser(result.session.user), setSaved(result.saved)],
        endOnUnauthorized: false,
      }),
    );
    return !!saved;
  };
}
