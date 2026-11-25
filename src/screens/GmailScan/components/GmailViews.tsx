import CurrencyTabs from '../../../components/CurrencyTabs';
import { Fragment } from 'react';
import { Pressable, View } from 'react-native';
import { check_dark_icon, edit_icon, inbox_badge_icon, offline_badge_icon } from '../../../assets/icons';
import AddChoiceLinks from '../../../components/AddChoiceLinks';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import PriceChange from '../../../components/PriceChange';
import Icons from '../../../components/Icons';
import OnboardingTitle from '../../../components/OnboardingTitle';
import PlatformLogo from '../../../components/PlatformLogo';
import RowView from '../../../components/RowView';
import SizedBox from '../../../components/SizedBox';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import type { GmailCandidate } from '../../../types';
import { common_styles } from '../../../utils/common_styles';
import { money } from '../../../utils/money';
import { FAILING_NOTE, USAGE_NOTE, dateLabel, failingLine } from '../../../utils/scan';
import { ScanRadar, ScanStages, ScanStatusLine } from '../../Onboarding/components/Discovering';
import { RecoveryArt } from '../../Onboarding/components/ScanRecovery';
import { styles as recovery_styles } from '../../Onboarding/components/ScanRecovery/styles';
import { SelectionRing } from '../../Onboarding/components/YourSubscriptions';
import { styles as result_styles } from '../../Onboarding/components/YourSubscriptions/styles';
import type { GmailScanController } from '../index.function';
import { styles } from '../styles';

type Props = { gmail: GmailScanController };

const STAGES = ['Finding receipts', 'Matching your subscriptions', 'Checking renewals & trials'];

export function Checkbox({ checked, disabled }: { checked: boolean; disabled?: boolean }) {
  return <View style={[styles.box, checked && styles.box_checked, disabled && styles.box_disabled]}>{checked ? <Icons name={check_dark_icon} /> : null}</View>;
}

