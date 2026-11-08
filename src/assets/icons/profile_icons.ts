import { COLORS } from '../../constants/theme';

// Profile glyphs from the approved prototype (24 viewBox, round 1.65 stroke).
const glyph = (paths: string, color: string, size: number, stroke = 1.65, extra = '') =>
  `<svg stroke="${color}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${paths}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>${extra}</svg>`;

const HELP_RING = `<circle cx="12" cy="12" r="9" stroke-width="1.65"/>`;

// Menu row tiles (17pt, soft grey).
export const history_icon = glyph('M3 11a9 9 0 1 1 2 7M3 5v6h6M12 7v5l3 2', COLORS.icon_soft, 17);
export const payments_icon = glyph('M3 7h18v13H3zM3 11h18M7 16h3', COLORS.icon_soft, 17);
export const refresh_icon = glyph('M20 7v5h-5M4 17v-5h5M6 8a7 7 0 0 1 12-2l2 6M4 12l2 6a7 7 0 0 0 12-2', COLORS.icon_soft, 17);
export const security_icon = glyph('M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6zM9 12l2 2 4-4', COLORS.icon_soft, 17);
export const help_icon = glyph('M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2-3 4M12 17h.01', COLORS.icon_soft, 17, 1.65, HELP_RING);
export const privacy_icon = glyph('M5 10h14v11H5zM8 10V7a4 4 0 0 1 8 0v3', COLORS.icon_soft, 17);
export const terms_icon = glyph('M6 3h9l4 4v14H6zM14 3v5h5M9 12h7M9 16h7', COLORS.icon_soft, 17);
export const settings_icon = glyph('M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12l2-1-2-4-2 1-2-1-1-2h-4l-1 2-2 1-2-1-2 4 2 1v0l-2 1 2 4 2-1 2 1 1 2h4l1-2 2-1 2 1 2-4z', COLORS.icon_soft, 17);
export const widget_icon = glyph('M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z', COLORS.icon_soft, 17);
export const delete_tile_icon = glyph('M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7', COLORS.danger, 17);

export const mail_icon = glyph('M3 5h18v14H3zM3 6l9 7 9-7', COLORS.text_secondary, 19);
export const logout_icon = glyph('M9 4H4v16h5M14 8l4 4-4 4M8 12h10', COLORS.danger, 19);

// Change password intro mark (23pt accent).
export const security_accent_icon = glyph('M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6zM9 12l2 2 4-4', COLORS.primary, 23, 1.6);

// Password visibility toggle: eye, and eye with the slash while the password is shown.
const EYE = 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z';
const PUPIL = `<circle cx="12" cy="12" r="3" stroke-width="1.65"/>`;
export const eye_icon = glyph(EYE, COLORS.icon_muted, 19, 1.65, PUPIL);
export const eye_off_icon = glyph(EYE, COLORS.icon_muted, 19, 1.65, `${PUPIL}<path d="m4 3 16 18" stroke-width="1.65" stroke-linecap="round"/>`);
