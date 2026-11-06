import { useEffect, useMemo, useRef } from 'react';
import { Animated, Image, PanResponder, TextInput, View } from 'react-native';
import { close_small_icon, image_icon, mic_active_icon, mic_icon, paperclip_icon, pdf_icon, send_icon } from '../../../assets/icons';
import AppSheet from '../../../components/AppSheet';
import CustomText from '../../../components/CustomText';
import Icons from '../../../components/Icons';
import RowView from '../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { common_styles } from '../../../utils/common_styles';
import type { AiChatController } from '../index.function';
import { styles } from '../styles';
import { DiscardBin, HoldBar, LockedBar, LockHint } from './VoiceRecorder';

type Props = { chat: AiChatController };

const CANCEL_DISTANCE = SIZES.padding * 6;
const LOCK_DISTANCE = SIZES.padding * 4;

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
// Voice works like WhatsApp: hold the mic, slide left to discard, slide up to lock hands-free.
export default function Composer({ chat }: Props) {
  const latest = useRef(chat);
  latest.current = chat;
  const drag = useRef(new Animated.ValueXY()).current;
  const mic_scale = useRef(new Animated.Value(1)).current;
  const handled = useRef(false);
  const holding = !!chat.recording && !chat.recording.locked;

  useEffect(() => {
    Animated.spring(mic_scale, { toValue: holding ? 1.6 : 1, friction: 6, useNativeDriver: true }).start();
  }, [holding, mic_scale]);

  const hold = useMemo(() => {
    const settle = () => Animated.spring(drag, { toValue: { x: 0, y: 0 }, friction: 7, useNativeDriver: true }).start();
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        handled.current = false;
        drag.setValue({ x: 0, y: 0 });
        latest.current.startRecording();
      },
      onPanResponderMove: (_, gesture) => {
        if (handled.current) return;
        // Follow one axis at a time, like WhatsApp.
        const horizontal = Math.abs(gesture.dx) > Math.abs(gesture.dy);
        drag.setValue({ x: horizontal ? Math.min(0, gesture.dx) : 0, y: horizontal ? 0 : Math.min(0, gesture.dy) });
        if (gesture.dx < -CANCEL_DISTANCE) {
          handled.current = true;
          latest.current.cancelRecording();
          drag.setValue({ x: 0, y: 0 });
        } else if (gesture.dy < -LOCK_DISTANCE) {
          handled.current = true;
          latest.current.lockRecording();
          // The mic unmounts while locked, so reset instead of animating a detached view.
          drag.setValue({ x: 0, y: 0 });
        }
      },
      onPanResponderRelease: () => {
        if (!handled.current) latest.current.finishRecording();
        handled.current = true;
        settle();
      },
      onPanResponderTerminate: () => {
        if (!handled.current) latest.current.finishRecording();
        handled.current = true;
        settle();
      },
      onPanResponderTerminationRequest: () => false,
    });
  }, [drag]);
  const idle = !chat.text.trim() && !chat.attachment;
  const recording = chat.recording;

  return (
    <View style={styles.composer}>
      {chat.attach_error ? <CustomText mb={SIZES.padding3} text={chat.attach_error} weight={FONTS.regular} color={COLORS.expired} size={SIZES.sm} accessibility_role="alert" /> : null}
      {chat.attachment && !recording ? (
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
      {recording?.locked ? (
        <LockedBar chat={chat} />
      ) : (
        <RowView gap={SIZES.padding / 4} align_items="flex-end" style={styles.frame}>
          {recording ? (
            <HoldBar chat={chat} drag_x={drag.x} />
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
              <View>
                {recording ? <LockHint drag_y={drag.y} /> : null}
                <Animated.View
                  accessibilityRole="button"
                  accessibilityLabel="Hold to record a voice message"
                  accessibilityHint="Release to send, slide left to cancel, slide up to lock"
                  style={[styles.icon_button, recording && styles.mic_held, { transform: [{ translateX: drag.x }, { translateY: drag.y }, { scale: mic_scale }] }]}
                  {...hold.panHandlers}>
                  <Icons name={recording ? mic_active_icon : mic_icon} />
                </Animated.View>
              </View>
            </RowView>
          ) : (
            <RowView justify_content="center" accessibilityRole="button" accessibilityLabel="Send message" accessibilityState={{ disabled: !chat.can_send }} disabled={!chat.can_send} onPress={chat.send} style={[styles.icon_button, styles.send, !chat.can_send && styles.send_disabled]}>
              <Icons name={send_icon} />
            </RowView>
          )}
          <DiscardBin count={chat.discarded} />
        </RowView>
      )}
    </View>
  );
}
