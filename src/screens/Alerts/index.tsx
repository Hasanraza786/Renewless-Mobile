import { ScrollView, View } from 'react-native';
import { chevron_right_icon, gear_accent_icon, notice_bell_icon, platform_logos } from '../../assets/icons';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import Icons from '../../components/Icons';
import Mascot from '../../components/Mascot';
import RowView from '../../components/RowView';
import StateView from '../../components/StateView';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import { alertMessage, sentLabel } from '../../utils/alerts';
import { common_styles } from '../../utils/common_styles';
import useAlerts, { type AlertsController } from './index.function';
import { styles } from './styles';

function Banner({ alerts }: { alerts: AlertsController }) {
  const blocked = alerts.banner === 'blocked';
  return (
    <RowView align_items="flex-start" gap={SIZES.padding / 2} style={styles.banner}>
      <Icons name={notice_bell_icon} />
      <View style={common_styles.flex_1}>
        <CustomText text={blocked ? 'Notifications are off' : 'Push reminders are paused'} weight={FONTS.medium} size={SIZES.sm} />
        <CustomText mt={SIZES.padding * 0.15} text={blocked ? 'Allow notifications so reminders can reach you.' : 'Your saved reminders and history are still here.'} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        <RowView accessibilityRole="button" onPress={blocked ? alerts.openDeviceSettings : alerts.openSettings} style={styles.banner_action}>
          <CustomText text={blocked ? 'Open settings ↗\uFE0E' : 'Manage reminders ›'} weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
        </RowView>
      </View>
    </RowView>
  );
}

function Empty({ alerts }: { alerts: AlertsController }) {
  return (
    <View style={styles.empty}>
      <View style={styles.mascot_ring} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <Mascot expression="neutral" size={SIZES.padding * 5.65} label="Loop" />
      </View>
      <CustomText mt={SIZES.padding * 1.1} text="No alerts yet" size={SIZES.lg} align="center" accessibility_role="header" />
      <CustomText mt={SIZES.padding2} text="Your sent renewal and trial reminders will appear here." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" style={styles.empty_copy} />
      <RowView accessibilityRole="button" onPress={alerts.openSettings} style={styles.manage}>
        <Icons name={gear_accent_icon} />
        <CustomText text="Manage reminders" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
      </RowView>
    </View>
  );
}

// Alerts: Back + settings gear (no self-bell, no tabs); only reminders the server sent.
export default function AlertsScreen() {
  const alerts = useAlerts();

  return (
    <Container is_auth style={styles.main_view}>
      <Header title="Alerts" onBack={goBack} onSettings={alerts.openSettings} />
      {alerts.status !== 'ready' ? (
        <StateView status={alerts.status === 'failed' ? 'failed' : 'loading'} message={alerts.status === 'failed' ? alerts.error : 'Loop is checking your alerts…'} onRetry={alerts.retry} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <CustomText text={'Your renewal and trial reminders,\nin one place.'} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          {alerts.banner ? <Banner alerts={alerts} /> : null}
          {!alerts.groups.length ? (
            <Empty alerts={alerts} />
          ) : (
            <>
              {alerts.groups.map((group, index) => (
                <View key={group.title} style={index ? styles.group_next : styles.group} accessibilityLabel={group.title}>
                  <RowView style={styles.heading}>
                    <CustomText text={group.title} weight={FONTS.medium} color={COLORS.text_secondary} size={SIZES.lg} accessibility_role="header" />
                    <View style={styles.count}>
                      <CustomText text={String(group.alerts.length)} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
                    </View>
                  </RowView>
                  <View style={styles.card}>
                    {group.alerts.map((alert, row) => {
                      const logo = platform_logos[alert.platform_id];
                      const message = alertMessage(alert, alerts.today);
                      const sent = sentLabel(alert, alerts.today);
                      return (
                        <RowView
                          key={alert.id}
                          gap={SIZES.padding / 2}
                          accessibilityRole="button"
                          accessibilityLabel={`${alert.name}, ${message}, sent ${sent}`}
                          onPress={() => alerts.openAlert(alert)}
                          style={[styles.row, row < group.alerts.length - 1 && styles.divider]}>
                          <View style={styles.avatar}>{logo ? <Icons name={logo} /> : <CustomText text={alert.name.charAt(0)} size={SIZES.sm} />}</View>
                          <View style={common_styles.flex_1}>
                            <CustomText text={alert.name} weight={FONTS.medium} size={SIZES.lg} />
                            <CustomText mt={SIZES.padding * 0.15} text={message} weight={FONTS.regular} color={alert.kind === 'trial_end' ? COLORS.trial : COLORS.text_message} size={SIZES.sm} />
                            <CustomText mt={SIZES.padding * 0.15} text={sent} weight={FONTS.regular} color={COLORS.text_stamp} size={SIZES.sm} />
                          </View>
                          <Icons name={chevron_right_icon} />
                        </RowView>
                      );
                    })}
                  </View>
                </View>
              ))}
              <CustomText mt={SIZES.padding * 0.65} text="Only sent reminders appear here." weight={FONTS.regular} color={COLORS.text_dim} size={SIZES.sm} align="center" />
            </>
          )}
        </ScrollView>
      )}
    </Container>
  );
}
