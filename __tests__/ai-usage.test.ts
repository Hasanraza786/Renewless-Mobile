import { MOCK_DATA } from '../src/config/mock-data';
import { getAiUsage, resetMockAi, sendAiMessage } from '../src/api_services/ai-chat';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '', USE_MOCK_API: true }));

const mock = MOCK_DATA as { ai_reply_ms: number; ai_usage_used: number };
const saved = { ai_reply_ms: mock.ai_reply_ms, ai_usage_used: mock.ai_usage_used };
afterEach(() => {
  Object.assign(mock, saved);
  resetMockAi();
});

test('each answered message counts once and the reply carries the new usage', async () => {
  mock.ai_reply_ms = 0;
  resetMockAi();
  const before = await getAiUsage('t');
  expect(before).toMatchObject({ used: 12, limit: 50, remaining: 38 });
  expect(before.resetsOn).toMatch(/^\d{4}-\d{2}-01$/);
  const reply = await sendAiMessage('t', { kind: 'text', text: 'Netflix USD 15.99 monthly' }, null);
  expect(reply.usage).toMatchObject({ used: 13, remaining: 37 });
});

test('at the monthly limit a send fails with 429 AI_MONTHLY_LIMIT and nothing is counted', async () => {
  mock.ai_reply_ms = 0;
  mock.ai_usage_used = 50;
  resetMockAi();
  await expect(sendAiMessage('t', { kind: 'text', text: 'Spotify' }, null)).rejects.toMatchObject({ status: 429, code: 'AI_MONTHLY_LIMIT' });
  expect(await getAiUsage('t')).toMatchObject({ used: 50, remaining: 0 });
});
