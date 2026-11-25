import { deepLine, deepPercent, deepView, scanProgress } from '../src/utils/scan-progress';

const meter = (total: number, read: number, checked: number, candidates = 0) => ({ progress: { total, done: read + checked }, live: { found: 0, read, checked, candidates } });

test('reading shows a percent and the bar under stage 01', () => {
  const view = scanProgress(meter(200, 40, 0), 0, false);
  expect(view.lines).toEqual(['Reading your inbox · 40%', '', '']);
  expect(view.bar).toEqual({ index: 0, fraction: 0.4 });
  expect(view.status).toBe('This usually takes a few minutes.');
  // Still listing the inbox: 0%, never NaN.
  expect(scanProgress(meter(0, 0, 0), 0, false).lines[0]).toBe('Reading your inbox · 0%');
});

test('checking counts billing emails, then subscriptions so far', () => {
  // 100 read, 60 left for the model, 45 checked.
  const view = scanProgress(meter(160, 100, 45), 1, false);
  expect(view.lines).toEqual(['Inbox read', 'Checked 45 of 60 billing emails', '']);
  expect(view.bar).toEqual({ index: 1, fraction: 0.75 });
  expect(view.status).toBe('About halfway there.');
  expect(scanProgress(meter(160, 100, 60, 1), 2, false)).toMatchObject({ lines: ['Inbox read', 'Checked 60 billing emails', '1 subscription so far'], bar: null, status: 'Almost done.' });
  expect(scanProgress(meter(160, 100, 60, 12), 3, true).status).toBe('Your results are ready.');
});

test('the older-mail percent is 0 until the deep read has a total', () => {
  expect(deepPercent(null)).toBe(0);
  expect(deepPercent({ job_id: 'j', status: 'running', progress: { total: 0, done: 0 } })).toBe(0);
  expect(deepPercent({ job_id: 'j', status: 'running', progress: { total: 200, done: 85 } })).toBe(42);
});

test('the background read shows its percent and a live line of emails checked and plans found', () => {
  expect(deepView('running', { total: 1600, done: 648 }, { candidates: 2 })).toEqual({ status: 'running', percent: 40, checked: 324, total: 800, found: 2 });
  expect(deepLine(324, 800, 2)).toBe('Checked 324 of 800 emails · 2 more found');
  expect(deepLine(10, 800, 0)).toBe('Checked 10 of 800 emails');
  // Still listing the year: no line.
  expect(deepLine(0, 0, 0)).toBe('');
});
