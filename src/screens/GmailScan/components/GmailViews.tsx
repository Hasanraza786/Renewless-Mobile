import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Easing, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { check_dark_icon, chevron_down_icon, gmail_logo, loop_scanning, platform_logos } from '../../../assets/icons';
import CustomText from '../../../components/CustomText';
import Icons from '../../../components/Icons';
import Mascot from '../../../components/Mascot';
import RowView from '../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import type { GmailCandidate } from '../../../types';
import { common_styles } from '../../../utils/common_styles';
import { dateLabel } from '../../../utils/scan';
import type { GmailScanController } from '../index.function';
import { RING, styles } from '../styles';

type Props = { gmail: GmailScanController };

const STAGES = ['Finding subscription receipts', 'Matching your subscriptions', 'Checking renewals & trials'];

export function InboxSwitch({ gmail }: Props) {
  return (
    <RowView justify_content="space-between" accessibilityRole="button" accessibilityLabel={`Inbox ${gmail.inbox?.email ?? ''}. Change`} onPress={gmail.openInboxes} style={styles.inbox}>
      <RowView>
        <Icons name={gmail_logo} icon_height={SIZES.padding} icon_width={SIZES.padding} />
        <CustomText text={gmail.inbox?.email ?? ''} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      </RowView>
      <RowView gap={SIZES.padding / 4}>
        <CustomText text="Change" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        <Icons name={chevron_down_icon} />
      </RowView>
    </RowView>
  );
}

export function Checkbox({ checked, disabled }: { checked: boolean; disabled?: boolean }) {
  return <View style={[styles.box, checked && styles.box_checked, disabled && styles.box_disabled]}>{checked ? <Icons name={check_dark_icon} /> : null}</View>;
}

function Intro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <>
      <CustomText mt={SIZES.padding * 1.1} text={eyebrow} weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} letter_spacing={1.5} />
      <CustomText mt={SIZES.padding2} text={title} weight={FONTS.medium} size={SIZES.lg} letter_spacing={-1} accessibility_role="header" />
      <CustomText mt={SIZES.padding2} text={copy} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
    </>
  );
}

// Loop checks receipts inside the halo while a mint arc turns; on completion the happy Loop replaces it.
export function ScanningView({ gmail }: Props) {
  const spin = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (gmail.scan_done) return;
    const loop = Animated.loop(Animated.timing(spin, { toValue: 1, duration: 2400, easing: Easing.linear, useNativeDriver: true }));
    loop.start();
    return () => loop.stop();
  }, [gmail.scan_done, spin]);
  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const radius = RING / 2 - 1;

  return (
    <>
      <View style={styles.visual}>
        <Animated.View style={[common_styles.absolute, { transform: [{ rotate }] }]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <Svg width={RING} height={RING}>
            <Circle cx={RING / 2} cy={RING / 2} r={radius} stroke={COLORS.accent_border} strokeWidth={1} fill="none" />
            {gmail.scan_done ? null : <Circle cx={RING / 2} cy={RING / 2} r={radius} stroke={COLORS.primary} strokeWidth={1.5} fill="none" strokeDasharray={`${radius * 1.4} ${radius * 6}`} strokeLinecap="round" />}
          </Svg>
        </Animated.View>
        <View style={styles.halo} accessibilityLabel={gmail.scan_done ? 'Loop found your results' : 'Loop is checking your receipts'}>
          {gmail.scan_done ? <Mascot expression="happy" size={SIZES.padding * 6.95} label="Loop" /> : <Icons name={loop_scanning} icon_height={SIZES.padding * 5.15} icon_width={SIZES.padding * 5.15} />}
        </View>
      </View>
      <Intro eyebrow="YOUR INBOX, ORGANIZED" title="Finding what’s new." copy="We’re checking receipts for subscriptions and changes to the ones you track." />
      <View style={styles.steps} accessibilityLiveRegion="polite">
        {STAGES.map((label, index) => {
          const done = gmail.stage > index;
          const running = gmail.stage === index;
          return (
            <RowView key={label} gap={SIZES.padding * 0.55} accessibilityLabel={`${label}: ${done ? 'complete' : running ? 'in progress' : 'waiting'}`} style={styles.step}>
              <View style={[styles.step_mark, done && styles.step_done]}>
                {done ? <Icons name={check_dark_icon} /> : running ? <ActivityIndicator size="small" color={COLORS.primary} /> : <CustomText text="·" color={COLORS.text_waiting} size={SIZES.sm} line_height={null} />}
              </View>
              <CustomText text={label} weight={FONTS.regular} color={done || running ? COLORS.text_primary : COLORS.text_waiting} size={SIZES.sm} />
            </RowView>
          );
        })}
      </View>
      {gmail.scan_done ? <CustomText mt={SIZES.padding2} text="Your results are ready to review." weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} accessibility_role="text" /> : null}
    </>
  );
}

