import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: SIZES.padding,
  },
  header: {
    borderBottomColor: COLORS.composer_divider,
    borderBottomWidth: 1,
    paddingBottom: SIZES.padding * 0.75,
  },
  list: {
    // Inverted list: flex-end keeps a short conversation at the top like the prototype.
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: SIZES.padding * 0.9,
    paddingTop: SIZES.padding * 0.7,
  },
  wrap: {
    gap: SIZES.padding / 4,
    marginTop: SIZES.padding * 0.85,
    maxWidth: '88%',
  },
  wrap_user: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  wrap_loop: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  author: {
    paddingHorizontal: SIZES.padding * 0.15,
  },
  bubble: {
    borderRadius: SIZES.padding * 0.75,
    borderWidth: 1,
    paddingHorizontal: SIZES.padding * 0.65,
    paddingVertical: SIZES.padding * 0.55,
  },
  bubble_user: {
    backgroundColor: COLORS.chat_user,
    borderBottomRightRadius: SIZES.padding / 4,
    borderColor: COLORS.chat_user_line,
  },
  bubble_loop: {
    backgroundColor: COLORS.chat_loop,
    borderBottomLeftRadius: SIZES.padding / 4,
    borderColor: COLORS.chat_loop_line,
  },
  // Voice notes take the full bubble width so the waveform has room.
  wrap_voice: {
    width: '88%',
  },
  wrap_image: {
    width: '76%',
  },
  wrap_pdf: {
    width: '85%',
  },
  bubble_image: {
    padding: SIZES.padding * 0.3,
  },
  media: {
    borderRadius: SIZES.padding / 2,
    overflow: 'hidden',
  },
  media_image: {
    height: SIZES.padding * 7.75,
    width: '100%',
  },
  media_strip: {
    backgroundColor: COLORS.chat_user_soft,
    paddingHorizontal: SIZES.padding * 0.45,
    paddingVertical: SIZES.padding * 0.35,
  },
  pdf_tile: {
    alignItems: 'center',
    backgroundColor: COLORS.voice_play,
    borderRadius: SIZES.padding * 0.45,
    height: SIZES.padding * 2.15,
    justifyContent: 'center',
    width: SIZES.padding * 1.75,
  },
  preview: {
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: 'center',
  },
  preview_image: {
    height: '80%',
    width: '100%',
  },
  preview_close: {
    position: 'absolute',
    right: SIZES.padding,
    top: SIZES.padding * 3,
  },
  bubble_wide: {
    alignSelf: 'stretch',
  },
  draft_price: {
    alignItems: 'flex-end',
  },
  retry: {
    minHeight: SIZES.padding * 2.2,
  },
  dots: {
    gap: SIZES.padding / 4,
    height: SIZES.padding * 0.9,
  },
  dot: {
    backgroundColor: COLORS.text_secondary,
    borderRadius: SIZES.padding / 5,
    height: SIZES.padding * 0.35,
    width: SIZES.padding * 0.35,
  },
  voice_play: {
    alignItems: 'center',
    backgroundColor: COLORS.voice_play,
    borderRadius: SIZES.padding * 1.1,
    height: SIZES.padding * 2.2,
    justifyContent: 'center',
    width: SIZES.padding * 2.2,
  },
  wave: {
    alignItems: 'center',
    gap: SIZES.padding / 10,
    height: SIZES.padding * 1.45,
  },
  speed: {
    backgroundColor: COLORS.chat_user_text,
    borderRadius: SIZES.padding / 2,
    minHeight: SIZES.padding,
    paddingHorizontal: SIZES.padding3,
  },
  wave_bar: {
    borderRadius: SIZES.padding / 10,
    width: SIZES.padding * 0.15,
  },
  file_tile: {
    alignItems: 'center',
    backgroundColor: COLORS.voice_play,
    borderRadius: SIZES.padding / 2,
    height: SIZES.padding * 2,
    justifyContent: 'center',
    width: SIZES.padding * 2,
  },
  draft: {
    backgroundColor: COLORS.draft_card,
    borderColor: COLORS.draft_line,
    borderRadius: SIZES.padding * 0.85,
    borderWidth: 1,
    marginTop: SIZES.padding * 0.85,
    padding: SIZES.padding * 0.7,
  },
  draft_tile: {
    alignItems: 'center',
    backgroundColor: COLORS.draft_tile,
    borderRadius: SIZES.padding * 0.55,
    height: SIZES.padding * 1.75,
    justifyContent: 'center',
    width: SIZES.padding * 1.75,
  },
  draft_grid: {
    borderTopColor: COLORS.draft_divider,
    borderTopWidth: 1,
    columnGap: SIZES.padding * 0.8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SIZES.padding * 0.6,
    paddingTop: SIZES.padding / 2,
    rowGap: SIZES.padding2,
  },
  draft_cell: {
    width: '46%',
  },
  draft_note: {
    width: '100%',
  },
  draft_button: {
    marginTop: SIZES.padding * 0.7,
  },
  composer: {
    borderTopColor: COLORS.composer_divider,
    borderTopWidth: 1,
    paddingBottom: SIZES.padding3,
    paddingTop: SIZES.padding * 0.55,
  },
  frame: {
    backgroundColor: COLORS.draft_card,
    borderColor: COLORS.composer_line,
    borderRadius: SIZES.padding * 0.85,
    borderWidth: 1,
    minHeight: SIZES.padding * 2.8,
    paddingLeft: SIZES.padding * 0.6,
    paddingRight: SIZES.padding * 0.3,
    paddingVertical: SIZES.padding / 4,
  },
  input: {
    color: COLORS.text_primary,
    flex: 1,
    // Four 18pt lines plus 24pt padding, biased upward because Raleway sits low.
    maxHeight: SIZES.padding * 4.8,
    paddingBottom: SIZES.padding * 0.7,
    paddingTop: SIZES.padding / 2,
  },
  icon_button: {
    alignItems: 'center',
    borderRadius: SIZES.padding2,
    height: SIZES.padding * 2.2,
    justifyContent: 'center',
    width: SIZES.padding * 2,
  },
  send: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding * 1.1,
    height: SIZES.padding * 2,
    width: SIZES.padding * 2,
  },
  send_disabled: {
    opacity: 0.4,
  },
  mic_held: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding * 1.1,
  },
  recording: {
    minHeight: SIZES.padding * 2.2,
  },
  attach_options: {
    gap: SIZES.padding * 0.45,
  },
  // An explicit line height keeps Raleway centred; without it iOS sits the text low.
  input_text: {
    fontSize: SIZES.sm,
    lineHeight: SIZES.padding * 0.9,
  },
  live_wave: {
    height: SIZES.padding * 1.2,
  },
  live_bar: {
    backgroundColor: COLORS.due_today,
    borderRadius: SIZES.padding / 10,
    width: SIZES.padding / 10,
  },
  lock_hint: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.draft_card,
    borderColor: COLORS.composer_line,
    borderRadius: SIZES.padding,
    borderWidth: 1,
    bottom: SIZES.padding * 3.4,
    gap: SIZES.padding / 10,
    paddingVertical: SIZES.padding3,
    position: 'absolute',
    width: SIZES.padding * 2,
  },
  locked: {
    backgroundColor: COLORS.draft_card,
    borderColor: COLORS.composer_line,
    borderRadius: SIZES.padding * 0.85,
    borderWidth: 1,
    paddingHorizontal: SIZES.padding * 0.6,
    paddingVertical: SIZES.padding / 4,
  },
  locked_actions: {
    borderTopColor: COLORS.composer_divider,
    borderTopWidth: 1,
    paddingTop: SIZES.padding / 4,
  },
  // Covers the placeholder while the bin plays.
  discard: {
    alignItems: 'center',
    backgroundColor: COLORS.draft_card,
    paddingHorizontal: SIZES.padding3,
    bottom: SIZES.padding / 2,
    left: SIZES.padding * 0.6,
    position: 'absolute',
  },
  discard_bin: {
    marginTop: -SIZES.padding / 4,
  },
  chip: {
    backgroundColor: COLORS.draft_card,
    borderColor: COLORS.composer_line,
    borderRadius: SIZES.padding2,
    borderWidth: 1,
    marginBottom: SIZES.padding3,
    padding: SIZES.padding3,
  },
  chip_image: {
    borderRadius: SIZES.padding3,
    height: SIZES.padding * 2,
    width: SIZES.padding * 2,
  },
  attach_option: {
    backgroundColor: COLORS.surface_option,
    borderColor: COLORS.line_quiet,
    borderRadius: SIZES.padding * 0.8,
    borderWidth: 1,
    minHeight: SIZES.padding * 3,
    paddingHorizontal: SIZES.padding2,
  },
});
