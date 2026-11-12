import PlatformLogo from '../../../components/PlatformLogo';
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Image, Pressable, View } from 'react-native';
import { pause_icon, pdf_icon, play_icon } from '../../../assets/icons';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import Icons from '../../../components/Icons';
import RowView from '../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import type { AiDraft } from '../../../types';
import { common_styles } from '../../../utils/common_styles';
import { dateLabel } from '../../../utils/scan';
import type { AiChatController, ChatMessage } from '../index.function';
import { styles } from '../styles';
import { money } from '../../../utils/money';

type Props = { chat: AiChatController };

// A fixed, deterministic waveform shape for a clip (no live metering in sent bubbles).
const WAVE = Array.from({ length: 34 }, (_, index) => 0.35 + 0.65 * Math.abs(Math.sin(index * 1.7) * Math.cos(index * 0.6)));
const clock = (ms: number) => `${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, '0')}`;

function VoiceBubble({ chat, message }: Props & { message: ChatMessage }) {
  const [width, setWidth] = useState(0);
  const [scrub, setScrub] = useState<number | null>(null);
  if (message.input?.kind !== 'voice') return null;
  const { uri, duration_ms } = message.input;
  const active = chat.playing?.id === message.id ? chat.playing : null;
  const total = active?.duration_ms || duration_ms;
  const position = scrub != null ? scrub * total : active?.position_ms ?? 0;
  const progress = total ? position / total : 0;
  const fraction = (x: number) => (width ? Math.min(1, Math.max(0, x / width)) : 0);
  const playing_now = !!active && !active.paused;
  return (
    <RowView gap={SIZES.padding / 2}>
      <RowView
        justify_content="center"
        accessibilityRole="button"
        accessibilityLabel={playing_now ? 'Pause voice message' : 'Play voice message'}
        onPress={() => chat.togglePlay(message.id, uri)}
        style={styles.voice_play}>
        <Icons name={playing_now ? pause_icon : play_icon} />
      </RowView>
      <View style={common_styles.flex_1}>
        {/* Tap or drag the waveform to seek, like WhatsApp. */}
        <RowView
          gap={SIZES.padding / 10}
          style={styles.wave}
          onLayout={event => setWidth(event.nativeEvent.layout.width)}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
          onResponderTerminationRequest={() => false}
          onResponderGrant={event => setScrub(fraction(event.nativeEvent.locationX))}
          onResponderMove={event => setScrub(fraction(event.nativeEvent.locationX))}
          onResponderRelease={() => {
            if (scrub != null) chat.seekVoice(message.id, uri, Math.round(scrub * total));
            setScrub(null);
          }}
          accessibilityRole="adjustable"
          accessibilityLabel="Voice message position"
          accessibilityValue={{ text: `${clock(position)} of ${clock(total)}` }}
          onAccessibilityAction={event => {
            const step = event.nativeEvent.actionName === 'increment' ? 5000 : -5000;
            chat.seekVoice(message.id, uri, Math.min(total, Math.max(0, position + step)));
          }}
          accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}>
          {WAVE.map((height, index) => (
            <View key={index} pointerEvents="none" style={[styles.wave_bar, { height: `${height * 100}%`, backgroundColor: index / WAVE.length < progress ? COLORS.chat_user_text : COLORS.voice_wave }]} />
          ))}
        </RowView>
        <RowView justify_content="space-between">
          {active ? (
            <RowView justify_content="center" accessibilityRole="button" accessibilityLabel={`Playback speed ${chat.speed}×`} onPress={chat.cycleSpeed} hitSlop={SIZES.padding2} style={styles.speed}>
              <CustomText text={`${chat.speed}×`} weight={FONTS.medium} color={COLORS.chat_user} size={SIZES.xs} />
            </RowView>
          ) : (
            <CustomText text="Voice message" weight={FONTS.regular} color={COLORS.chat_user_text} size={SIZES.sm} />
          )}
          <CustomText text={active || scrub != null ? clock(position) : clock(total)} weight={FONTS.regular} color={COLORS.chat_user_text} size={SIZES.sm} />
        </RowView>
      </View>
    </RowView>
  );
}

