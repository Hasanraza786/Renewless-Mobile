import { USE_MOCK_API } from '../config/api';
import { MOCK_DATA } from '../config/mock-data';
import type { AiDraft, AiInput, AiReply } from '../types';
import { EMPTY_DRAFT, applyMessage, findService } from '../utils/ai-draft';
import { localToday } from '../utils/dates';
import { addDays } from '../utils/scan';
import { request } from './http';

// One turn of the Loop conversation: the server reads the message (text, voice or one image/PDF) against the
// current draft and returns Loop's reply with the updated draft. Media is discarded after extraction.
// shortcut: the mock parses text deterministically, hears a fixed transcript and reads a fixed receipt; the backend does real extraction.
export async function sendAiMessage(token: string, input: AiInput, draft: AiDraft | null): Promise<AiReply> {
  if (!USE_MOCK_API) return request<AiReply>('/ai/messages', { method: 'POST', token, body: { input, draft } });
  await new Promise<void>(resolve => setTimeout(resolve, MOCK_DATA.ai_reply_ms));
  const base = draft ?? EMPTY_DRAFT;
  if (input.kind === 'text') return applyMessage(base, input.text);
  if (input.kind === 'voice') return applyMessage(base, MOCK_DATA.ai_voice_transcript);
  const receipt = MOCK_DATA.ai_receipt;
  const service = findService(receipt.name);
  return {
    reply: 'I found the subscription details. Check any matching plan below before adding another.',
    draft: { ...EMPTY_DRAFT, name: receipt.name, platform_id: service?.platform_id ?? null, category: service?.category ?? null, price: receipt.price, currency: receipt.currency, cycle: receipt.cycle as AiDraft['cycle'], next_date: addDays(localToday(), receipt.renews_in_days) },
  };
}
