jest.mock('../src/config/api', () => ({ API_BASE_URL: '', USE_MOCK_API: true }));

import {
  cancelTracking,
  getSubscriptionDetail,
  listPlatformSubscriptions,
  removeTracking,
  restoreTracking,
  resumeTracking,
} from '../src/api_services/subscriptions';
import { resetMockSubscriptions } from '../src/api_services/subscription-store';
import { localToday } from '../src/utils/dates';

beforeEach(() => resetMockSubscriptions());

test('detail derives receipts, annual estimate and related plans', async () => {
  const detail = await getSubscriptionDetail('t', 'sub-netflix-standard');
  expect(detail.record.plan).toBe('Standard');
  expect(detail.receipts.count).toBe(2);
  expect(detail.receipts.totals).toEqual([{ currency: 'USD', amount: '31.98' }]);
  expect(detail.annual_estimate).toBe('191.88');
  // Family and the cancelled Basic plan share the platform.
  expect(detail.related_count).toBe(2);
  expect((await listPlatformSubscriptions('t', 'netflix', 'sub-netflix-standard')).map(item => item.id)).toEqual(['sub-netflix-family', 'sub-netflix-basic']);
});

test('cancel records tracking only, and Track again resumes the same ID', async () => {
  const today = localToday();
  const cancelled = await cancelTracking('t', 'sub-duolingo', { cancelled_on: today, access_until: null });
  expect(cancelled.record).toMatchObject({ id: 'sub-duolingo', status: 'cancelled', cancelled_on: today, access_until: null, reminder: { mode: 'off' } });

  const resumed = await resumeTracking('t', 'sub-duolingo', { price: '10.99', next_date: today, reminder: { mode: 'off' } });
  expect(resumed.record).toMatchObject({ id: 'sub-duolingo', status: 'active', cancelled_on: null, price: '10.99', next_date: today });
});

test('remove is undoable by stable ID', async () => {
  await removeTracking('t', 'sub-figma');
  await expect(getSubscriptionDetail('t', 'sub-figma')).rejects.toThrow('no longer available');
  await restoreTracking('t', 'sub-figma');
  expect((await getSubscriptionDetail('t', 'sub-figma')).record.id).toBe('sub-figma');
  await expect(restoreTracking('t', 'sub-figma')).rejects.toThrow('can no longer be restored');
});
