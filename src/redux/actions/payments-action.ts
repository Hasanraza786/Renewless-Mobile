import { toPayment } from '../../api_services/adapters';
import type { PaymentDto } from '../../api_services/dto';
import apiServices from '../../api_services/request-handler';
import { localToday } from '../../utils/dates';
import { requestHandler, type AppThunk } from '../request-handler';
import { setPayments, setPaymentsError, setPaymentsLoading } from '../slices/payments-slice';

// The backend pages one year at a time; Payments filters years and months on the phone, so read them all.
async function getAllPayments(subscriptionId?: string) {
  const items: PaymentDto[] = [];
  const readYear = async (year?: number) => {
    let cursor: string | undefined;
    let years: number[] = [];
    do {
      const page = await apiServices.getPayments({ year, subscriptionId, cursor, limit: 100 });
      items.push(...page.items);
      years = page.years;
      cursor = page.nextCursor ?? undefined;
    } while (cursor);
    return years;
  };
  const current = Number(localToday().slice(0, 4));
  const years = await readYear(current);
  for (const year of years.filter(item => item !== current)) await readYear(year);
  return items.map(toPayment);
}

// scope is 'account' or an owned subscription ID; each scope is cached separately.
export function getPayments(scope: string): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: getAllPayments,
        param_data: scope === 'account' ? undefined : scope,
        setLoading: setPaymentsLoading,
        setError: setPaymentsError,
        onDone: payments => dispatch(setPayments({ scope, payments, today: localToday() })),
      }),
    );
  };
}
