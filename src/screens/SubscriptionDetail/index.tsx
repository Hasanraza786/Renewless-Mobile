import { Pressable, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { find_grey_icon, platform_logos } from '../../assets/icons';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import Icons from '../../components/Icons';
import RowView from '../../components/RowView';
import SizedBox from '../../components/SizedBox';
import StateView from '../../components/StateView';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import type { AppStackParamList } from '../../types';
import { common_styles } from '../../utils/common_styles';
import DetailSheets from './components/DetailSheets';
import useSubscriptionDetail, { type DetailView } from './index.function';
import { styles } from './styles';

type Props = Pick<NativeStackScreenProps<AppStackParamList, 'SubscriptionDetail'>, 'route'>;

function Field({ label, value, onPress }: { label: string; value: string; onPress?: () => void }) {
  return (
    <RowView justify_content="space-between" align_items="flex-start" gap={SIZES.padding * 0.9} style={styles.field}>
      <CustomText text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} style={common_styles.flex_1} />
      {onPress ? (
        <Pressable accessibilityRole="button" accessibilityLabel={`${label}, ${value}`} hitSlop={SIZES.padding2} onPress={onPress}>
          <CustomText text={`${value} ›`} weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
        </Pressable>
      ) : (
        <CustomText text={value} weight={FONTS.regular} size={SIZES.sm} align="right" style={styles.field_value} />
      )}
    </RowView>
  );
}

function Badge({ text, color, fill }: { text: string; color: string; fill: string }) {
  return (
    <View style={[styles.badge, { backgroundColor: fill }]}>
      <CustomText text={text} weight={FONTS.regular} color={color} size={SIZES.sm} />
    </View>
  );
}

function LinkCard({ title, caption, trailing, onPress }: { title: string; caption: string; trailing: string; onPress: () => void }) {
  return (
    <RowView gap={SIZES.padding2} accessibilityRole="button" accessibilityLabel={`${title}, ${caption}`} onPress={onPress} style={styles.link_card}>
      <View style={common_styles.flex_1}>
        <CustomText text={title} weight={FONTS.regular} size={SIZES.sm} />
        <CustomText mt={SIZES.padding * 0.3} text={caption} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      </View>
      <CustomText text={trailing} weight={FONTS.regular} color={trailing === '›' ? COLORS.text_primary : COLORS.primary} size={SIZES.sm} />
    </RowView>
  );
}

