import { COLORS } from '../../constants/theme';

// Header Delete button as one asset: 40pt danger box with its border and the trash glyph.
const trash_icon = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="39" height="39" rx="11.5" fill="${COLORS.danger_surface}" stroke="${COLORS.expired}" stroke-opacity="0.1"/><g transform="translate(10.5 10.5) scale(0.7917)"><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 10v7M14 10v7" stroke="${COLORS.expired}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`;

export default trash_icon;