function CandidateRow({ gmail, item, last }: { gmail: GmailScanController; item: GmailCandidate; last: boolean }) {
  const value = gmail.view(item);
  const update = item.kind === 'update';
  const logo = platform_logos[item.platform_id];
  const checked = gmail.selected.includes(item.id) && !item.saved;
  const timing = value.trial ? `Trial ends ${dateLabel(value.trial.end_date)}` : value.next_date ? `Renews ${dateLabel(value.next_date)}` : 'Renewal date needed';
  return (
    <RowView align_items="center" gap={SIZES.padding * 0.45} style={[styles.row, !last && styles.divider]}>
      <RowView accessibilityRole="checkbox" accessibilityState={{ checked, disabled: item.saved }} accessibilityLabel={`Select ${item.name} ${update ? 'update' : item.plan ?? 'subscription'}`} disabled={item.saved} onPress={() => gmail.toggle(item.id)} hitSlop={SIZES.padding2}>
        <Checkbox checked={checked} disabled={item.saved} />
      </RowView>
      <View style={styles.avatar}>{logo ? <Icons name={logo} /> : <CustomText text={item.name.charAt(0)} size={SIZES.sm} />}</View>
      <View style={common_styles.flex_1}>
        <CustomText text={item.name} weight={FONTS.medium} size={SIZES.sm} />
        <CustomText mt={SIZES.padding / 4} text={update ? 'Price change found' : value.plan ?? value.cycle} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        {update && item.old ? (
          <>
            <CustomText
              mt={SIZES.padding / 4}
              text={
                <>
                  {`${item.currency} `}
                  <CustomText text={Number(item.old.price).toFixed(2)} weight={FONTS.regular} size={SIZES.sm} decoration="line-through" color={COLORS.text_secondary} line_height={null} />
                  {` → ${Number(item.price).toFixed(2)}`}
                </>
              }
              weight={FONTS.regular}
              size={SIZES.sm}
            />
            <CustomText mt={SIZES.padding / 4} text={gmail.replace_date && item.next_date ? `Renewal · ${dateLabel(item.next_date)}` : 'Your saved renewal date is kept.'} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          </>
        ) : (
          <CustomText mt={SIZES.padding / 4} text={timing} weight={FONTS.regular} color={value.trial ? COLORS.trial : COLORS.text_secondary} size={SIZES.sm} />
        )}
        {item.saved ? <CustomText mt={SIZES.padding / 4} text="Saved" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} /> : null}
      </View>
      <View style={styles.end}>
        {update ? null : (
          <>
            <CustomText text={`${value.currency} ${Number(value.price).toFixed(2)}`} weight={FONTS.medium} size={SIZES.sm} />
            <CustomText mt={SIZES.padding / 4} text={`${value.trial ? 'After trial · ' : ''}${value.cycle}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="right" />
          </>
        )}
        {item.saved ? null : (
          <RowView accessibilityRole="button" accessibilityLabel={`Review ${item.name} ${update ? 'changes' : 'details'}`} onPress={() => gmail.openCandidate(item)} style={styles.review_link}>
            <CustomText text={update ? 'Review changes ›' : 'Review ›'} weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
          </RowView>
        )}
      </View>
    </RowView>
  );
}

function Section({ gmail, title, items }: { gmail: GmailScanController; title: string; items: GmailCandidate[] }) {
  if (!items.length) return null;
  return (
    <View style={styles.section}>
      <RowView>
        <CustomText text={title} weight={FONTS.medium} size={SIZES.lg} accessibility_role="header" />
        <View style={styles.count_badge}>
          <CustomText text={String(items.length)} weight={FONTS.medium} color={COLORS.text_secondary} size={SIZES.sm} />
        </View>
      </RowView>
      <View style={styles.list}>
        {items.map((item, index) => (
          <CandidateRow key={item.id} gmail={gmail} item={item} last={index === items.length - 1} />
        ))}
      </View>
    </View>
  );
}

export function ReviewView({ gmail }: Props) {
  const [show_tracked, setShowTracked] = useState(false);
  return (
    <>
      <Intro eyebrow="NEW SUBSCRIPTIONS & UPDATES" title="A clearer picture." copy="Choose what to add and which changes to keep." />
      <RowView gap={SIZES.padding * 0.9} style={styles.summary}>
        <View style={styles.summary_count}>
          <CustomText text="Selected" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          <CustomText mt={SIZES.padding * 0.3} text={String(gmail.selected_count)} weight={FONTS.medium} color={COLORS.primary} size={SIZES.h3} align="center" />
        </View>
        <View style={common_styles.flex_1}>
          <CustomText text="New plans · monthly equivalent" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          <CustomText mt={SIZES.padding * 0.3} text={gmail.money} weight={FONTS.medium} size={SIZES.h3} letter_spacing={-0.5} />
          <CustomText mt={SIZES.padding * 0.3} text="Trial prices apply after the trial." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        </View>
      </RowView>
      <Section gmail={gmail} title="New subscriptions" items={gmail.new_items} />
      <Section gmail={gmail} title="Updates found" items={gmail.updates} />
      {gmail.duplicates.length ? (
        <>
          <RowView accessibilityRole="button" accessibilityState={{ expanded: show_tracked }} onPress={() => setShowTracked(current => !current)} style={styles.duplicates}>
            <CustomText text={`${show_tracked ? '▾' : '▸'} ${gmail.duplicates.length} already tracked`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          </RowView>
          {show_tracked
            ? gmail.duplicates.map(item => (
                <RowView key={item.id} gap={SIZES.padding / 2} style={styles.duplicate_row}>
                  <View style={styles.avatar}>{platform_logos[item.platform_id] ? <Icons name={platform_logos[item.platform_id]} /> : null}</View>
                  <View style={common_styles.flex_1}>
                    <CustomText text={item.name} weight={FONTS.medium} size={SIZES.sm} />
                    <CustomText mt={SIZES.padding / 5} text="Already tracked · won’t be added again" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
                  </View>
                  <CustomText text="✓" color={COLORS.primary} size={SIZES.sm} />
                </RowView>
              ))
            : null}
        </>
      ) : null}
      <CustomText mt={SIZES.padding} text="Matching payment receipts update your payment history automatically." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      {gmail.save_error ? <CustomText mt={SIZES.padding2} text={gmail.save_error} weight={FONTS.regular} color={COLORS.expired} size={SIZES.sm} accessibility_role="alert" /> : null}
    </>
  );
}

// No new results and interrupted share one recovery layout; neither claims the account has no subscriptions.
export function RecoveryView({ gmail }: Props) {
  const interrupted = gmail.phase === 'interrupted';
  return (
    <>
      <View style={styles.recovery_visual}>
        <View style={[styles.halo, styles.halo_large]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <Mascot expression={interrupted ? 'sad' : 'neutral'} size={SIZES.padding * 7.35} label="Loop" />
        </View>
      </View>
      <Intro
        eyebrow={interrupted ? 'LET’S TRY AGAIN' : 'YOU’RE UP TO DATE'}
        title={interrupted ? 'Your scan was interrupted.' : 'No new subscriptions found.'}
        copy={interrupted ? 'We couldn’t finish checking this inbox. Try again when your connection is ready.' : 'We didn’t find any new subscriptions or changes in this inbox.'}
      />
      <CustomText mt={SIZES.padding2} text="Your saved subscriptions haven’t changed." weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
      <RowView accessibilityRole="button" onPress={interrupted ? gmail.openInboxes : gmail.addManually} style={styles.link}>
        <CustomText text={interrupted ? 'Choose another inbox ›' : 'Add manually ›'} weight={FONTS.regular} size={SIZES.md} />
      </RowView>
    </>
  );
}
