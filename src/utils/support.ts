import type { SupportMessage, SupportTopic } from '../types';

export const SUPPORT_TOPIC_LABELS: Record<SupportTopic, string> = {
  gmail: 'Gmail and sync',
  reminders: 'Reminders',
  subscriptions: 'Subscriptions and payments',
  ai_chat: 'AI chat',
  account: 'Account',
  other: 'Something else',
};

export const SUPPORT_STATUS_LABELS: Record<SupportMessage['status'], string> = { sent: 'Sent', replied: 'Replied', closed: 'Closed' };

// The message limits the backend enforces too.
export const SUPPORT_MESSAGE_MIN = 10;
export const SUPPORT_MESSAGE_MAX = 2000;
