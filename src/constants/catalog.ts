// Starter platform catalog for manual-entry suggestions: name, category and stable platform ID only (never price or dates).
// shortcut: bundled starter list; switch to the backend catalog query when it exists.
export const PLATFORM_CATALOG: readonly { name: string; category: string; platform_id: string; aliases?: string[] }[] = [
  { name: 'Netflix', category: 'Entertainment', platform_id: 'netflix' },
  { name: 'Spotify', category: 'Entertainment', platform_id: 'spotify' },
  { name: 'iCloud+', category: 'Storage', platform_id: 'icloud' },
  { name: 'Notion', category: 'Productivity', platform_id: 'notion', aliases: ['NOTION LABS'] },
  { name: 'Figma', category: 'Productivity', platform_id: 'figma' },
  { name: 'Duolingo', category: 'Education', platform_id: 'duolingo' },
  { name: 'YouTube Premium', category: 'Entertainment', platform_id: 'youtube-premium' },
  { name: 'Apple Music', category: 'Entertainment', platform_id: 'apple-music' },
  { name: 'Google One', category: 'Storage', platform_id: 'google-one' },
];
