import { gmail_logo, outlook_logo } from '../assets/icons';
import type { InboxProvider } from '../types';

// Name and logo of a connected inbox's mail service (Gmail or Outlook, which covers Hotmail and Live).
export const INBOX_BRAND: Record<InboxProvider, { name: string; logo: string; company: string }> = {
  gmail: { name: 'Gmail', logo: gmail_logo, company: 'Google' },
  outlook: { name: 'Outlook', logo: outlook_logo, company: 'Microsoft' },
};
