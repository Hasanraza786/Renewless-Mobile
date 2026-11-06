import { sendAiMessage } from '../../api_services/ai-chat';
import type { AiDraft, AiInput, AiReply } from '../../types';
import { errorMessage } from '../../utils/errors';
import type { AppThunk } from '../runRequest';

// One chat turn. The conversation and draft live in the chat screen; a failure keeps the message for Retry.
export function sendAiTurn(input: AiInput, draft: AiDraft | null): AppThunk<AiReply | { error: string }> {
  return async (_dispatch, getState) => {
    const token = getState().constant.token;
    if (!token) return { error: 'Sign in again to continue.' };
    try {
      return await sendAiMessage(token, input, draft);
    } catch (caught) {
      return { error: errorMessage(caught) };
    }
  };
}