// "Checking you@gmail.com Change" / "Found in you@gmail.com Change": the inbox, with the inbox picker.
function InboxLine({ gmail, prefix }: Props & { prefix: string }) {
  return (
    <RowView gap={SIZES.padding / 4} style={styles.inbox_line}>
      <CustomText text={`${prefix} ${gmail.inbox?.email ?? ''}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <Pressable accessibilityRole="button" accessibilityLabel="Change inbox" hitSlop={SIZES.padding2} onPress={gmail.openInboxes}>
        <CustomText text="Change" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
      </Pressable>
    </RowView>
  );
}

// Onboarding's Discovering, with the Gmail stages; the review opens by itself when the scan ends.
export function ScanningView({ gmail }: Props) {
  return (
    <Fragment>
      <ScanRadar complete={gmail.scan_done} reduce_motion={gmail.reduce_motion} />
      <OnboardingTitle eyebrow="YOUR INBOX, ORGANIZED" title="Finding what’s new." copy="Checking receipts for new subscriptions and changes to the ones you track." />
      <InboxLine gmail={gmail} prefix="Checking" />
      <ScanStages labels={STAGES} done_count={gmail.stage} running={!gmail.scan_done} progress={gmail.scan_progress} reduce_motion={gmail.reduce_motion} />
    </Fragment>
  );
}

export function ScanningFooter({ gmail }: Props) {
  return <ScanStatusLine text={gmail.scan_progress.status} />;
}

// Small notes under a section (PAYMENTS FAILING, USAGE BILLS).
function SectionNote({ text }: { text: string }) {
  return <CustomText mt={SIZES.padding * 0.4} text={text} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.xs} style={styles.section_note} />;
}

function Caption({ title, note }: { title: string; note: string }) {
  return (
    <RowView align_items="stretch" justify_content="space-between" gap={0} style={result_styles.caption}>
      <CustomText text={title} weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} letter_spacing={0.5} />
      <CustomText text={note} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
    </RowView>
  );
}

// Onboarding's result row: checkbox, logo tile, name and two lines, with the edit pencil opening the review sheet.
function CandidateRow({ gmail, item, last }: { gmail: GmailScanController; item: GmailCandidate; last: boolean }) {
  const value = gmail.view(item);
  const update = item.kind === 'update';
  const checked = gmail.selected.includes(item.id) && !item.saved;
  // A failing plan the server gave no price or cycle can't be ticked or edited.
  const incomplete = !!item.failing?.incomplete;
  const locked = item.saved || gmail.saving || incomplete;
  const change = update && item.old ? { from: `Price ${money(item.currency, item.old.price)}`, to: money(item.currency, item.price) } : null;
  const first = item.failing
    ? failingLine(item.failing)
    : change
      ? `${change.from} to ${change.to}`
      : `${value.trial ? 'Trial ends' : 'Renews'} ${value.trial ? dateLabel(value.trial.end_date) : value.next_date ? dateLabel(value.next_date) : 'Date not set'}`;
  const second = incomplete
    ? ''
    : update
      ? gmail.replace_date && item.next_date
        ? `Renews ${dateLabel(item.next_date)}`
        : 'Your saved renewal date is kept'
      : `${value.trial ? 'Then ' : ''}${money(value.currency, value.price)} · ${value.cycle}`;
  return (
    <RowView gap={0} style={!last && result_styles.row_divider}>
      <RowView
        gap={SIZES.padding * 0.45}
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled: locked }}
        accessibilityLabel={`Select ${item.name}${update ? ' update' : ''}, ${first}${second ? `, ${second}` : ''}`}
        disabled={locked}
        onPress={() => gmail.toggle(item.id)}
        style={result_styles.row_select}>
        <View style={[result_styles.checkbox, checked && result_styles.checkbox_checked]}>{checked ? <Icons name={check_dark_icon} /> : null}</View>
        <View style={result_styles.logo_tile}>
          <PlatformLogo platform_id={item.platform_id} name={item.name} />
        </View>
        <View style={common_styles.flex_1}>
          <CustomText text={item.name} size={SIZES.sm} />
          {change ? (
            <PriceChange mt={SIZES.padding / 4} from={change.from} to={change.to} color={COLORS.text_secondary} />
          ) : (
            <CustomText mt={SIZES.padding / 4} text={first} weight={FONTS.regular} color={item.failing ? COLORS.danger : COLORS.text_secondary} size={SIZES.sm} />
          )}
          {second ? <CustomText mt={SIZES.padding / 4} text={second} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} /> : null}
          {item.saved ? <CustomText mt={SIZES.padding / 4} text="Saved" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} /> : null}
        </View>
      </RowView>
      {item.saved || incomplete ? null : (
        <Pressable accessibilityRole="button" accessibilityLabel={`Edit ${item.name}`} disabled={gmail.saving} onPress={() => gmail.openCandidate(item)} style={result_styles.edit}>
          <Icons name={edit_icon} />
        </Pressable>
      )}
    </RowView>
  );
}

// USAGE BILLS: unticked, no edit pencil; the amount changes every bill.
function UsageRow({ gmail, item, last }: { gmail: GmailScanController; item: GmailScanController['usage'][number]; last: boolean }) {
  const checked = gmail.selected.includes(item.id) && !item.saved;
  const bill = item.last_charges[item.last_charges.length - 1];
  const first = bill ? `Usage-based · last bill ${money(bill.currency, bill.amount)}` : 'Usage-based';
  return (
    <RowView gap={0} style={!last && result_styles.row_divider}>
      <RowView
        gap={SIZES.padding * 0.45}
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled: item.saved || gmail.saving }}
        accessibilityLabel={`Select ${item.name}, ${first}, Amount changes with your usage`}
        disabled={item.saved || gmail.saving}
        onPress={() => gmail.toggle(item.id)}
        style={result_styles.row_select}>
        <View style={[result_styles.checkbox, checked && result_styles.checkbox_checked]}>{checked ? <Icons name={check_dark_icon} /> : null}</View>
        <View style={result_styles.logo_tile}>
          <PlatformLogo platform_id={item.platform_id} name={item.name} />
        </View>
        <View style={common_styles.flex_1}>
          <CustomText text={item.name} size={SIZES.sm} />
          <CustomText mt={SIZES.padding / 4} text={first} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          <CustomText mt={SIZES.padding / 4} text="Amount changes with your usage" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          {item.saved ? <CustomText mt={SIZES.padding / 4} text="Saved" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} /> : null}
        </View>
      </RowView>
    </RowView>
  );
}

const shortDay = (iso: string) => {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

// CHOOSE A SUBSCRIPTION: a payment that fits two tracked plans; Choose opens Which plan is this for?. It never counts
// in the ring, the total or the Add button.
function MatchRow({ gmail, entry, last }: { gmail: GmailScanController; entry: GmailScanController['needs_match'][number]; last: boolean }) {
  const pick = gmail.matches[entry.receipt_id];
  const plan = entry.options.find(option => option.subscription_id === pick);
  const status = pick === 'separate'
    ? `Saved as a separate ${entry.name} plan`
    : plan
      ? `Added to ${plan.plan ?? plan.name}${plan.next_date ? ` · renews ${shortDay(plan.next_date)}` : ''}`
      : `You track ${entry.options.length} ${entry.name} plans. Which one is this payment for?`;
  const title = `${entry.name} · ${money(entry.currency, entry.amount)} paid ${shortDay(entry.paid_date)}`;
  return (
    <RowView gap={SIZES.padding * 0.4} style={[styles.match_row, !last && result_styles.row_divider]}>
      <View style={result_styles.logo_tile}>
        <PlatformLogo platform_id={entry.platform_id} name={entry.name} />
      </View>
      <View style={common_styles.flex_1}>
        <CustomText text={title} size={SIZES.sm} />
        <CustomText mt={SIZES.padding / 4} text={status} weight={FONTS.regular} color={pick ? COLORS.primary : COLORS.text_secondary} size={SIZES.sm} />
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel={`${pick ? 'Change' : 'Choose'} the plan for ${title}`} hitSlop={SIZES.padding / 2} disabled={gmail.saving} onPress={() => gmail.openMatch(entry.receipt_id)} style={styles.choose}>
        <CustomText text={pick ? 'Change' : 'Choose'} weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
      </Pressable>
    </RowView>
  );
}

function Results({ gmail, items }: { gmail: GmailScanController; items: GmailCandidate[] }) {
  return (
    <View style={result_styles.results}>
      {items.map((item, index) => (
        <CandidateRow key={item.id} gmail={gmail} item={item} last={index === items.length - 1} />
      ))}
    </View>
  );
}

// Onboarding's Your subscriptions: title, inbox, the cost card with the selection ring, then the rows.
export function ReviewView({ gmail }: Props) {
  return (
    <Fragment>
      <SizedBox height={SIZES.padding3 / 2} />
      <OnboardingTitle eyebrow={gmail.eyebrow} title="A clearer" emphasis="picture." copy={gmail.intro} title_spacing={-0.5} />
      <InboxLine gmail={gmail} prefix="Found in" />

      <RowView gap={SIZES.padding2} style={result_styles.total}>
        <View style={common_styles.flex_1}>
          <CustomText text="Estimated monthly cost" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          {gmail.several_currencies ? (
            <>
              <SizedBox height={SIZES.padding3} />
              <CurrencyTabs currencies={gmail.currencies} selected={gmail.currency} onSelect={gmail.setCurrencyChoice}>
                <CustomText mt={SIZES.padding * 0.35} text={gmail.money} weight={FONTS.regular} size={SIZES.h3} />
              </CurrencyTabs>
            </>
          ) : (
            <CustomText mt={SIZES.padding * 0.35} text={gmail.money} weight={FONTS.regular} size={SIZES.h3} />
          )}
          <CustomText mt={SIZES.padding * 0.35} text="Free trials aren’t included in this total." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        </View>
        <SelectionRing selected={gmail.selected_count} total={gmail.open_count} />
      </RowView>

      {gmail.new_items.length ? (
        <>
          <Caption title="SUBSCRIPTIONS FOUND" note="Review before saving" />
          <Results gmail={gmail} items={gmail.new_items} />
        </>
      ) : null}
      {gmail.updates.length ? (
        <>
          <Caption title="UPDATES FOUND" note={String(gmail.updates.length)} />
          <Results gmail={gmail} items={gmail.updates} />
        </>
      ) : null}
      {gmail.failing.length ? (
        <>
          <Caption title="PAYMENTS FAILING" note={String(gmail.failing.length)} />
          <Results gmail={gmail} items={gmail.failing} />
          <SectionNote text={FAILING_NOTE} />
        </>
      ) : null}
      {gmail.needs_match.length ? (
        <>
          <Caption title="CHOOSE A SUBSCRIPTION" note={String(gmail.needs_match.length)} />
          <View style={result_styles.results}>
            {gmail.needs_match.map((entry, index) => (
              <MatchRow key={entry.receipt_id} gmail={gmail} entry={entry} last={index === gmail.needs_match.length - 1} />
            ))}
          </View>
        </>
      ) : null}
      {gmail.usage.length ? (
        <>
          <Caption title="USAGE BILLS" note={String(gmail.usage.length)} />
          <View style={result_styles.results}>
            {gmail.usage.map((item, index) => (
              <UsageRow key={item.id} gmail={gmail} item={item} last={index === gmail.usage.length - 1} />
            ))}
          </View>
          <SectionNote text={USAGE_NOTE} />
        </>
      ) : null}
      {gmail.duplicates.length ? (
        <>
          <Caption title="ALREADY TRACKED" note={String(gmail.duplicates.length)} />
          <View style={[result_styles.results, styles.tracked]}>
            {gmail.duplicates.map((item, index) => (
              <RowView key={item.id} gap={SIZES.padding * 0.45} style={[result_styles.row_select, index < gmail.duplicates.length - 1 && result_styles.row_divider]}>
                <View style={result_styles.logo_tile}>
                  <PlatformLogo platform_id={item.platform_id} name={item.name} />
                </View>
                <View style={common_styles.flex_1}>
                  <CustomText text={item.name} size={SIZES.sm} />
                  <CustomText mt={SIZES.padding / 4} text="Won’t be added again" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
                </View>
              </RowView>
            ))}
          </View>
        </>
      ) : null}
    </Fragment>
  );
}

export function ReviewFooter({ gmail }: Props) {
  return (
    <Fragment>
      {gmail.save_error ? (
        <View accessibilityRole="alert" style={result_styles.save_error}>
          <CustomText text={gmail.save_error} weight={FONTS.regular} size={SIZES.sm} />
        </View>
      ) : null}
      <SizedBox height={SIZES.padding * 1.1} />
      <CustomButton variant="primary" text={gmail.save_label} disabled={!gmail.selected_count || gmail.saving} busy={gmail.saving} onPress={gmail.save} />
      <SizedBox height={SIZES.padding / 2} />
      <AddChoiceLinks outlined onAi={gmail.addWithAi} onManual={gmail.addManually} />
    </Fragment>
  );
}

// Onboarding's no-results and interrupted layout: the sad Loop centred in its circle with a badge.
// Tablets show it beside the text, as in onboarding.
export function GmailRecoveryArt({ gmail }: Props) {
  return <RecoveryArt badge={gmail.phase === 'interrupted' ? offline_badge_icon : inbox_badge_icon} reduce_motion={gmail.reduce_motion} />;
}

export function RecoveryView({ gmail }: Props) {
  const interrupted = gmail.phase === 'interrupted';
  return (
    <Fragment>
      {gmail.is_tablet ? null : (
        <Fragment>
          <GmailRecoveryArt gmail={gmail} />
          <SizedBox height={SIZES.padding2 * 2} />
        </Fragment>
      )}
      <OnboardingTitle
        eyebrow={interrupted ? 'LET’S GET BACK ON TRACK' : 'YOU’RE UP TO DATE'}
        title={interrupted ? 'Your scan' : 'Nothing new'}
        emphasis={interrupted ? 'was interrupted.' : 'this time.'}
        copy={interrupted ? 'We couldn’t finish checking this inbox. Check your connection and try again.' : 'We didn’t find new subscriptions or changes in this inbox.'}
        align="center"
      />
      <CustomText mt={SIZES.padding3 * 2} text="Your saved subscriptions haven’t changed." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" style={recovery_styles.reassurance} />
    </Fragment>
  );
}

export function RecoveryFooter({ gmail }: Props) {
  const interrupted = gmail.phase === 'interrupted';
  return (
    <Fragment>
      <SizedBox height={SIZES.padding2} />
      <CustomButton variant="primary" text={interrupted ? 'Try again' : 'Try another inbox'} onPress={interrupted ? gmail.retry : gmail.openInboxes} />
      <SizedBox height={SIZES.padding / 2} />
      <CustomButton variant="outline" text="Add with AI" onPress={gmail.addWithAi} />
      <SizedBox height={SIZES.padding * 0.65} />
      <CustomButton variant="link" text="Add manually" onPress={gmail.addManually} />
    </Fragment>
  );
}
