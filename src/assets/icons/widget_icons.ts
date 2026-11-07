import { COLORS } from '../../constants/theme';

// Add-widget prompt: mint benefit tick and the Watch how play mark.
export const benefit_check_icon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m5 12.5 4.5 4.5L19 7.5" stroke="${COLORS.primary}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const play_circle_icon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="${COLORS.primary}" stroke-width="1.8"/><path d="m10 8.5 5.5 3.5-5.5 3.5Z" stroke="${COLORS.primary}" stroke-width="1.8" stroke-linejoin="round"/></svg>`;

// Decorative app glyphs on the fictional Home Screen of the how-to clip (prototype widgetAppGlyph).
const glyph = (paths: string) =>
  `<svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="${COLORS.sage_text}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">${paths}</svg>`;
export const demo_app_icons = [
  glyph('<rect x="4" y="6" width="24" height="20" rx="4"/><path d="m5 8 11 9L27 8"/>'),
  glyph('<path d="M16 16C0-8 32-8 16 16c24-16 24 16 0 0 16 24-16 24 0 0-24 16-24-16 0 0Z"/>'),
  glyph('<path d="m10 8 2-3h8l2 3h4a3 3 0 0 1 3 3v14H3V11a3 3 0 0 1 3-3Z"/><circle cx="16" cy="17" r="6"/>'),
  glyph('<circle cx="16" cy="16" r="12"/><path d="M16 8v9l6 3"/>'),
  glyph('<rect x="6" y="3" width="20" height="26" rx="3"/><path d="M10 10h12M10 16h12M10 22h8"/>'),
  glyph('<path d="M12 23V7l15-3v16M12 12l15-3"/><ellipse cx="8" cy="24" rx="4" ry="3"/><ellipse cx="23" cy="21" rx="4" ry="3"/>'),
  glyph('<circle cx="16" cy="16" r="10"/><circle cx="16" cy="16" r="4"/><path d="M16 2v4m0 20v4M2 16h4m20 0h4M6 6l3 3m14 14 3 3M26 6l-3 3M9 23l-3 3"/>'),
  glyph('<circle cx="16" cy="16" r="12"/><path d="m22 10-4 9-8 3 4-9Z"/>'),
];
