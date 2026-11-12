import PlatformLogo from '../../../components/PlatformLogo';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Platform, View } from 'react-native';
import { benefit_check_icon, demo_app_icons, logo_mark, play_circle_icon } from '../../../assets/icons';
import ConfirmDialog from '../../../components/ConfirmDialog';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import Icons from '../../../components/Icons';
import RowView from '../../../components/RowView';
import SizedBox from '../../../components/SizedBox';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import type { HomeEvent } from '../../../types';
import { common_styles } from '../../../utils/common_styles';
import { widgetCopy } from '../../../utils/widget';
import type { HomeController } from '../index.function';
import { styles } from '../styles';

const TONE_COLOR = { today: COLORS.due_today, trial: COLORS.trial, renewal: COLORS.primary };
const BENEFITS = ['See your next renewal without opening the app.', 'Know before a free trial turns into a charge.', 'Counts down to each renewal on its own.'];
const CAPTIONS = ['1 · Touch and hold', '2 · Tap +', '3 · Search Renewless', '4 · Add Widget'];
// Prototype app-icon tints: mail, photos, camera, clock, notes, music, settings, compass.
const DEMO_TILES = [COLORS.muted_teal, COLORS.muted_tan, COLORS.muted_grey, COLORS.muted_green, COLORS.muted_olive, COLORS.muted_rose, COLORS.muted_grey, COLORS.muted_teal];
const CLIP_MS = 12000;
// Android adds the widget through the launcher's own dialog, so the primary action does it directly.
const ANDROID = Platform.OS === 'android';

const Strong = ({ text }: { text: string }) => <CustomText text={text} weight={FONTS.medium} color={COLORS.sage_text} size={SIZES.sm} />;

// The approved Small widget, drawn in the app for the prompt preview (the real widget is SwiftUI).
function WidgetTile({ event, more, today }: { event: HomeEvent; more: number; today: string }) {
  const copy = widgetCopy(event, today);
  const accent = TONE_COLOR[copy.tone];
  return (
    <View style={styles.widget_tile}>
      <RowView gap={SIZES.padding / 4}>
        <Icons name={logo_mark} icon_height={SIZES.padding * 0.7} icon_width={SIZES.padding * 0.7} />
        <CustomText text="RENEWLESS" weight={FONTS.regular} color={COLORS.sage_label} size={SIZES.sm} letter_spacing={0.8} style={common_styles.flex_1} />
        <View style={[styles.widget_dot, { backgroundColor: accent }]} />
      </RowView>
      <RowView justify_content="space-between" style={styles.widget_eyebrow}>
        <CustomText text={copy.eyebrow} weight={FONTS.regular} color={accent} size={SIZES.sm} letter_spacing={1} />
        {more ? <CustomText text={`+${more}`} weight={FONTS.regular} color={COLORS.sage_soft} size={SIZES.sm} /> : null}
      </RowView>
      <RowView gap={SIZES.padding * 0.3} style={styles.widget_service}>
        <PlatformLogo platform_id={event.platform_id} size={SIZES.padding * 0.9} />
        <CustomText text={event.name} weight={FONTS.medium} color={COLORS.sage_text} size={SIZES.sm} letter_spacing={-0.3} number_of_lines={1} />
      </RowView>
      <CustomText mt={SIZES.padding * 0.35} text={copy.amount} weight={FONTS.medium} color={COLORS.sage_text} size={copy.amount.length > 12 ? SIZES.md : SIZES.h3} letter_spacing={-0.7} number_of_lines={1} />
      <CustomText mt={SIZES.padding / 4} text={copy.line} weight={FONTS.regular} color={COLORS.sage_soft} size={SIZES.sm} number_of_lines={1} />
    </View>
  );
}

