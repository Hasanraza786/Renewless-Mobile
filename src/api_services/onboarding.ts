import { USE_MOCK_API } from '../config/api';
import { MOCK_DATA } from '../config/mock-data';
import type { AccountProvider, AuthResponse, ScanCandidate, ScanStatus } from '../types';
import { localToday } from '../utils/dates';
import { addDays } from '../utils/scan';

export type GoogleAccount = { email: string };

// shortcut: only the development mock adapter exists; the real Gmail scan/import API and native
// Google/Apple sign-in replace these once the backend contract is agreed.
function requireMock(feature: string) {
  if (!USE_MOCK_API) throw new Error(`${feature} is not available yet.`);
}

// Isolated in-memory repository; resetMockOnboarding restores it.
const jobs = new Map<string, { started_at: number; imported: ScanCandidate[] | null }>();
let job_sequence = 0;

export function resetMockOnboarding() {
  jobs.clear();
  job_sequence = 0;
}

function fixtureCandidates(): ScanCandidate[] {
  const today = localToday();
  return MOCK_DATA.scan_candidates.map(({ next_in_days, ...item }) => {
    const next_date = addDays(today, next_in_days);
    return { ...item, next_date, trial: 'trial' in item ? { ends_on: next_date, auto_renew: item.trial.auto_renew } : undefined };
  });
}

export async function getGoogleAccount(): Promise<GoogleAccount> {
  requireMock('Google sign-in');
  return { ...MOCK_DATA.google_account };
}

export async function startScan(): Promise<{ job_id: string }> {
  requireMock('Gmail scan');
  const job_id = `scan-${++job_sequence}`;
  jobs.set(job_id, { started_at: Date.now(), imported: null });
  return { job_id };
}

// The mock "backend" advances stages with elapsed time; the client only reports what it returns.
export async function getScanStatus(job_id: string): Promise<ScanStatus> {
  requireMock('Gmail scan');
  const job = jobs.get(job_id);
  if (!job) throw new Error('This scan is no longer available.');
  const completed_stages = Math.min(3, Math.floor((Date.now() - job.started_at) / MOCK_DATA.scan_stage_ms));
  if (MOCK_DATA.scan_scenario === 'interrupted' && completed_stages >= 2) {
    return { job_id, completed_stages, status: 'failed', candidates: [] };
  }
  if (completed_stages < 3) return { job_id, completed_stages, status: 'running', candidates: [] };
  return { job_id, completed_stages, status: 'completed', candidates: MOCK_DATA.scan_scenario === 'found' ? fixtureCandidates() : [] };
}

export async function signInWithProvider(_provider: AccountProvider): Promise<AuthResponse> {
  requireMock('Account sign-in');
  return { token: MOCK_DATA.account.token, user: { ...MOCK_DATA.account.user } };
}

// Idempotent per scan job: repeating the save returns the first import instead of duplicating it.
export async function importCandidates(job_id: string, candidate_ids: string[]): Promise<ScanCandidate[]> {
  requireMock('Import');
  const job = jobs.get(job_id);
  if (!job) throw new Error('This scan is no longer available.');
  if (!job.imported) {
    const ids = new Set(candidate_ids);
    job.imported = fixtureCandidates().filter(item => ids.has(item.id));
  }
  return job.imported;
}
