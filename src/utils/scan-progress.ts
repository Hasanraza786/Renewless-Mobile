import type { ScanMeter } from '../types';

// One line under each numbered scan stage, the bar under the running one, and the calm status line (Scan progress,
// locked 23 Nov 2026). stage = completed stages: 0 reading the inbox, 1 the model checking billing emails, 2 building
// subscriptions, 3 done. The server counts two steps per mail (read, checked); total 0 = the inbox is still listed.
export type StageProgress = { lines: [string, string, string]; bar: { index: number; fraction: number } | null; status: string };

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function scanProgress(meter: Pick<ScanMeter, 'progress' | 'live'> | null, stage: number, complete: boolean): StageProgress {
  const total = meter?.progress.total ?? 0;
  const { read, checked, candidates } = meter?.live ?? { read: 0, checked: 0, candidates: 0 };
  // While reading, total is two steps per mail to read; afterwards it is mails read plus mails left for the model.
  const reading = total ? clamp(read / (total / 2)) : 0;
  const to_check = Math.max(0, total - read);
  const checking = to_check ? clamp(checked / to_check) : 0;
  const lines: StageProgress['lines'] = [
    stage === 0 ? `Reading your inbox · ${Math.floor(reading * 100)}%` : 'Inbox read',
    stage < 1 ? '' : stage === 1 ? `Checked ${checked} of ${to_check} billing emails` : `Checked ${checked} billing emails`,
    stage < 2 ? '' : `${candidates} ${candidates === 1 ? 'subscription' : 'subscriptions'} so far`,
  ];
  const bar = complete || stage > 1 ? null : { index: stage, fraction: stage === 0 ? reading : checking };
  // The whole scan: reading is the first 40%, checking the next 50%, building the rest. Never a countdown.
  const overall = stage === 0 ? reading * 0.4 : stage === 1 ? 0.4 + checking * 0.5 : 0.9;
  const status = complete ? 'Your results are ready.' : overall >= 0.85 ? 'Almost done.' : overall >= 0.5 ? 'About halfway there.' : 'This usually takes a few minutes.';
  return { lines, bar, status };
}

// "Older mail · n%" on Discovering · first results: the deep read's share, 0 while it still lists the year.
export const deepPercent = (deep: ScanMeter['deep']) => (deep && deep.progress.total ? Math.floor(clamp(deep.progress.done / deep.progress.total) * 100) : 0);

// The background (deep) read as Home and first results show it: its percent and the live line
// "Checked 324 of 800 emails · 2 more found" (no line while the year is still listed).
export type DeepView = { status: 'running' | 'completed' | 'failed'; percent: number; checked: number; total: number; found: number };

export function deepView(status: DeepView['status'], progress: { total: number; done: number }, live: { candidates: number } | undefined): DeepView {
  return {
    status,
    percent: progress.total ? Math.floor(clamp(progress.done / progress.total) * 100) : 0,
    // Two steps per email (read, checked), so emails done is half the steps.
    checked: Math.floor(progress.done / 2),
    total: Math.floor(progress.total / 2),
    found: live?.candidates ?? 0,
  };
}

export const deepLine = (checked: number, total: number, found: number) =>
  total ? `Checked ${checked} of ${total} emails${found ? ` · ${found} more found` : ''}` : '';
