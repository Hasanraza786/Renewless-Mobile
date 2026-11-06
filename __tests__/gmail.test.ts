import { getGmailScan, resetMockGmail, saveGmailResults, startGmailScan } from '../src/api_services/gmail';
import { allRecords, findRecord, resetMockSubscriptions } from '../src/api_services/subscription-store';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '', USE_MOCK_API: true }));
jest.mock('../src/config/mock-data', () => {
  const actual = jest.requireActual('../src/config/mock-data');
  return { MOCK_DATA: { ...actual.MOCK_DATA, gmail_stage_ms: 0 } };
});

const selection = (id: string, replace_date = false) => ({ id, price: '12.00', next_date: '2026-12-01', start_date: '2026-11-01', trial: null, replace_date });

test('a scan saves only selected results, keeps the saved date and never saves twice', async () => {
  resetMockSubscriptions();
  resetMockGmail();
  const { job_id } = await startGmailScan('t', 'inbox-1');
  const scan = await getGmailScan('t', job_id);
  expect(scan.status).toBe('completed');
  expect(scan.candidates.map(item => item.kind)).toEqual(['new', 'new', 'update', 'duplicate']);

  const before = allRecords().length;
  const netflix_date = findRecord('sub-netflix-standard')!.next_date;
  const result = await saveGmailResults('t', job_id, [selection('new-notion-team'), selection('update-netflix'), selection('tracked-spotify')]);
  expect(result.saved).toEqual(['new-notion-team', 'update-netflix']);
  expect(allRecords().length).toBe(before + 1);
  expect(findRecord('sub-netflix-standard')).toMatchObject({ price: '17.99', next_date: netflix_date });

  const again = await saveGmailResults('t', job_id, [selection('new-notion-team')]);
  expect(again.saved).toEqual([]);
  expect((await getGmailScan('t', job_id)).candidates.find(item => item.id === 'new-notion-team')!.saved).toBe(true);
});
