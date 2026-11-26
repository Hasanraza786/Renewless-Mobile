import { Fragment, useEffect } from 'react';
import { AccessibilityInfo, View } from 'react-native';
import { arrow_right_icon, check_icon } from '../../../../assets/icons';
import AppSheet from '../../../../components/AppSheet';
import CustomButton from '../../../../components/CustomButton';
import CustomText from '../../../../components/CustomText';
import Icons from '../../../../components/Icons';
import OnboardingTitle from '../../../../components/OnboardingTitle';
import PlatformLogo from '../../../../components/PlatformLogo';
import RowView from '../../../../components/RowView';
import SizedBox from '../../../../components/SizedBox';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import { common_styles } from '../../../../utils/common_styles';
import { moneyLabel } from '../../../../utils/scan';
import { deepLine, deepPercent } from '../../../../utils/scan-progress';
import { RiderBar, ScanRadar, useTrickle } from '../Discovering';
import { styles as stage_styles } from '../Discovering/styles';
import { styles as result_styles } from '../YourSubscriptions/styles';
import type { OnboardingController } from '../../index.function';
import { styles } from './styles';

type Props = { onboarding: OnboardingController };

// Discovering · first results (Long scans, locked 24 Nov 2026): the quick check is done and older mail is still read on
// the server, so the user can review what was found or leave. Never a time estimate.
const SHOWN = 4;

// Tablets draw the compact radar beside the text, as the Studio does.
export function FirstResultsArt({ onboarding }: Props) {
  return <ScanRadar compact complete={!onboarding.older_running} reduce_motion={onboarding.reduce_motion} />;
}

export function FirstResultsBody({ onboarding }: Props) {
  const found = onboarding.candidates;
  const deep = onboarding.deep_view;
  const percent = deep ? deep.percent : deepPercent(onboarding.scan_meter?.deep ?? null);
  // Between reads the bar, Loop and numbers trickle on, so the screen never looks stuck.
  const trickle = useTrickle(percent, onboarding.reduce_motion);
  const live_line = deepLine(Math.max(deep?.checked ?? 0, Math.round(((deep?.total ?? 0) * trickle.percent) / 100)), deep?.total ?? 0, deep?.found ?? 0);

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility('Quick check done. Loop is checking the rest of your year on our servers and you can leave.');
  }, []);

  return (
    <Fragment>
      {onboarding.is_tablet ? null : <FirstResultsArt onboarding={onboarding} />}

      <OnboardingTitle eyebrow="FOUND SO FAR" title="Loop is still looking." title_spacing={-0.6} />

      <View style={stage_styles.stages}>
        <RowView gap={SIZES.padding * 0.7} style={styles.phase} accessibilityLabel={`Quick check, done. Checked ${onboarding.scan_meter?.messages ?? 0} billing emails`}>
          <View style={stage_styles.badge}>
            <Icons name={check_icon} />
          </View>
          <View style={common_styles.flex_1}>
            <CustomText text="Quick check" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
            <CustomText mt={SIZES.padding / 10} text={`Checked ${onboarding.scan_meter?.messages ?? 0} billing emails`} weight={FONTS.regular} color={COLORS.text_dim} size={SIZES.sm} />
          </View>
        </RowView>
        <RowView gap={SIZES.padding * 0.7} style={styles.phase}>
          <View style={[stage_styles.badge, stage_styles.badge_scanning]}>
            <CustomText text="02" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
          </View>
          <View style={common_styles.flex_1}>
            <CustomText text="Rest of your year" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            <CustomText mt={SIZES.padding / 10} text={`Checking the rest of your year · ${trickle.percent}%`} weight={FONTS.regular} color={COLORS.text_dim} size={SIZES.sm} />
            <RiderBar value={trickle.value} percent={trickle.percent} label="Checking the rest of your year" running={onboarding.older_running} reduce_motion={onboarding.reduce_motion} />
            {/* Always one line, its space kept from the start, so nothing below moves while numbers change. */}
            <CustomText mt={SIZES.padding / 5} text={live_line || ' '} weight={FONTS.regular} color={COLORS.text_dim} size={SIZES.xs} number_of_lines={1} fit_width />
          </View>
        </RowView>
      </View>

      <RowView align_items="stretch" justify_content="space-between" gap={0} style={result_styles.caption}>
        <CustomText text="FOUND SO FAR" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} letter_spacing={0.5} />
        <CustomText text={String(found.length)} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      </RowView>
      <View style={result_styles.results} accessibilityLabel="Subscriptions found so far">
        {found.slice(0, SHOWN).map((item, index) => {
          const line = item.usage ? `Usage-based · ${item.cycle}` : item.failing?.incomplete ? item.cycle : `${item.plan ? `${item.plan} · ` : ''}${moneyLabel(item)} · ${item.cycle}`;
          return (
            <RowView key={item.id} gap={SIZES.padding * 0.45} style={[styles.row, index < Math.min(found.length, SHOWN) - 1 && result_styles.row_divider]} accessibilityLabel={`${item.name}, ${line}`}>
              <View style={result_styles.logo_tile}>
                <PlatformLogo platform_id={item.platform_id} name={item.name} />
              </View>
              <View style={common_styles.flex_1}>
                <CustomText text={item.name} size={SIZES.sm} />
                <CustomText mt={SIZES.padding / 4} text={line} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
              </View>
            </RowView>
          );
        })}
        {found.length > SHOWN ? <CustomText text={`and ${found.length - SHOWN} more`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.xs} style={styles.more} /> : null}
      </View>
      <NotifySheet onboarding={onboarding} />
    </Fragment>
  );
}

export function FirstResultsFooter({ onboarding }: Props) {
  return (
    <Fragment>
      <SizedBox height={SIZES.padding / 2} />
      <CustomButton variant="primary" text="Review what we found" trailing_icon={arrow_right_icon} onPress={onboarding.reviewFound} />
      <SizedBox height={SIZES.padding * 0.4} />
      <CustomButton variant="outline" text="Keep looking in the background" onPress={onboarding.openNotify} />
    </Fragment>
  );
}

// Discovering · notify me: the one moment to ask for notifications, because the reason is clear.
function NotifySheet({ onboarding }: Props) {
  return (
    <AppSheet visible={onboarding.notify_open} title="Want a nudge when it’s done?" onClose={onboarding.closeNotify}>
      <CustomText text="Loop keeps reading your year even if you close the app. We’ll send one notification when it finishes, with what we found." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.md} />
      {onboarding.save_error ? <CustomText mt={SIZES.padding / 2} text={onboarding.save_error} weight={FONTS.regular} color={COLORS.danger} size={SIZES.sm} /> : null}
      <SizedBox height={SIZES.padding * 0.6} />
      <CustomButton variant="primary" text="Notify me" busy={onboarding.notify_busy} disabled={onboarding.notify_busy} onPress={() => onboarding.answerNotify(true)} />
      <SizedBox height={SIZES.padding * 0.4} />
      <CustomButton variant="outline" text="Not now" disabled={onboarding.notify_busy} onPress={() => onboarding.answerNotify(false)} />
    </AppSheet>
  );
}
