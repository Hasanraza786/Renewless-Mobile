import { getGoogleAccount } from '../../api_services/onboarding';
import { runRequest } from '../runRequest';
import { setGoogleEmail, setGoogleError, setGoogleLoading } from '../slices/onboarding-slice';

export function loadGoogleAccount() {
  return runRequest({
    request: getGoogleAccount,
    loading: setGoogleLoading,
    error: setGoogleError,
    success: account => setGoogleEmail(account.email),
    endOnUnauthorized: false,
  });
}
