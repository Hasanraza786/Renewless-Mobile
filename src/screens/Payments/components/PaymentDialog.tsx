import PlatformLogo from '../../../components/PlatformLogo';
import { StyleSheet, View } from 'react-native';
import ConfirmDialog from '../../../components/ConfirmDialog';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import RowView from '../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { common_styles } from '../../../utils/common_styles';
import { dateLabel } from '../../../utils/scan';
import type { PaymentRecord } from '../../../types';
import { sourceLabel } from '../index.function';
import { styles as screen_styles } from '../styles';
import { money } from '../../../utils/money';

const NOTES: Record<PaymentRecord['source'], string> = {
  gmail: 'Matched to a successful-payment receipt from your connected inbox.',
  reviewed: 'Previously reviewed and confirmed by you.',
  manual: 'Previously marked as paid by you.',
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <RowView justify_content="space-between" gap={SIZES.padding2} style={styles.field}>
      <CustomText text={label} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <CustomText text={value} weight={FONTS.regular} size={SIZES.sm} align="right" style={styles.value} />
    </RowView>
  );
}

// Payment details: evidence for one confirmed payment; confirmation never changes the renewal schedule.
export default function PaymentDialog({ payment, onClose, onViewSubscription }: { payment: PaymentRecord; onClose: () => void; onViewSubscription: () => void }) {
  return (
    <ConfirmDialog title="Payment details" close_label="Close payment details" onClose={onClose}>
      <RowView gap={SIZES.padding / 2} mt={SIZES.padding}>
        <View style={screen_styles.avatar}><PlatformLogo platform_id={payment.platform_id} name={payment.name} /></View>
        <CustomText text={payment.name} weight={FONTS.medium} size={SIZES.lg} style={common_styles.flex_1} />
        <CustomText text="Confirmed" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
      </RowView>
      <CustomText mt={SIZES.padding * 0.9} text={money(payment.currency, payment.amount)} weight={FONTS.medium} size={SIZES.h3} />
      <View style={styles.fields}>
        <Field label="Payment date" value={dateLabel(payment.paid_on)} />
        <Field label="Billing date" value={dateLabel(payment.billing_date)} />
        <Field label="Evidence source" value={sourceLabel(payment.source)} />
        {payment.inbox_email ? <Field label="Receipt inbox" value={payment.inbox_email} /> : null}
      </View>
      <CustomText mt={SIZES.padding * 0.8} text={`${NOTES[payment.source]} Confirmation doesn’t change your renewal schedule.`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
      <CustomButton variant="secondary" text="View subscription ›" onPress={onViewSubscription} style={styles.action} />
    </ConfirmDialog>
  );
}

const styles = StyleSheet.create({
  fields: {
    marginTop: SIZES.padding2,
  },
  field: {
    borderBottomColor: COLORS.line_quiet,
    borderBottomWidth: 1,
    paddingVertical: SIZES.padding * 0.55,
  },
  value: {
    flexShrink: 1,
  },
  action: {
    marginTop: SIZES.padding * 0.8,
  },
});
