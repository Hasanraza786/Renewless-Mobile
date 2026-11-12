import { toAiReply } from '../../api_services/adapters';
import apiServices from '../../api_services/request-handler';
import type { AiInput, AiReply, AiUsage, ChatDraft } from '../../types';
import { trackEvent } from '../../utils/analytics';
import { successHaptic } from '../../utils/haptics';
import { requestHandler, type AppThunk } from '../request-handler';
import { setNotice } from '../slices/profile-slice';
import { getSubscriptions } from './list-action';
import { getDashboard } from './dashboard-action';

// A new conversation for this visit; its usage is shown under the header before the first send.
export function startAiChat(onStarted: (conversation_id: string, usage: AiUsage) => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.startConversation,
        onDone: ({ id, usage }) => onStarted(id, usage),
        onError: () => dispatch(setNotice('Couldn’t reach Loop. Check your connection and try again.')),
      }),
    );
  };
}

// Voice clips and files go up as raw bytes first; the server reads, answers and then deletes them.
async function sendTurn({ conversation_id, message_id, input }: { conversation_id: string; message_id: string; input: AiInput }) {
  let upload_id: string | null = null;
  if (input.kind !== 'text') {
    // Android recorders return a bare path; fetch needs a file URI.
    const uri = input.uri.includes('://') ? input.uri : `file://${input.uri}`;
    const file = await (await fetch(uri)).blob();
    upload_id = (await apiServices.uploadFile(file)).uploadId;
  }
  const text = input.kind === 'text' ? input.text : null;
  return apiServices.sendChatMessage({ id: conversation_id, clientMessageId: message_id, text, uploadId: upload_id });
}

// One chat turn. A failure keeps the message for Retry, which reuses its ID so it is answered once.
export function sendAiMessage(conversation_id: string, message_id: string, input: AiInput, onReply: (reply: AiReply) => void, onFailed: (code: string) => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: sendTurn,
        param_data: { conversation_id, message_id, input },
        onDone: turn => {
          trackEvent('ai_message_sent', { type: input.kind === 'file' ? input.file_kind : input.kind });
          onReply(toAiReply(turn));
        },
        onError: error => onFailed(error.code),
      }),
    );
  };
}

// Adds the reviewed draft. A service the user already tracks asks first (onDuplicate with the saved record's ID):
// view it, or add a separate plan.
export function addAiDraft(draft: ChatDraft, onAdded: (id: string) => void, onDone: () => void, onDuplicate: (existing_id: string | null) => void, separate_plan = false): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.createFromDraft,
        param_data: { id: draft.id, revision: draft.revision, separatePlan: separate_plan },
        onDone: ({ subscriptionId }) => {
          trackEvent('subscription_added', { source: 'ai' });
          dispatch(getDashboard());
          dispatch(getSubscriptions());
          successHaptic();
          dispatch(setNotice('Subscription added.'));
          onDone();
          onAdded(subscriptionId);
        },
        onError: error => {
          onDone();
          if (error.code === 'POSSIBLE_DUPLICATE') onDuplicate((error.extra.subscriptionIds as string[] | undefined)?.[0] ?? null);
          else dispatch(setNotice(error.message));
        },
      }),
    );
  };
}