function Body({ view, detail }: { view: DetailView; detail: ReturnType<typeof useSubscriptionDetail> }) {
  const { record } = view;
  const logo = platform_logos[record.platform_id];
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      {detail.message ? (
        <View accessibilityRole="alert" style={styles.message}>
          <CustomText text={detail.message} weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
        </View>
      ) : null}

      <View style={styles.overview}>
        <RowView gap={SIZES.padding / 2}>
          <View style={styles.avatar}>{logo ? <Icons name={logo} /> : <CustomText text={record.name.charAt(0)} size={SIZES.lg} />}</View>
          <View style={common_styles.flex_1}>
            <CustomText text={record.plan ? `${record.name} · ${record.plan}` : record.name} size={SIZES.lg} />
            <CustomText mt={SIZES.padding * 0.35} text={record.category} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          </View>
          <Badge text={view.status.label} color={view.status.color} fill={view.status.fill} />
        </RowView>
        <RowView align_items="baseline" gap={SIZES.padding * 0.45} style={styles.cost}>
          <CustomText
            size={SIZES.h3}
            letter_spacing={-0.6}
            text={
              <>
                <CustomText text={`${view.cost.currency} `} color={COLORS.text_secondary} size={SIZES.sm} line_height={null} />
                {view.cost.amount}
              </>
            }
          />
          <CustomText text={view.cost.caption} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        </RowView>
        <RowView justify_content="space-between" gap={SIZES.padding2} style={styles.next_event}>
          <CustomText text={view.event.label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          <CustomText text={view.event.value} size={SIZES.sm} align="right" style={common_styles.flex_1} />
        </RowView>
      </View>

      <View style={styles.panel}>
        <CustomText text={view.billing_title} color={COLORS.text_secondary} size={SIZES.lg} mb={SIZES.padding / 4} />
        <Field label="Billing cycle" value={record.cycle} />
        {view.trial_end ? <Field label="Trial ends" value={view.trial_end} /> : null}
        <Field label="Auto-renew tracking" value={view.auto_renew} />
        <Field label="Reminder" value={view.reminder.text} onPress={view.reminder.actionable ? () => detail.setSheet('reminder') : undefined} />
        {view.estimated_note ? <CustomText mt={SIZES.padding3} text="Estimated date. You can update it in Edit." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} /> : null}
        <CustomText mt={SIZES.padding3} text="Tracking doesn’t confirm a charge or change your service settings." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      </View>

      <View style={styles.panel}>
        <RowView justify_content="space-between">
          <CustomText text="Your spending" size={SIZES.lg} />
          <Pressable accessibilityRole="button" onPress={detail.openPayments} style={styles.inline_link}>
            <CustomText text="View payments ›" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
          </Pressable>
        </RowView>
        <CustomText mt={SIZES.padding * 0.9} text="Total recorded payments" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        <CustomText mt={SIZES.padding / 2} text={view.receipts.total} size={SIZES.h3} />
        <CustomText mt={SIZES.padding2} text={view.receipts.caption} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        <SizedBox height={SIZES.padding2} />
        <Field label="Subscription since" value={view.since} />
        <Field label={view.annual_label} value={view.annual_value} />
        <CustomText mt={SIZES.padding2} text="Recorded history may be incomplete. Estimates aren’t payments." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      </View>

      <LinkCard title="Price history" caption={view.price_history} trailing="›" onPress={detail.openPriceHistory} />

      <View style={styles.panel}>
        <RowView justify_content="space-between">
          <CustomText text={view.source.title} color={COLORS.text_secondary} size={SIZES.lg} />
          <Badge text={view.source.badge} color={COLORS.primary} fill={COLORS.accent_line} />
        </RowView>
        <CustomText mt={SIZES.padding / 2} text={record.source.email} weight={FONTS.regular} size={SIZES.sm} />
        <CustomText mt={SIZES.padding / 4} text={view.source.caption} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
        {record.inbox ? (
          <RowView align_items="flex-start" gap={SIZES.padding3} style={styles.sync}>
            <Icons name={find_grey_icon} icon_height={SIZES.padding * 0.9} icon_width={SIZES.padding * 0.9} />
            <View style={common_styles.flex_1}>
              <CustomText text={`Receipt inbox · ${record.inbox.email}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
              <CustomText
                mt={SIZES.padding / 4}
                text={record.inbox.disconnected ? 'Disconnected · no longer read' : `Last successful sync · ${new Date(record.inbox.last_sync).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} · ${new Date(record.inbox.last_sync).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`}
                weight={FONTS.regular}
                color={COLORS.text_secondary}
                size={SIZES.sm}
              />
            </View>
          </RowView>
        ) : null}
      </View>

      {record.manage_url ? (
        <RowView gap={SIZES.padding / 2} accessibilityRole="link" accessibilityLabel={`Manage on ${record.name}, opens the service’s website`} onPress={detail.openManage} style={styles.manage}>
          <View style={common_styles.flex_1}>
            <CustomText text={`Manage on ${record.name}`} weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
            <CustomText mt={SIZES.padding / 5} text="Opens the service’s website" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          </View>
          {/* \uFE0E keeps the arrow a text glyph instead of iOS's emoji. */}
          <CustomText text={'↗\uFE0E'} weight={FONTS.regular} color={COLORS.primary} size={SIZES.h3} line_height={null} />
        </RowView>
      ) : null}

      {view.related ? <LinkCard title={`More on ${record.name}`} caption={view.related} trailing={`${view.related_count} ›`} onPress={detail.openRelated} /> : null}

      <View style={styles.panel}>
        <RowView justify_content="space-between">
          <CustomText text="Notes" color={COLORS.text_secondary} size={SIZES.lg} />
          <Pressable accessibilityRole="button" onPress={() => detail.setSheet('notes')} style={styles.inline_link}>
            <CustomText text={record.notes ? 'Edit note' : 'Add note'} weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
          </Pressable>
        </RowView>
        <CustomText mt={SIZES.padding3} text={record.notes ?? 'No notes added yet.'} weight={FONTS.regular} color={record.notes ? COLORS.text_primary : COLORS.text_secondary} size={SIZES.sm} />
      </View>
      {record.status === 'cancelled' ? (
        <CustomText mt={SIZES.padding2} text="Recorded in Renewless. Your subscription must be cancelled with the service." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.xs} />
      ) : null}
    </ScrollView>
  );
}

export default function SubscriptionDetailScreen({ route }: Props) {
  const detail = useSubscriptionDetail(route);
  const { view } = detail;

  return (
    <Container style={styles.main_view} edges={['left', 'top', 'right', 'bottom']}>
      <Header title="Subscription" onBack={goBack} onDelete={view ? () => detail.setSheet('delete') : undefined} />
      {!view ? (
        <StateView status={detail.status === 'failed' ? 'failed' : 'loading'} message={detail.status === 'failed' ? detail.error : 'Loading subscription.'} onRetry={detail.retry} />
      ) : (
        <>
          <Body view={view} detail={detail} />
          <RowView gap={SIZES.padding2} style={styles.actions}>
            {view.cancelled ? (
              <CustomButton variant="primary" text="Track again" onPress={() => detail.setSheet('resume')} style={styles.action} />
            ) : (
              <>
                <CustomButton variant="primary" text="Edit" onPress={detail.openEdit} style={styles.action} />
                <CustomButton variant="secondary" text="Mark as cancelled" onPress={() => detail.setSheet('cancel')} style={styles.action} />
              </>
            )}
          </RowView>
          <DetailSheets view={view} detail={detail} />
        </>
      )}
    </Container>
  );
}
