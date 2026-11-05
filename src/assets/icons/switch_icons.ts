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
export const clock_icon = `<svg stroke="${COLORS.text_primary}" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" stroke-width="1.8"/><path d="M12 8v4l2.5 2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
