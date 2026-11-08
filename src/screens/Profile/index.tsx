import { Pressable, ScrollView, View } from 'react-native';
import { chevron_right_icon, edit_box_icon, gmail_logo, help_icon, history_icon, logout_icon, mail_icon, payments_icon, settings_icon } from '../../assets/icons';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import Icons from '../../components/Icons';
import MenuGroup from '../../components/MenuGroup';
import RowView from '../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { common_styles } from '../../utils/common_styles';
import ProfileDialogs from './components/ProfileDialogs';
import useProfile, { PROVIDER_LABEL, initials } from './index.function';
import { styles } from './styles';

const APP_VERSION = '0.0.1';

function DangerButton({ label, icon, onPress }: { label: string; icon: string; onPress: () => void }) {
  return (
    <RowView accessibilityRole="button" accessibilityLabel={label} justify_content="center" onPress={onPress} style={styles.danger_button}>
      <Icons name={icon} />
      <CustomText text={label} weight={FONTS.regular} color={COLORS.danger} size={SIZES.sm} />
    </RowView>
  );
}

const syncDate = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

export default function ProfileScreen() {
  const profile = useProfile();
  const { user, inbox } = profile;

  return (
    <Container tab_bar style={styles.main_view}>
      <Header title="Profile" onAppSettings={profile.openSettings} />
      {/* scrollableAxes: the floating tab bar inset at the bottom, no second top inset under the fixed header. */}
      <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="scrollableAxes" contentContainerStyle={styles.content}>
        {user ? (
          <RowView gap={SIZES.padding * 0.55}>
            <View style={styles.avatar} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
              <CustomText text={initials(user.name)} color={COLORS.primary} size={SIZES.lg} line_height={null} />
            </View>
            <View style={common_styles.flex_1}>
              <CustomText text={user.name} size={SIZES.lg} accessibility_role="header" />
              <CustomText mt={SIZES.padding / 4} text={user.email} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
              <CustomText mt={SIZES.padding / 5} text={`Signed in with ${PROVIDER_LABEL[user.provider]}`} weight={FONTS.regular} color={COLORS.text_dim} size={SIZES.sm} />
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel="Edit profile" onPress={profile.openEdit}>
              <Icons name={edit_box_icon} />
            </Pressable>
          </RowView>
        ) : null}

        <View style={styles.inboxes}>
          <RowView justify_content="space-between" style={inbox && styles.inbox_heading}>
            <CustomText text="Connected inboxes" color={COLORS.text_secondary} size={SIZES.lg} accessibility_role="header" />
            {inbox ? (
              <Pressable accessibilityRole="button" accessibilityLabel="Connect another Gmail inbox" hitSlop={SIZES.padding3} onPress={profile.openConnect}>
                <CustomText text="+ Connect" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
              </Pressable>
            ) : null}
          </RowView>
          {!profile.inboxes_ready ? null : inbox ? (
            <RowView accessibilityRole="button" accessibilityLabel={`${inbox.email}, ${inbox.status === 'synced' ? 'Synced' : inbox.status === 'reconnect' ? 'Reconnect needed' : 'Updates paused'}`} gap={SIZES.padding / 2} onPress={profile.openInbox} style={styles.inbox_row}>
              <View style={styles.inbox_logo}>
                <Icons name={gmail_logo} icon_height={SIZES.padding * 1.15} icon_width={SIZES.padding * 1.15} />
              </View>
              <View style={common_styles.flex_1}>
                <CustomText text={inbox.email} size={SIZES.sm} number_of_lines={1} />
                <RowView gap={SIZES.padding / 5} mt={SIZES.padding * 0.35}>
                  <View style={[styles.dot, inbox.status !== 'synced' && styles.dot_paused]} />
                  <CustomText
                    text={inbox.status === 'synced' ? 'Synced' : inbox.status === 'reconnect' ? 'Reconnect needed' : 'Updates paused'}
                    weight={FONTS.regular}
                    color={inbox.status === 'synced' ? COLORS.primary : COLORS.renewing_soon}
                    size={SIZES.sm}
                  />
                  {inbox.lastSync ? <CustomText text={`· Last sync ${syncDate(inbox.lastSync)}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} /> : null}
                </RowView>
              </View>
              <Icons name={chevron_right_icon} />
            </RowView>
          ) : (
            <RowView gap={SIZES.padding / 2} style={styles.no_inbox}>
              <Icons name={mail_icon} />
              <View style={common_styles.flex_1}>
                <CustomText text="No inbox connected" size={SIZES.sm} />
                <CustomText mt={SIZES.padding / 4} text="Find subscriptions and keep them up to date." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
              </View>
              <Pressable accessibilityRole="button" onPress={profile.openConnect} style={styles.connect}>
                <CustomText text="Connect" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
              </Pressable>
            </RowView>
          )}
        </View>

        <MenuGroup
          title="Your activity"
          items={[
            { label: 'History', icon: history_icon, subtitle: 'Cancelled & expired subscriptions', onPress: profile.openHistory },
            { label: 'Payment history', icon: payments_icon, subtitle: profile.payment_text, onPress: profile.openPayments },
          ]}
        />
        <MenuGroup
          title="More"
          items={[
            { label: 'Settings', icon: settings_icon, subtitle: 'Reminders, AI assistant, account', onPress: profile.openSettings },
            { label: 'Help & support', icon: help_icon, onPress: profile.showSupport },
          ]}
        />

        <DangerButton label="Log out" icon={logout_icon} onPress={() => profile.setDialog('logout')} />
        <CustomText mt={SIZES.padding * 0.65} text={`Renewless · Version ${APP_VERSION}`} weight={FONTS.regular} color={COLORS.text_faint} size={SIZES.sm} align="center" />
      </ScrollView>
      <ProfileDialogs profile={profile} />
    </Container>
  );
}