// Looping how-to clip drawn in code (prototype keyframes): hold → + → search Renewless → Add Widget.
function HowToClip({ home }: { home: HomeController }) {
  const progress = useRef(new Animated.Value(home.reduce_motion ? 0.9 : 0)).current;
  useEffect(() => {
    if (home.reduce_motion) return;
    const loop = Animated.loop(Animated.timing(progress, { toValue: 1, duration: CLIP_MS, easing: Easing.linear, useNativeDriver: true }));
    loop.start();
    return () => loop.stop();
  }, [home.reduce_motion, progress]);

  const at = (input: number[], output: number[]) => progress.interpolate({ inputRange: input, outputRange: output, extrapolate: 'clamp' });
  const touch = at([0, 0.04, 0.08, 0.2, 0.24, 1], [0, 0, 1, 1, 0, 0]);
  const plus = at([0, 0.22, 0.26, 0.4, 0.44, 1], [0, 0, 1, 1, 0, 0]);
  const sheet = at([0, 0.4, 0.46, 0.72, 0.78, 1], [SIZES.padding * 8, SIZES.padding * 8, 0, 0, SIZES.padding * 8, SIZES.padding * 8]);
  const drop = at([0, 0.76, 0.82, 0.96, 1], [0, 0, 1, 1, 0]);
  const captions = [at([0, 0.24, 0.26, 1], [1, 1, 0, 0]), at([0, 0.24, 0.26, 0.42, 0.44, 1], [0, 0, 1, 1, 0, 0]), at([0, 0.44, 0.46, 0.6, 0.62, 1], [0, 0, 1, 1, 0, 0]), at([0, 0.6, 0.62, 1], [0, 0, 1, 1])];
  const event = home.widget_preview.event;

  return (
    <View>
      <View accessible accessibilityRole="image" accessibilityLabel="Short video: touch and hold the Home Screen, tap plus, search Renewless and tap Add Widget." style={styles.clip}>
        <View style={styles.clip_screen}>
          <RowView gap={0} style={styles.clip_grid}>
            {demo_app_icons.map((icon, index) => (
              <View key={icon} style={styles.clip_cell}>
                <View style={[styles.clip_app, { backgroundColor: DEMO_TILES[index] }]}>
                  <Icons name={icon} />
                </View>
              </View>
            ))}
          </RowView>
          <Animated.View style={[styles.clip_plus, { opacity: plus }]}>
            <CustomText text="+" color={COLORS.graphite} size={SIZES.lg} line_height={null} />
          </Animated.View>
          <Animated.View style={[styles.clip_touch, { opacity: touch, transform: [{ scale: at([0, 0.04, 0.08, 1], [0.6, 0.6, 1, 1]) }] }]} />
          {event ? (
            <Animated.View style={[styles.clip_drop, { opacity: drop, transform: [{ scale: at([0, 0.76, 0.82, 1], [0.37, 0.37, 0.62, 0.62]) }] }]}>
              <WidgetTile event={event} more={0} today={home.data!.today} />
            </Animated.View>
          ) : null}
          <Animated.View style={[styles.clip_sheet, { transform: [{ translateY: sheet }] }]}>
            <View style={styles.clip_search}>
              <CustomText text="Search Widgets" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.xs} />
            </View>
            <RowView gap={SIZES.padding * 0.35}>
              <View style={styles.clip_mark}>
                <Icons name={logo_mark} icon_height={SIZES.padding * 0.8} icon_width={SIZES.padding * 0.8} />
              </View>
              <CustomText text="Renewless" weight={FONTS.medium} color={COLORS.graphite} size={SIZES.xs} />
            </RowView>
            <View style={styles.clip_add}>
              <CustomText text="Add Widget" weight={FONTS.regular} color={COLORS.white} size={SIZES.xs} align="center" />
            </View>
          </Animated.View>
        </View>
        <View style={styles.clip_caption}>
          {CAPTIONS.map((caption, index) => (
            <Animated.View key={caption} style={[styles.clip_caption_text, { opacity: captions[index] }]}>
              <CustomText text={caption} weight={FONTS.regular} color={COLORS.sage_text} size={SIZES.sm} />
            </Animated.View>
          ))}
        </View>
      </View>
      <View style={styles.clip_track}>
        <Animated.View style={[styles.clip_bar, { transform: [{ scaleX: progress }] }]} />
      </View>
      <CustomText mt={SIZES.padding * 0.3} mb={SIZES.padding * 0.6} text="0:12 · Replays automatically" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.xs} align="right" />
    </View>
  );
}

// One-time Home prompt to place the Small widget, and its how-to clip.
export default function AddWidget({ home }: { home: HomeController }) {
  if (home.widget_prompt === 'closed' || !home.data) return null;
  if (home.widget_prompt === 'video') {
    return (
      <ConfirmDialog title="How to add the widget" close_label="Close video" onClose={home.closeWidgetVideo}>
        <SizedBox height={SIZES.padding * 0.7} />
        <HowToClip home={home} />
        <CustomButton variant="primary" text="Done" onPress={home.closeWidgetVideo} />
      </ConfirmDialog>
    );
  }
  const { event, more } = home.widget_preview;
  return (
    <ConfirmDialog title="Add Renewless to your Home Screen" close_label="Close" onClose={home.closeWidgetPrompt}>
      {event ? (
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.widget_preview}>
          <WidgetTile event={event} more={more} today={home.data.today} />
        </View>
      ) : null}
      <View style={styles.benefits}>
        {BENEFITS.map(benefit => (
          <RowView key={benefit} align_items="flex-start" gap={SIZES.padding3}>
            <Icons name={benefit_check_icon} />
            <CustomText text={benefit} weight={FONTS.regular} color={COLORS.sage_text} size={SIZES.sm} style={common_styles.flex_1} />
          </RowView>
        ))}
      </View>
      <View style={styles.steps}>
        {(ANDROID
          ? [<>1. Touch and hold an empty area of your Home Screen.</>, <>2. Tap <Strong text="Widgets" />, then find Renewless.</>, <>3. Drag the widget onto your Home Screen.</>]
          : [<>1. Touch and hold an empty area of your Home Screen.</>, <>2. Tap <Strong text="+" />, then search for Renewless.</>, <>3. Choose the widget and tap <Strong text="Add Widget" />.</>]
        ).map((step, index) => (
          <CustomText key={index} text={step} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} line_height={SIZES.padding * 1.1} />
        ))}
      </View>
      <RowView justify_content="center" gap={SIZES.padding * 0.35} accessibilityRole="button" onPress={home.openWidgetVideo} style={styles.watch}>
        <Icons name={play_circle_icon} />
        <CustomText text="Watch how to add it" weight={FONTS.regular} color={COLORS.primary} size={SIZES.md} />
      </RowView>
      <RowView gap={SIZES.padding * 0.6}>
        <CustomButton variant="secondary" text="Not now" onPress={home.closeWidgetPrompt} style={common_styles.flex_1} />
        <CustomButton variant="primary" text={ANDROID ? 'Add widget' : 'Got it'} onPress={ANDROID ? home.addWidget : home.closeWidgetPrompt} style={common_styles.flex_1} />
      </RowView>
    </ConfirmDialog>
  );
}
