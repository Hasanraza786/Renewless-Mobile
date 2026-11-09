import { MOCK_DATA } from '../config/mock-data';
import type { AiDraft, AiInput, AiReply, AiUsage } from '../types';
import { EMPTY_DRAFT, applyMessage, findService } from '../utils/ai-draft';
import { localToday } from '../utils/dates';
import { addDays } from '../utils/scan';

// One turn of the Loop conversation: the server reads the message (text, voice or one image/PDF) against the
// current draft and returns Loop's reply with the updated draft. Media is discarded after extraction.
// AI chat is not integrated with the backend yet; it runs on this mock in every build.
// shortcut: the mock parses text deterministically, hears a fixed transcript and reads a fixed receipt; the backend does real extraction.
const MOCK_LIMIT = 50;
let mock_used = MOCK_DATA.ai_usage_used;

// The limit resets on the 1st of next month in the user's timezone.
function nextMonthStart(today: string) {
  const [year, month] = today.split('-').map(Number);
  return month === 12 ? `${year + 1}-01-01` : `${year}-${String(month + 1).padStart(2, '0')}-01`;
}

const mockUsage = (): AiUsage => ({ used: mock_used, limit: MOCK_LIMIT, remaining: Math.max(0, MOCK_LIMIT - mock_used), resetsOn: nextMonthStart(localToday()) });

export function resetMockAi() {
  mock_used = MOCK_DATA.ai_usage_used;
}

// Free messages left this month, shown under the chat header before the first send.
export async function getAiUsage(_token: string): Promise<AiUsage> {
  return mockUsage();
}

export async function sendAiMessage(_token: string, input: AiInput, draft: AiDraft | null): Promise<AiReply> {
  await new Promise<void>(resolve => setTimeout(resolve, MOCK_DATA.ai_reply_ms));
  if (mock_used >= MOCK_LIMIT) throw Object.assign(new Error('No free messages left this month.'), { status: 429, code: 'AI_MONTHLY_LIMIT' });
  // Counted once, when the message is answered; a failed send and its Retry are not counted twice.
  mock_used += 1;
  return { ...mockReply(input, draft ?? EMPTY_DRAFT), usage: mockUsage() };
}

function mockReply(input: AiInput, base: AiDraft) {
  if (input.kind === 'text') return applyMessage(base, input.text);
  if (input.kind === 'voice') return applyMessage(base, MOCK_DATA.ai_voice_transcript);
  const receipt = MOCK_DATA.ai_receipt;
  const service = findService(receipt.name);
  return {
    reply: 'I found the subscription details. Check any matching plan below before adding another.',
    draft: { ...EMPTY_DRAFT, name: receipt.name, platform_id: service?.platform_id ?? null, category: service?.category ?? null, price: receipt.price, currency: receipt.currency, cycle: receipt.cycle as AiDraft['cycle'], next_date: addDays(localToday(), receipt.renews_in_days) },
  };
}
