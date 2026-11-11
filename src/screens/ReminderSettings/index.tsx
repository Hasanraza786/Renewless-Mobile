import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { check_dark_icon, device_bell_icon, switch_off_icon, switch_on_icon } from '../../assets/icons';
import ConfirmDialog from '../../components/ConfirmDialog';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import DateField from '../../components/DateField';
import Dropdown from '../../components/Dropdown';
import Header from '../../components/Header';
import Icons from '../../components/Icons';
import InputField from '../../components/InputField';
import RowView from '../../components/RowView';
import SizedBox from '../../components/SizedBox';
import StateView from '../../components/StateView';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import { ACCOUNT_REMINDER_ITEMS } from '../../utils/alerts';
import { common_styles } from '../../utils/common_styles';
import useReminderSettings, { SCOPES, type ReminderSettingsController } from './index.function';
import { useKeyboardScroll } from '../../utils/keyboard-scroll';
import { styles } from './styles';

const DEVICE = {
  allowed: { text: 'Allowed on this device', action: 'Manage ↗\uFE0E', action_label: 'Open device notification settings' },
  blocked: { text: 'Off · permission needed', action: 'Enable ↗\uFE0E', action_label: 'Open device notification settings' },
  // Not asked yet: Enable shows the system permission prompt, not Settings.
  not_asked: { text: 'Not allowed yet', action: 'Enable ↗\uFE0E', action_label: 'Allow notifications' },
  unavailable: { text: 'Not available on this device', action: '', action_label: '' },
};

function Toggle({ label, copy, value, disabled, divider, onPress }: { label: string; copy: string; value: boolean; disabled?: boolean; divider?: boolean; onPress: () => void }) {
  return (
    <RowView
      justify_content="space-between"
      gap={SIZES.padding2}
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value, disabled }}
      // Always a Pressable, so a disabled switch stays one element for VoiceOver.
      disabled={disabled}
      onPress={onPress}
      style={[styles.toggle, divider && styles.divider, disabled && styles.disabled]}>
      <View style={common_styles.flex_1}>
        <CustomText text={label} weight={FONTS.medium} size={SIZES.sm} />
        <CustomText mt={SIZES.padding / 4} text={copy} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      </View>
      <Icons name={value ? switch_on_icon : switch_off_icon} />
    </RowView>
  );
}

function SectionLabel({ text }: { text: string }) {
  return <CustomText mt={SIZES.padding * 0.95} mb={SIZES.padding * 0.45} text={text} weight={FONTS.medium} color={COLORS.text_secondary} size={SIZES.sm} letter_spacing={0.6} accessibility_role="header" />;
}

function ApplyDialog({ settings }: { settings: ReminderSettingsController }) {
  const confirm = settings.confirm!;
  return (
    <ConfirmDialog title="Update existing reminders?" close_label="Close apply reminders" onClose={settings.closeConfirm} locked={settings.saving}>
      <CustomText mt={SIZES.padding * 0.7} text="Use your new default timing for the subscriptions below. Dates that have passed won’t send a late reminder." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <RowView align_items="flex-start" gap={SIZES.padding / 2} mt={SIZES.padding * 0.7} accessibilityRole="checkbox" accessibilityState={{ checked: confirm.keep_custom }} onPress={settings.toggleKeepCustom}>
        <View style={[styles.box, confirm.keep_custom && styles.box_checked]}>{confirm.keep_custom ? <Icons name={check_dark_icon} /> : null}</View>
        <View style={common_styles.flex_1}>
          <CustomText text="Keep custom reminders" weight={FONTS.regular} size={SIZES.sm} />
          <CustomText mt={SIZES.padding / 5} text="Preserve settings changed on individual subscriptions." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        </View>
      </RowView>
      <CustomText mt={SIZES.padding * 0.7} text={confirm.count === null ? 'Checking subscriptions…' : `${confirm.count} subscription${confirm.count === 1 ? '' : 's'} will update`} weight={FONTS.regular} size={SIZES.sm} />
      {settings.save_error ? <CustomText mt={SIZES.padding3} text={settings.save_error} weight={FONTS.regular} color={COLORS.expired} size={SIZES.sm} /> : null}
      <RowView gap={SIZES.padding * 0.45} mt={SIZES.padding * 0.7}>
        <CustomButton variant="secondary" text="Go back" disabled={settings.saving} onPress={settings.closeConfirm} style={common_styles.flex_1} />
        <CustomButton variant="primary" text="Update reminders" busy={settings.saving} onPress={settings.confirmApply} style={common_styles.flex_1} />
      </RowView>
    </ConfirmDialog>
  );
}