// Image: preview with View image ↗ (full-screen preview); PDF: file tile, name and View document ↗ (read-only Quick Look).
function FileBubble({ chat, message }: Props & { message: ChatMessage }) {
  if (message.input?.kind !== 'file') return null;
  const { uri, name, file_kind } = message.input;
  return (
    <View>
      {file_kind === 'image' ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Preview sent image" onPress={() => chat.openPreview(uri)} style={styles.media}>
          <Image source={{ uri }} style={styles.media_image} accessibilityIgnoresInvertColors />
          <CustomText text={'View image ↗\uFE0E'} weight={FONTS.regular} color={COLORS.chat_user_text} size={SIZES.xs} style={styles.media_strip} />
        </Pressable>
      ) : (
        <RowView gap={SIZES.padding / 2} accessibilityRole="button" accessibilityLabel={`Preview sent PDF ${name}`} onPress={() => chat.openDocument(uri, name)}>
          <View style={styles.pdf_tile}>
            <Icons name={pdf_icon} />
          </View>
          <View style={common_styles.flex_1}>
            <CustomText text={name} weight={FONTS.medium} color={COLORS.chat_user_text} size={SIZES.sm} />
            <CustomText mt={SIZES.padding / 4} text={'PDF · View document ↗\uFE0E'} weight={FONTS.regular} color={COLORS.chat_user_text} size={SIZES.xs} />
          </View>
        </RowView>
      )}
      {message.text ? <CustomText mt={SIZES.padding3} text={message.text} weight={FONTS.regular} color={COLORS.chat_user_text} size={SIZES.sm} /> : null}
    </View>
  );
}

export function MessageItem({ chat, message }: Props & { message: ChatMessage }) {
  const user = message.role === 'user';
  const kind = message.input?.kind === 'file' ? message.input.file_kind : message.input?.kind;
  return (
    <View style={[styles.wrap, user ? styles.wrap_user : styles.wrap_loop, kind === 'voice' && styles.wrap_voice, kind === 'image' && styles.wrap_image, kind === 'pdf' && styles.wrap_pdf]}>
      <CustomText text={user ? 'You' : 'Loop'} weight={FONTS.regular} color={COLORS.chat_author} size={SIZES.sm} style={styles.author} />
      <View style={[styles.bubble, user ? styles.bubble_user : styles.bubble_loop, (kind === 'voice' || kind === 'image' || kind === 'pdf') && styles.bubble_wide, kind === 'image' && styles.bubble_image]} accessibilityLiveRegion={user ? 'none' : 'polite'}>
        {message.input?.kind === 'voice' ? (
          <VoiceBubble chat={chat} message={message} />
        ) : message.input?.kind === 'file' ? (
          <FileBubble chat={chat} message={message} />
        ) : (
          <CustomText text={message.text} weight={FONTS.regular} color={user ? COLORS.chat_user_text : COLORS.text_primary} size={SIZES.sm} />
        )}
      </View>
      {message.failed ? (
        <RowView gap={SIZES.padding3} accessibilityRole="button" accessibilityLabel="Message could not be sent. Retry is available." onPress={() => chat.retry(message.id)} style={styles.retry}>
          <CustomText text="Couldn’t send" weight={FONTS.regular} color={COLORS.expired} size={SIZES.sm} />
          <CustomText text="Retry" weight={FONTS.medium} color={COLORS.primary} size={SIZES.sm} />
        </RowView>
      ) : null}
    </View>
  );
}

