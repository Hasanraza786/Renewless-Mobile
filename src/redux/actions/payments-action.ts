import { listPayments } from '../../api_services/payments';
import { runRequest, type AppThunk } from '../runRequest';
import { setPayments, setPaymentsError, setPaymentsLoading } from '../slices/payments-slice';

// scope is 'account' or an owned subscription ID; each scope is cached separately.
export function loadPayments(scope: string): AppThunk {
  return async (dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return;
    await dispatch(
      runRequest({
        request: () => listPayments(token, scope === 'account' ? undefined : scope),
        loading: setPaymentsLoading,
        error: setPaymentsError,
        success: result => setPayments({ scope, ...result }),
      }),
    );
  };
}