// Account reminder defaults; the master switch pauses everything without erasing schedules or history.
export default function ReminderSettingsScreen() {
  const settings = useReminderSettings();
  // The keyboard offset is measured from the safe area, below the status bar.
  const insets = useSafeAreaInsets();
  const keyboard = useKeyboardScroll();
  const draft = settings.draft;
  const off = !!draft && !draft.push_enabled;
  const device = settings.device ? DEVICE[settings.device] : null;

  return (
    <Container is_auth style={styles.main_view}>
      <Header title="Reminder settings" onBack={goBack} />
      {settings.status !== 'ready' || !draft ? (
        <StateView status={settings.status === 'failed' ? 'failed' : 'loading'} message={settings.status === 'failed' ? settings.load_error : 'Loop is getting your reminder settings…'} onRetry={settings.retry} />
      ) : (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={insets.top} style={common_styles.flex_1}>
          <ScrollView ref={keyboard.scroll_ref} onScroll={keyboard.onScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" contentContainerStyle={styles.content}>
            <CustomText text="A little heads-up, on your terms." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            <View style={[styles.group, styles.first_group]}>
              <Toggle label="Push reminders" copy="Pause or resume all push reminders." value={draft.push_enabled} onPress={() => settings.update('push_enabled', !draft.push_enabled)} />
            </View>
            <SectionLabel text="WHAT TO REMIND YOU ABOUT" />
            <View style={styles.group}>
              <Toggle label="Renewals" copy="Before your next subscription charge." value={draft.renewals} disabled={off} divider onPress={() => settings.update('renewals', !draft.renewals)} />
              <Toggle label="Trials ending" copy="Before a free trial comes to an end." value={draft.trials} disabled={off} onPress={() => settings.update('trials', !draft.trials)} />
            </View>
            <SectionLabel text="YOUR DEFAULTS" />
            <View pointerEvents={off ? 'none' : 'auto'} style={[styles.group, styles.defaults, off && styles.disabled]}>
              <Dropdown multiple disabled={off} label="Remind me" values={draft.values} items={ACCOUNT_REMINDER_ITEMS} display={settings.display} onToggle={settings.toggleValue} />
              {draft.values.includes('custom') ? (
                <>
                  <SizedBox height={SIZES.padding * 0.65} />
                  <InputField ref={settings.custom_ref} variant="form" label="Days before the event" value={draft.custom} editable={!off} onChangeText={settings.updateCustom} keyboardType="number-pad" error={settings.custom_error || undefined} />
                </>
              ) : null}
              <SizedBox height={SIZES.padding * 0.65} />
              <DateField variant="form" mode="time" disabled={off} label="Reminder time" value={draft.time} onChange={value => settings.update('time', value)} />
              <CustomText mt={SIZES.padding * 0.35} text={`Local time · ${settings.timezone}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
              <SizedBox height={SIZES.padding * 0.6} />
              <Dropdown disabled={off} label="Apply default timing to" value={draft.scope} options={SCOPES} onChange={value => settings.update('scope', value)} />
              <CustomText mt={SIZES.padding / 2} text="Custom subscription reminders stay as you set them." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            </View>
            {device ? (
              <RowView gap={SIZES.padding / 2} style={styles.device}>
                <Icons name={device_bell_icon} />
                <View style={common_styles.flex_1}>
                  <CustomText text="Device notifications" weight={FONTS.medium} size={SIZES.sm} />
                  <CustomText mt={SIZES.padding / 4} text={device.text} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
                </View>
                {device.action ? (
                  <RowView accessibilityRole="button" accessibilityLabel={device.action_label} onPress={settings.openDevice} style={styles.device_action}>
                    <CustomText text={device.action} weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
                  </RowView>
                ) : null}
              </RowView>
            ) : null}
            {settings.save_error && !settings.confirm ? <CustomText mt={SIZES.padding2} text={settings.save_error} weight={FONTS.regular} color={COLORS.expired} size={SIZES.sm} accessibility_role="alert" /> : null}
          </ScrollView>
          <View style={styles.footer}>
            <CustomButton variant="primary" text="Save settings" busy={settings.saving && !settings.confirm} onPress={settings.onSave} />
            <CustomText mt={SIZES.padding3} text="Applies to future reminders. Your history stays." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
          </View>
        </KeyboardAvoidingView>
      )}
      {settings.confirm ? <ApplyDialog settings={settings} /> : null}
    </Container>
  );
}
