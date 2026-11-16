import { ApiError, post, upload } from '../src/api_services/http-provider';

const mockRequest = jest.fn();
jest.mock('../src/config/api', () => ({ API_BASE_URL: '' }));
jest.mock('axios', () => ({
  create: () => ({ interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } }, request: (config: unknown) => mockRequest(config) }),
  isAxiosError: () => false,
}));

const sentKey = (call: number) => mockRequest.mock.calls[call][0].headers['Idempotency-Key'];

beforeEach(() => mockRequest.mockReset());

test('a Retry after a dropped connection resends the same key, and the next save gets a new one', async () => {
  mockRequest.mockRejectedValueOnce(new ApiError(0, 'NETWORK', 'offline')).mockResolvedValue({ data: {} });
  await expect(post('/subscriptions', { name: 'Netflix' }, true)).rejects.toMatchObject({ code: 'NETWORK' });
  await post('/subscriptions', { name: 'Netflix' }, true);
  expect(sentKey(1)).toBe(sentKey(0));

  await post('/subscriptions', { name: 'Netflix' }, true);
  expect(sentKey(2)).not.toBe(sentKey(0));
});

test('a changed request or a rejected one does not reuse the key', async () => {
  mockRequest.mockRejectedValueOnce(new ApiError(400, 'VALIDATION', 'bad')).mockResolvedValue({ data: {} });
  await expect(post('/subscriptions', { name: 'Hulu' }, true)).rejects.toMatchObject({ code: 'VALIDATION' });
  await post('/subscriptions', { name: 'Hulu' }, true);
  await post('/subscriptions', { name: 'Hulu+' }, true);
  expect(new Set([sentKey(0), sentKey(1), sentKey(2)]).size).toBe(3);
});

test('an upload sends the file bytes as they are, not as JSON', async () => {
  mockRequest.mockResolvedValue({ data: {} });
  const file = { size: 3 } as unknown as Blob;
  await upload('/uploads', file);
  const config = mockRequest.mock.calls[0][0];
  expect(config.transformRequest.map((transform: (data: unknown) => unknown) => transform(file))).toEqual([file]);
});

test('a 409 REQUEST_IN_PROGRESS keeps the key, so the Retry cannot save a duplicate', async () => {
  mockRequest.mockRejectedValueOnce(new ApiError(409, 'REQUEST_IN_PROGRESS', 'busy')).mockResolvedValue({ data: {} });
  await expect(post('/subscriptions', { name: 'Max' }, true)).rejects.toMatchObject({ code: 'REQUEST_IN_PROGRESS' });
  await post('/subscriptions', { name: 'Max' }, true);
  expect(sentKey(1)).toBe(sentKey(0));
});
