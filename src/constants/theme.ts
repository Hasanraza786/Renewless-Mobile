import { Dimensions, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

export const is_ios = Platform.OS === 'ios';
export const behavior = is_ios ? 'padding' : 'padding';

export const COLORS = {
  primary: '#B9E58C',
  accent: '#A6D17B',
  text_primary: '#E8EAED',
  white: '#FFFFFF',
  text_secondary: '#9DA4AB',
  background: '#151719',
  background_scrim: '#15171959',
  transparent: 'transparent',
  card: '#202326',
  control_surface: '#24292C',
  skeleton: '#2C3032',
  chart_bar: '#D2D9D5',
  danger_surface: '#302326',
  dialog_raised: '#292E32',
  hairline: '#34393E',
  control_border: '#69727A',
  expired: '#FF8A8A',
  disabled_fill: '#30353A',
  renewing_soon: '#E8BE78',
  due_today: '#F29B8F',
  trial: '#9EBCE0',
  dialog: '#25282C',
  tooltip: '#252B29',
  tooltip_text: '#C6CCD1',
  progress_track: '#303638',
  line_faint: '#ffffff12',
  line_quiet: '#ffffff0b',
  line_soft: '#ffffff0c',
  overlay_soft: '#ffffff08',
  social_border: '#3C4246',
  secondary_border: '#454A4F',
  receipt: '#282D30',
  receipt_line: '#454B4E',
  found_card: '#252B2C',
  logo_tile: '#292E31',
  checkbox_fill: '#191C1F',
  checkbox_border: '#78828A',
  field_border: '#52585C',
  code_border: '#454D51',
  divider_text: '#858E95',
  select_border: '#3B4247',
  handle: '#777D80',
  line_menu: '#ffffff1b',
  line_sheet: '#ffffff18',
  sheet_scrim: '#10141290',
  donut_mid: '#53694C',
  donut_end: '#849B76',
  accent_line: '#b9e58c15',
  accent_border: '#b9e58c20',
  accent_ring: '#b9e58c30',
  accent_edge: '#b9e58c3a',
  accent_tile: '#b9e58c25',
  accent_card: '#b9e58c24',
  accent_select: '#b9e58c13',
  status_active_bg: '#243028',
  status_trial_bg: '#24303A',
  status_muted_bg: '#2A2E32',
  status_soon_bg: '#3A3424',
  status_due_bg: '#3A2C2A',
  status_expired_bg: '#3A2424',
  danger: '#F29B8F',
  on_danger: '#231A19',
  danger_line: '#f29b8f17',
  danger_wash: '#f29b8f04',
  avatar_fill: '#2C3433',
  icon_soft: '#B4BCC1',
  icon_muted: '#AAB2B8',
  text_faint: '#79838A',
  text_dim: '#7F8B91',
  overlay_faint: '#ffffff04',
  line_hint: '#ffffff06',
  accent_wash: '#b9e58c08',
  accent_glow: '#b9e58c0b',
  accent_muted: '#b9e58c77',
  accent_soft: '#b9e58c1c',
  surface_sunken: '#1C1F22',
  surface_accent: '#282E2B',
  text_ghost: '#51585E',
  switch_track: '#353B39',
  surface_option: '#282D31',
  tile_raised: '#333A3F',
  accent_tint: '#b9e58c0d',
  accent_frame: '#b9e58c35',
  accent_chip: '#b9e58c18',
  warning_wash: '#e8be7808',
  warning_line: '#e8be782a',
  text_message: '#BAC0C6',
  text_stamp: '#929BA2',
  switch_border: '#727B73',
  switch_knob_on: '#182018',
  error_text: '#FFACAC',
  error_line: '#ff8a8a28',
  error_wash: '#ff8a8a06',
};

export const SIZES = {
  padding: 20,
  padding2: 12,
  padding3: 8,

  // font sizes: 766 = 844pt Studio iPhone frame minus RFValue's 78pt notch offset, so prototype sizes match exactly there
  xs: RFValue(10, 766),
  sm: RFValue(12, 766),
  md: RFValue(14, 766),
  lg: RFValue(16, 766),
  h3: RFValue(22, 766),

  control_height: 44,
  button_height: 48,

  width,
  height,
};

export const FONTS = {
  regular: 'Raleway-Regular',
  medium: 'Raleway-Medium',
};

export const fonts = FONTS;

const app_theme = { COLORS, SIZES, FONTS };

export default app_theme;
