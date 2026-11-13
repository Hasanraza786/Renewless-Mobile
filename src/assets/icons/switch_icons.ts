import { COLORS } from '../../constants/theme';

// The prototype's 38×22 switch: off is a graphite track with a white knob, on is mint with a dark knob.
export const switch_off_icon = `<svg width="38" height="22" viewBox="0 0 38 22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="37" height="21" rx="10.5" fill="${COLORS.switch_track}" stroke="${COLORS.switch_border}"/><circle cx="11" cy="11" r="8" fill="${COLORS.white}"/></svg>`;
export const switch_on_icon = `<svg width="38" height="22" viewBox="0 0 38 22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="37" height="21" rx="10.5" fill="${COLORS.primary}" stroke="${COLORS.primary}"/><circle cx="26" cy="11" r="8" fill="${COLORS.switch_knob_on}"/></svg>`;

// Add sheet option glyphs (23pt mint, 1.6 stroke).
export const sparkle_icon = `<svg stroke="${COLORS.primary}" width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4z" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
export const pencil_icon = `<svg stroke="${COLORS.primary}" width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15 4 5 5M4 20l5-1L21 7l-4-4L5 15z" stroke-width="1.6" stroke-linejoin="round"/></svg>`;

// Alerts glyphs (21pt): the amber notice bell, the mint gear on Manage reminders and the grey device bell.
const GEAR = 'm9.5 3-.6 2.1-2 .9-2-.5-2.4 4.1L4 11.2v2l-1.5 1.6 2.4 4.1 2-.5 2 .9.6 2.1h5l.6-2.1 2-.9 2 .5 2.4-4.1-1.5-1.6v-2l1.5-1.6-2.4-4.1-2 .5-2-.9-.6-2.1z';
const BELL = 'M5 17h14l-2-4V9a5 5 0 0 0-10 0v4zM10 21h4';
export const notice_bell_icon = `<svg stroke="${COLORS.renewing_soon}" width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${BELL}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const device_bell_icon = `<svg stroke="${COLORS.text_secondary}" width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${BELL}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const gear_accent_icon = `<svg stroke="${COLORS.primary}" width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${GEAR}" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke-width="1.6"/></svg>`;

// Reminder time field (18pt, like the date field's calendar).
// Home's Next sync pill.
export const clock_accent_icon = `<svg stroke="${COLORS.primary}" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" stroke-width="1.8"/><path d="M12 8v4l2.5 2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const clock_icon = `<svg stroke="${COLORS.text_primary}" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" stroke-width="1.8"/><path d="M12 8v4l2.5 2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// Loop chat composer and bubbles (prototype glyphs, 24 viewBox).
const chatGlyph = (paths: string, color: string, size: number, stroke = 1.8, fill = 'none') =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" xmlns="http://www.w3.org/2000/svg"><path d="${paths}" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const paperclip_icon = chatGlyph('m21 11-8.6 8.6a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5', COLORS.primary, 22);
export const mic_icon = chatGlyph('M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3M9 21h6', COLORS.primary, 22);
export const mic_active_icon = chatGlyph('M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3M9 21h6', COLORS.background, 22);
export const send_icon = chatGlyph('M12 19V5M5 12l7-7 7 7', COLORS.background, 20, 2.2);
export const play_icon = `<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 4.5v15l12-7.5z" fill="${COLORS.chat_user_text}"/></svg>`;
export const pause_icon = `<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 4h3.5v16H7zM13.5 4H17v16h-3.5z" fill="${COLORS.chat_user_text}"/></svg>`;
export const image_icon = chatGlyph('M4 4h16v16H4zM4 16l5-5 4 4 2-2 5 5M15 8h.01', COLORS.primary, 22);
export const pdf_icon = chatGlyph('M15 3H5v18h14V7l-4-4Zm0 0v5h5M8 12h8M8 16h5', COLORS.primary, 22);
export const close_small_icon = chatGlyph('m6 6 12 12M18 6 6 18', COLORS.text_secondary, 18);

// WhatsApp-style recorder: lock hint, discard bin, record pause/resume and the red live mic.
export const lock_icon = chatGlyph('M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z', COLORS.text_secondary, 18);
export const chevron_up_icon = chatGlyph('m7 14 5-5 5 5', COLORS.text_secondary, 16);
export const bin_icon = chatGlyph('M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7', COLORS.text_secondary, 22);
export const bin_danger_icon = chatGlyph('M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7', COLORS.due_today, 22);
export const record_pause_icon = chatGlyph('M8 5v14M16 5v14', COLORS.due_today, 22, 2.4);
export const record_mic_icon = chatGlyph('M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3M9 21h6', COLORS.due_today, 22);
