import type { GmailScanStatus, GmailSelection, ProfileInbox } from '../types';

// Gmail scan and review are not integrated yet (they need Google sign-in). With no connected inbox,
// the scan screen shows its unavailable notice; the review never starts.
const UNAVAILABLE = 'Gmail connection is unavailable right now. Your saved subscriptions are unchanged.';

export async function listGmailInboxes(_token: string): Promise<ProfileInbox[]> {
  return [];
}

export async function startGmailScan(_token: string, _inbox_id: string): Promise<{ job_id: string }> {
  throw new Error(UNAVAILABLE);
}

export async function getGmailScan(_token: string, _job_id: string): Promise<GmailScanStatus> {
  return { status: 'failed', stage: 0, candidates: [], error: UNAVAILABLE };
}

export async function saveGmailResults(_token: string, _job_id: string, _selections: GmailSelection[]): Promise<{ saved: string[] }> {
  throw new Error(UNAVAILABLE);
}
