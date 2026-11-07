import { MOCK_DATA } from '../src/config/mock-data';
import { allPayments, allReceipts } from '../src/api_services/subscription-store';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '', USE_MOCK_API: true }));

test("the 'none' payments scenario has no receipts on Home or Detail either", () => {
  expect(allReceipts().length).toBeGreaterThan(0);
  const mock = MOCK_DATA as { payments_scenario: 'receipts' | 'none' };
  const scenario = mock.payments_scenario;
  mock.payments_scenario = 'none';
  try {
    expect(allReceipts()).toEqual([]);
    expect(allPayments()).toEqual([]);
  } finally {
    mock.payments_scenario = scenario;
  }
});
