import * as aiService from '../../api_services/ai-chat';
import type { AiDraft, AiInput, AiReply, AiUsage } from '../../types';
import { trackEvent } from '../../utils/analytics';
import { errorMessage } from '../../utils/errors';
import type { AppThunk } from '../runRequest';

// One chat turn. The conversation and draft live in the chat screen; a failure keeps the message for Retry.
export function sendAiMessage(input: AiInput, draft: AiDraft | null): AppThunk<AiReply | { error: string }> {
  return async (_dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return { error: 'Sign in again to continue.' };
    try {
      const reply = await aiService.sendAiMessage(token, input, draft);
      trackEvent('ai_message_sent', { type: input.kind === 'file' ? input.file_kind : input.kind });
      return reply;
    } catch (caught) {
      return { error: errorMessage(caught) };
    }
  };
}

// Free messages left this month; null when it cannot be read (the composer stays usable and the server enforces the limit).
export function getAiUsage(): AppThunk<AiUsage | null> {
  return async (_dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return null;
    try {
      return await aiService.getAiUsage(token);
    } catch {
      return null;
    }
  };
}
