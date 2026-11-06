import { ActivityIndicator, ScrollView, View } from 'react-native';
import { chevron_right_icon, gmail_logo } from '../../assets/icons';
import ConfirmDialog from '../../components/ConfirmDialog';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import Icons from '../../components/Icons';
import InfoTooltip from '../../components/InfoTooltip';
import RowView from '../../components/RowView';
import SizedBox from '../../components/SizedBox';
import StateView from '../../components/StateView';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import { common_styles } from '../../utils/common_styles';
import useConnectedInbox, { type ConnectedInboxController, type ConnectedInboxRoute } from './index.function';
import { styles } from './styles';

const PILL = {
  synced: { style: styles.pill_synced, color: COLORS.primary },
  syncing: { style: styles.pill_syncing, color: COLORS.trial },
  reconnect: { style: styles.pill_alert, color: COLORS.danger },
  error: { style: styles.pill_alert, color: COLORS.danger },
  paused: { style: styles.pill_paused, color: COLORS.renewing_soon },
};

function DisconnectDialog({ inbox }: { inbox: ConnectedInboxController }) {
  return (
    <ConfirmDialog title="Disconnect this inbox?" close_label="Close confirmation" onClose={inbox.closeConfirm} locked={inbox.disconnecting}>
      <CustomText mt={SIZES.padding * 0.7} text="Your saved subscriptions stay. We’ll stop reading this inbox." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      {inbox.disconnect_error ? <CustomText mt={SIZES.padding3} text={inbox.disconnect_error} weight={FONTS.regular} color={COLORS.expired} size={SIZES.sm} /> : null}
      <RowView gap={SIZES.padding * 0.45} mt={SIZES.padding * 0.7}>
        <CustomButton variant="secondary" text="Cancel" disabled={inbox.disconnecting} onPress={inbox.closeConfirm} style={common_styles.flex_1} />
        <CustomButton variant="danger" text="Disconnect" busy={inbox.disconnecting} onPress={inbox.confirmDisconnect} style={common_styles.flex_1} />
      </RowView>
    </ConfirmDialog>
  );
}

// Connected inbox: identity and live state, facts, Sync now (or Reconnect Gmail) and disconnect.
export default function ConnectedInboxScreen({ route }: { route: ConnectedInboxRoute }) {
  const inbox = useConnectedInbox(route);
  const view = inbox.view;
  const pill = PILL[inbox.state];
  const busy = inbox.syncing || inbox.reconnecting;

  return (
    <Container is_auth style={styles.main_view}>
      <Header title="Connected inbox" onBack={goBack} />
      {inbox.status !== 'ready' || !view ? (
        <StateView status={inbox.status === 'failed' ? 'failed' : 'loading'} message={inbox.status === 'failed' ? inbox.error : 'Loading inbox.'} onRetry={inbox.retry} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.identity}>
            <Icons name={gmail_logo} icon_height={SIZES.padding * 1.9} icon_width={SIZES.padding * 1.9} />
            <CustomText mt={SIZES.padding2} text={view.email} size={SIZES.lg} align="center" />
            <RowView gap={SIZES.padding * 0.3} accessibilityLiveRegion="polite" style={[styles.pill, pill.style]}>
              {inbox.syncing ? <ActivityIndicator size="small" color={COLORS.trial} /> : null}
              <CustomText text={inbox.status_label} weight={FONTS.regular} color={pill.color} size={SIZES.sm} />
            </RowView>
          </View>
          <View style={styles.facts}>
            <RowView justify_content="space-between" gap={SIZES.padding * 0.9} style={[styles.fact, styles.divider]}>
              <CustomText text="Last successful sync" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
              <CustomText text={inbox.last_sync} weight={FONTS.regular} size={SIZES.sm} />
            </RowView>
            <RowView justify_content="space-between" accessibilityRole="button" accessibilityLabel={`View ${view.imported_count} imported subscriptions`} onPress={inbox.openImported} style={[styles.fact, styles.divider]}>
              <CustomText text="Imported subscriptions" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
              <RowView gap={SIZES.padding / 2}>
                <CustomText text={String(view.imported_count)} weight={FONTS.regular} size={SIZES.sm} />
                <Icons name={chevron_right_icon} />
              </RowView>
            </RowView>
            <RowView justify_content="space-between" style={styles.fact}>
              <View style={common_styles.flex_1}>
                <InfoTooltip
                  label="Mailbox access"
                  paragraphs={[
                    'Gmail authorizes read-only access to this inbox. Renewless cannot send, edit or delete your emails.',
                    'Relevant receipt details are filtered and may be processed by AI to identify subscriptions. This does not mean Google limits access to receipts only.',
                    'You can disconnect at any time. Your saved subscriptions stay.',
                  ]}
                />
              </View>
              <CustomText text="Read-only" weight={FONTS.regular} size={SIZES.sm} />
            </RowView>
          </View>
          {(inbox.sync_error && !inbox.reconnect_needed) || inbox.reconnect_error ? (
            <View accessibilityRole="alert" style={styles.error_box}>
              <CustomText text={inbox.reconnect_error || inbox.sync_error} weight={FONTS.regular} color={COLORS.danger} size={SIZES.sm} />
            </View>
          ) : null}
          <View style={styles.sync}>
            <CustomText text={inbox.reconnect_needed ? 'Reconnect your inbox' : 'Keep everything up to date'} weight={FONTS.medium} size={SIZES.sm} />
            <CustomText
              mt={SIZES.padding2}
              text={inbox.reconnect_needed ? 'Gmail needs your permission again. Your saved subscriptions are still available.' : 'Check this inbox for new receipts and subscription updates.'}
              weight={FONTS.regular}
              color={COLORS.text_secondary}
              size={SIZES.sm}
            />
            <SizedBox height={SIZES.padding * 1.1} />
            <CustomButton variant="primary" text={inbox.reconnect_needed ? 'Reconnect Gmail' : inbox.syncing ? 'Syncing…' : 'Sync now'} busy={busy} onPress={inbox.runMain} />
          </View>
          <RowView accessibilityRole="button" disabled={busy} onPress={inbox.openConfirm} style={styles.disconnect}>
            <CustomText text="Disconnect inbox" weight={FONTS.regular} color={COLORS.danger} size={SIZES.sm} />
          </RowView>
          <CustomText mt={SIZES.padding / 2} text="Your saved subscriptions stay. Only new Gmail updates stop." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        </ScrollView>
      )}
      {inbox.confirm_open ? <DisconnectDialog inbox={inbox} /> : null}
    </Container>
  );
}
