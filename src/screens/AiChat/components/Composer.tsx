import { useMemo, useRef } from 'react';
import { Image, PanResponder, TextInput, View } from 'react-native';
import { close_small_icon, image_icon, mic_active_icon, mic_icon, paperclip_icon, pdf_icon, send_icon } from '../../../assets/icons';
import AppSheet from '../../../components/AppSheet';
import CustomText from '../../../components/CustomText';
import Icons from '../../../components/Icons';
import RowView from '../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { common_styles } from '../../../utils/common_styles';
import type { AiChatController } from '../index.function';
import { styles } from '../styles';

type Props = { chat: AiChatController };

const CANCEL_DISTANCE = SIZES.padding * 4;
const clock = (ms: number) => `${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, '0')}`;

// Exactly two choices; the native pickers scope access to the one chosen file.
export function AttachSheet({ chat }: Props) {
  const option = (label: string, icon: string, onPress: () => void) => (
    <RowView gap={SIZES.padding2} accessibilityRole="button" onPress={onPress} style={styles.attach_option}>
      <Icons name={icon} />
      <CustomText text={label} weight={FONTS.medium} size={SIZES.md} />
    </RowView>
  );
  return (
    <AppSheet visible={chat.attach_open} title="Attach a file" onClose={chat.closeAttach} onDismiss={chat.onAttachDismiss}>
      <View style={styles.attach_options}>
        {option('Image', image_icon, chat.pickImage)}
        {option('PDF document', pdf_icon, chat.pickPdf)}
      </View>
    </AppSheet>
  );
}

// Text grows to four lines; empty text shows attach + hold-to-record, text or a file shows Send.
export default function Composer({ chat }: Props) {
  const latest = useRef(chat);
  latest.current = chat;
  const hold = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => latest.current.startRecording(),
        onPanResponderMove: (_, gesture) => latest.current.setCancelling(gesture.dx < -CANCEL_DISTANCE),
        onPanResponderRelease: () => latest.current.finishRecording(),
        onPanResponderTerminate: () => latest.current.finishRecording(),
        onPanResponderTerminationRequest: () => false,
      }),
    [],
  );
  const idle = !chat.text.trim() && !chat.attachment;
  const recording = chat.recording;

  return (
    <View style={styles.composer}>
      {chat.attach_error ? <CustomText mb={SIZES.padding3} text={chat.attach_error} weight={FONTS.regular} color={COLORS.expired} size={SIZES.sm} accessibility_role="alert" /> : null}
      {chat.attachment ? (
        <RowView gap={SIZES.padding / 2} style={styles.chip}>
          {chat.attachment.file_kind === 'image' ? <Image source={{ uri: chat.attachment.uri }} style={styles.chip_image} /> : <View style={styles.file_tile}><Icons name={pdf_icon} /></View>}
          <View style={common_styles.flex_1}>
            <CustomText text={chat.attachment.file_kind === 'image' ? 'Image attached' : 'PDF attached'} weight={FONTS.medium} size={SIZES.sm} />
            <CustomText text={chat.attachment.name} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} number_of_lines={1} />
          </View>
          <RowView justify_content="center" accessibilityRole="button" accessibilityLabel="Remove attachment" onPress={chat.removeAttachment} style={styles.icon_button}>
            <Icons name={close_small_icon} />
          </RowView>
        </RowView>
      ) : null}
      <RowView gap={SIZES.padding / 4} align_items="flex-end" style={styles.frame}>
        {recording ? (
          <RowView gap={SIZES.padding3} style={[common_styles.flex_1, styles.recording]} accessibilityLiveRegion="polite">
            <View style={styles.record_dot} />
            <CustomText text={`Recording ${clock(recording.elapsed_ms)}`} weight={FONTS.medium} size={SIZES.sm} />
            <CustomText text={recording.cancelling ? 'Release to cancel' : '‹ Slide left to cancel'} weight={FONTS.regular} color={recording.cancelling ? COLORS.expired : COLORS.text_secondary} size={SIZES.sm} style={common_styles.flex_1} align="right" />
          </RowView>
        ) : (
          <TextInput
            value={chat.text}
            onChangeText={chat.changeText}
            placeholder="Message Loop…"
            placeholderTextColor={COLORS.text_secondary}
            multiline
            maxLength={2000}
            accessibilityLabel="Message Loop"
            style={[styles.input, styles.input_text, { fontFamily: FONTS.regular }]}
          />
        )}
        {idle || recording ? (
          <RowView gap={SIZES.padding / 10}>
            {recording ? null : (
              <RowView justify_content="center" accessibilityRole="button" accessibilityLabel="Attach an image or PDF" onPress={chat.openAttach} style={styles.icon_button}>
                <Icons name={paperclip_icon} />
              </RowView>
            )}
            <View accessibilityRole="button" accessibilityLabel="Hold to record a voice message" accessibilityHint="Release to send, slide left to cancel" style={[styles.icon_button, recording && styles.mic_held]} {...hold.panHandlers}>
              <Icons name={recording ? mic_active_icon : mic_icon} />
            </View>
          </RowView>
        ) : (
          <RowView justify_content="center" accessibilityRole="button" accessibilityLabel="Send message" accessibilityState={{ disabled: !chat.can_send }} disabled={!chat.can_send} onPress={chat.send} style={[styles.icon_button, styles.send, !chat.can_send && styles.send_disabled]}>
            <Icons name={send_icon} />
          </RowView>
        )}
      </RowView>
    </View>
  );
}
