import { MOCK_DATA } from '../config/mock-data';
import type { GoogleConnection, ScanCandidate, ScanStatus } from '../types';
import { localToday } from '../utils/dates';
import { addDays } from '../utils/scan';

// Google sign-in + Gmail consent and the scan/import API are not integrated yet; Splash skips Onboarding.
// shortcut: these fail as unavailable until the Google/Gmail integration replaces them.
function requireMock(feature: string) {
  throw new Error(`${feature} is not available yet.`);
}

// Isolated in-memory repository; resetMockOnboarding restores it.
const jobs = new Map<string, { started_at: number; fails: boolean; imported: Map<string, ScanCandidate> }>();
let job_sequence = 0;

export function resetMockOnboarding() {
  jobs.clear();
  job_sequence = 0;
}

function fixtureCandidates(): ScanCandidate[] {
  const today = localToday();
  return MOCK_DATA.scan_candidates.map(({ next_in_days, ...item }) => ({ ...item, next_date: addDays(today, next_in_days) }));
}

export async function connectGoogle(): Promise<GoogleConnection> {
  requireMock('Google sign-in');
  return { status: 'cancelled' };
}

export async function startScan(): Promise<{ job_id: string }> {
  requireMock('Gmail scan');
  const job_id = `scan-${++job_sequence}`;
  // A network interruption hits only the first scan, so Try again can succeed.
  const fails = MOCK_DATA.scan_scenario === 'access_expired' || (MOCK_DATA.scan_scenario === 'interrupted' && job_sequence === 1);
  jobs.set(job_id, { started_at: Date.now(), fails, imported: new Map() });
  return { job_id };
}

// The mock "backend" advances stages with elapsed time; the client only reports what it returns.
export async function getScanStatus(job_id: string): Promise<ScanStatus> {
  requireMock('Gmail scan');
  const job = jobs.get(job_id);
  if (!job) throw new Error('This scan is no longer available.');
  const completed_stages = Math.min(3, Math.floor((Date.now() - job.started_at) / MOCK_DATA.scan_stage_ms));
  if (job.fails && completed_stages >= 2) {
    return { job_id, completed_stages, status: 'failed', failure: MOCK_DATA.scan_scenario === 'access_expired' ? 'access' : 'network', candidates: [] };
  }
  if (completed_stages < 3) return { job_id, completed_stages, status: 'running', candidates: [] };
  return { job_id, completed_stages, status: 'completed', candidates: MOCK_DATA.scan_scenario === 'no_results' ? [] : fixtureCandidates() };
}

// Saves the reviewed candidates under the signed-in owner. Idempotent per candidate ID: a repeat keeps
// the first saved record, and earlier saves stay saved. Returns every record saved from this scan.
export async function importCandidates(job_id: string, candidates: ScanCandidate[]): Promise<ScanCandidate[]> {
  requireMock('Import');
  const job = jobs.get(job_id);
  if (!job) throw new Error('This scan is no longer available.');
  for (const item of candidates) if (!job.imported.has(item.id)) job.imported.set(item.id, item);
  return [...job.imported.values()];
}

// Every record saved from any scan, for the mock Home.
export function importedRecords(): ScanCandidate[] {
  return [...jobs.values()].flatMap(job => [...job.imported.values()]);
}
