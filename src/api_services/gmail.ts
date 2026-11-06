import { USE_MOCK_API } from '../config/api';
import { MOCK_DATA } from '../config/mock-data';
import type { GmailCandidate, GmailScanStatus, GmailSelection, ProfileInbox } from '../types';
import { localToday } from '../utils/dates';
import { addDays } from '../utils/scan';
import { request } from './http';
import { mockInboxes } from './inbox';
import { addRecord, allRecords, updateRecord } from './subscription-store';

const mockDelay = (ms = 350) => new Promise<void>(resolve => setTimeout(resolve, ms));

// Development scan jobs; candidate IDs saved from a job stay non-selectable when the review is reopened.
const jobs = new Map<string, { started: number; inbox_id: string }>();
const saved_ids = new Set<string>();

export function resetMockGmail() {
  jobs.clear();
  saved_ids.clear();
}

export async function listGmailInboxes(token: string): Promise<ProfileInbox[]> {
  if (!USE_MOCK_API) return request<ProfileInbox[]>('/connectors', { token });
  await mockDelay();
  return mockInboxes();
}

// Starts (or resumes) the inbox's scan job.
export async function startGmailScan(token: string, inbox_id: string): Promise<{ job_id: string }> {
  if (!USE_MOCK_API) return request<{ job_id: string }>(`/connectors/${inbox_id}/scans`, { method: 'POST', token });
  await mockDelay(200);
  const job_id = `gmail-job-${Date.now()}`;
  jobs.set(job_id, { started: Date.now(), inbox_id });
  return { job_id };
}

function mockCandidates(): GmailCandidate[] {
  const today = localToday();
  const records = allRecords();
  const netflix = records.find(item => item.id === 'sub-netflix-standard');
  const spotify = records.find(item => item.id === 'sub-spotify');
  const base = { category: 'Productivity', cycle: 'Monthly' as const, currency: 'USD', target_id: null, old: null };
  const list: GmailCandidate[] = [
    { ...base, id: 'new-notion-team', kind: 'new', name: 'Notion', platform_id: 'notion', plan: 'Team plan', price: '12.00', start_date: addDays(today, -12), next_date: addDays(today, 19), trial: null, saved: false },
    { ...base, id: 'new-figma-trial', kind: 'new', name: 'Figma', platform_id: 'figma', plan: 'Professional trial', price: '15.00', start_date: addDays(today, -13), next_date: null, trial: { days: 14, end_date: addDays(today, 1), auto_renew: true }, saved: false },
  ];
  if (netflix) list.push({ ...base, category: netflix.category, id: 'update-netflix', kind: 'update', name: 'Netflix', platform_id: 'netflix', plan: netflix.plan, price: '17.99', start_date: null, next_date: netflix.next_date ? addDays(netflix.next_date, 30) : null, trial: null, target_id: netflix.id, old: { price: netflix.price, next_date: netflix.next_date }, saved: false });
  if (spotify) list.push({ ...base, category: spotify.category, id: 'tracked-spotify', kind: 'duplicate', name: 'Spotify', platform_id: 'spotify', plan: null, price: spotify.price, start_date: null, next_date: null, trial: null, target_id: spotify.id, old: null, saved: false });
  return list.map(item => ({ ...item, saved: saved_ids.has(item.id) }));
}

// Job-driven progress: three stages, then results. Production reports real job state, never a timer.
export async function getGmailScan(token: string, job_id: string): Promise<GmailScanStatus> {
  if (!USE_MOCK_API) return request<GmailScanStatus>(`/scans/${job_id}`, { token });
  await mockDelay(100);
  const job = jobs.get(job_id);
  if (!job) throw new Error('This scan is no longer available.');
  const stage = Math.min(3, Math.floor((Date.now() - job.started) / MOCK_DATA.gmail_stage_ms));
  if (MOCK_DATA.gmail_scan_scenario === 'interrupted' && stage >= 2) return { status: 'failed', stage: 1, candidates: [], error: 'We couldn’t finish checking this inbox.' };
  if (stage < 3) return { status: 'running', stage, candidates: [], error: '' };
  return { status: 'completed', stage: 3, candidates: MOCK_DATA.gmail_scan_scenario === 'nothing' ? [] : mockCandidates(), error: '' };
}

// Saves only the selected candidates; new plans become Gmail-sourced records, updates change the tracked price
// (and the renewal date only when the user chose to replace it). A saved candidate is never saved twice.
export async function saveGmailResults(token: string, job_id: string, selections: GmailSelection[]): Promise<{ saved: string[] }> {
  if (!USE_MOCK_API) return request<{ saved: string[] }>(`/scans/${job_id}/save`, { method: 'POST', token, body: { selections } });
  await mockDelay(500);
  const candidates = new Map(mockCandidates().map(item => [item.id, item]));
  const inbox = MOCK_DATA.home_inbox;
  const saved: string[] = [];
  for (const selection of selections) {
    const candidate = candidates.get(selection.id);
    if (!candidate || candidate.kind === 'duplicate' || saved_ids.has(candidate.id)) continue;
    if (candidate.kind === 'new') {
      addRecord({
        id: `sub-gmail-${candidate.id}`,
        platform_id: candidate.platform_id,
        name: candidate.name,
        plan: candidate.plan,
        category: candidate.category,
        price: Number(selection.price).toFixed(2),
        currency: candidate.currency,
        cycle: candidate.cycle,
        next_date: selection.trial ? null : selection.next_date,
        estimated: false,
        auto_renew: selection.trial ? selection.trial.auto_renew : true,
        trial: selection.trial && selection.start_date ? { start_date: selection.start_date, end_date: selection.trial.end_date, auto_renew: selection.trial.auto_renew } : null,
        status: 'active',
        cancelled_on: null,
        access_until: null,
        start_date: selection.start_date,
        source: { kind: 'gmail', email: inbox.email },
        inbox: { email: inbox.email, last_sync: new Date().toISOString() },
        reminder: { mode: 'default' },
        notes: null,
        manage_url: MOCK_DATA.manage_urls[candidate.platform_id] ?? null,
        price_history: [],
      });
    } else if (candidate.target_id) {
      updateRecord(candidate.target_id, record => ({
        ...record,
        price: candidate.price,
        next_date: selection.replace_date && candidate.next_date ? candidate.next_date : record.next_date,
        estimated: selection.replace_date ? false : record.estimated,
        price_history: [
          { id: `ph-${candidate.id}`, reason: 'price_changed', from_amount: record.price, from_cycle: record.cycle, to_amount: candidate.price, to_cycle: record.cycle, currency: record.currency, effective_on: localToday(), source: 'gmail' },
          ...record.price_history,
        ],
      }));
    }
    saved_ids.add(candidate.id);
    saved.push(candidate.id);
  }
  return { saved };
}