// Three staggered dots on Loop's side while a reply is pending; static under Reduce Motion.
export function ThinkingDots({ label }: { label: string }) {
  const values = useRef([0, 1, 2].map(() => new Animated.Value(0))).current;
  useEffect(() => {
    let loop: Animated.CompositeAnimation | null = null;
    AccessibilityInfo.isReduceMotionEnabled().then(reduce => {
      if (reduce) return;
      loop = Animated.loop(
        Animated.stagger(
          160,
          values.map(value => Animated.sequence([Animated.timing(value, { toValue: 1, duration: 280, easing: Easing.out(Easing.quad), useNativeDriver: true }), Animated.timing(value, { toValue: 0, duration: 280, easing: Easing.in(Easing.quad), useNativeDriver: true })])),
        ),
      );
      loop.start();
    });
    return () => loop?.stop();
  }, [values]);
  return (
    <View style={[styles.wrap, styles.wrap_loop]} accessibilityLabel={label} accessibilityLiveRegion="polite">
      <CustomText text="Loop" weight={FONTS.regular} color={COLORS.chat_author} size={SIZES.sm} style={styles.author} />
      <View style={[styles.bubble, styles.bubble_loop]}>
        <RowView style={styles.dots}>
          {values.map((value, index) => (
            <Animated.View key={index} style={[styles.dot, { transform: [{ translateY: value.interpolate({ inputRange: [0, 1], outputRange: [0, -SIZES.padding / 4] }) }] }]} />
          ))}
        </RowView>
      </View>
    </View>
  );
}

function Cell({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <View style={full ? styles.draft_note : styles.draft_cell}>
      <CustomText text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <CustomText mt={SIZES.padding / 4} text={value} weight={FONTS.regular} size={SIZES.sm} />
    </View>
  );
}

// The one current draft: identity and status, amount, the populated fields, and Add subscription.
export function DraftCard({ chat, draft }: Props & { draft: AiDraft }) {
  const status_color = chat.added || !chat.missing ? COLORS.primary : COLORS.renewing_soon;
  const cells: { label: string; value: string; full?: boolean }[] = [];
  if (draft.trial) cells.push({ label: 'Trial ends', value: draft.trial.end_date ? dateLabel(draft.trial.end_date) : 'Needs confirmation' });
  else cells.push({ label: 'Next renewal', value: draft.next_date ? dateLabel(draft.next_date) : 'Needs confirmation' });
  if (draft.category) cells.push({ label: 'Category', value: draft.category });
  if (draft.start_date) cells.push({ label: draft.trial ? 'Trial started' : 'Start date', value: dateLabel(draft.start_date) });
  if (draft.trial?.days) cells.push({ label: 'Trial duration', value: `${draft.trial.days} days` });
  if (draft.trial) cells.push({ label: 'Auto-renew tracking', value: draft.trial.auto_renew ? 'On' : 'Off' });
  if (draft.notes) cells.push({ label: 'Notes', value: draft.notes, full: true });
  return (
    <View style={styles.draft} accessibilityLabel={`${draft.name ?? 'Subscription'} draft, ${chat.draft_status}`}>
      <RowView align_items="flex-start" gap={SIZES.padding * 0.45}>
        <View style={styles.draft_tile}><PlatformLogo platform_id={draft.platform_id ?? ''} name={draft.name ?? '?'} /></View>
        <View style={common_styles.flex_1}>
          <CustomText text={draft.name ?? ''} weight={FONTS.medium} size={SIZES.sm} />
          <CustomText mt={SIZES.padding / 4} text={chat.draft_status} weight={FONTS.regular} color={status_color} size={SIZES.sm} />
        </View>
        <View style={styles.draft_price}>
          <CustomText text={draft.price && draft.currency ? money(draft.currency, draft.price) : 'Amount needed'} weight={FONTS.medium} size={SIZES.lg} letter_spacing={-0.5} />
          <CustomText mt={SIZES.padding / 4} text={`${draft.trial ? 'After trial · ' : ''}${draft.cycle ?? 'Cycle needed'}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        </View>
      </RowView>
      <View style={styles.draft_grid}>
        {cells.map(cell => (
          <Cell key={cell.label} {...cell} />
        ))}
      </View>
      {chat.added ? (
        <CustomButton variant="secondary" text="View subscription" onPress={chat.viewAdded} style={styles.draft_button} />
      ) : (
        <CustomButton variant="primary" text={chat.saving ? 'Adding…' : 'Add subscription'} busy={chat.saving} disabled={!chat.can_add} onPress={chat.add} style={styles.draft_button} />
      )}
    </View>
  );
}
