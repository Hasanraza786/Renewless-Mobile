// Word for word from renewlessapp.com (home page FAQ and /support); change both together.
export const SUPPORT_QUESTIONS: { title: string; items: { question: string; answer: string }[] }[] = [
  {
    title: 'Questions',
    items: [
      { question: 'Is Renewless free?', answer: 'Yes. Every feature in this version is free, including Gmail scans, reminders and the widget. AI chat with Loop includes 50 free messages a month.' },
      { question: 'Do I have to connect Gmail?', answer: 'It’s your choice. Connect Gmail and Renewless finds your subscriptions for you, or add them yourself, by hand or by telling Loop with text, voice, a photo or a PDF. You can use both, and connect Gmail later from your Profile.' },
      { question: 'Is my Gmail data safe?', answer: 'Access is read-only. Renewless looks only for billing emails and keeps their receipt details and attachments, not the full email. You can disconnect an inbox at any time.' },
      { question: 'Can Renewless cancel a subscription for me?', answer: 'No. It opens the service’s own manage page. After you cancel there, mark it as cancelled in Renewless.' },
      { question: 'Does it work with Outlook or iCloud mail?', answer: 'No, Renewless reads Gmail only. You can still add any subscription by hand or with Loop.' },
    ],
  },
  {
    title: 'Fixing a problem',
    items: [
      { question: 'Gmail stopped scanning', answer: 'Open Profile, then your connected inbox, and reconnect it.' },
      { question: 'A new subscription is not showing', answer: 'Open Profile, then your connected inbox, and tap Sync. Sync is available once a week per inbox, and the app shows when the next one opens. Renewals of subscriptions you already track are checked automatically.' },
      { question: 'Reminders don’t arrive', answer: 'Check that notifications for Renewless are on in your phone’s settings and in Renewless Settings.' },
      { question: 'A date or price is wrong', answer: 'Open the subscription and tap Edit.' },
      { question: 'Cancelling a subscription', answer: 'Renewless can’t cancel for you. Use the manage link on the subscription, then mark it as cancelled.' },
    ],
  },
];
