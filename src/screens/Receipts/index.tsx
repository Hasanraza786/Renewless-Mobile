import { ScrollView, View } from 'react-native';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import ImagePreview from '../../components/ImagePreview';
import Mascot from '../../components/Mascot';
import PlatformLogo from '../../components/PlatformLogo';
import RowView from '../../components/RowView';
import StateView from '../../components/StateView';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import type { ReceiptItem } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { money } from '../../utils/money';
import { dateLabel } from '../../utils/scan';
import useReceipts, { type ReceiptsController, type ReceiptsRoute } from './index.function';
import { styles } from './styles';

const TONE = {
  paid: { style: styles.kind_paid, color: COLORS.primary },
  alert: { style: styles.kind_alert, color: COLORS.danger },
  info: { style: styles.kind_info, color: COLORS.trial },
};

function ReceiptCard({ item, receipts }: { item: ReceiptItem; receipts: ReceiptsController }) {
  const tone = TONE[item.tone];
  return (
    <View style={styles.panel}>
      <RowView justify_content="space-between">
        <CustomText text={dateLabel(item.date)} size={SIZES.lg} />
        {item.amount ? <CustomText text={money(item.amount.currency, item.amount.amount)} size={SIZES.lg} /> : null}
      </RowView>
      <View style={[styles.kind, tone.style]}>
        <CustomText text={item.kind_label} weight={FONTS.regular} color={tone.color} size={SIZES.sm} />
      </View>
      <CustomText mt={SIZES.padding2} text={item.subject} weight={FONTS.regular} size={SIZES.sm} />
      <CustomText mt={SIZES.padding / 4} text={item.from} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} number_of_lines={1} />
      {item.files.map(file => {
        const opening = receipts.opening_id === file.id;
        return (
          <RowView
            key={file.id}
            justify_content="space-between"
            accessibilityRole="button"
            accessibilityLabel={`${file.kind === 'pdf' ? 'View PDF' : 'View image'}, ${file.name}`}
            disabled={!!receipts.opening_id}
            onPress={() => receipts.openFile(item, file)}
            style={styles.file}>
            <CustomText text={`${file.kind === 'pdf' ? 'PDF' : 'Image'} · ${file.name}`} weight={FONTS.regular} size={SIZES.sm} number_of_lines={1} style={common_styles.flex_1} />
            <CustomText text={opening ? 'Opening…' : file.kind === 'pdf' ? 'View PDF ›' : 'View image ›'} weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
          </RowView>
        );
      })}
    </View>
  );
}

// Receipts (approved and locked 13 Nov 2026): Gmail billing emails for one subscription, newest first, with their files.
export default function ReceiptsScreen({ route }: { route: ReceiptsRoute }) {
  const receipts = useReceipts(route);
  const { record } = receipts;

  return (
    <Container style={styles.main_view}>
      <Header title="Receipts" onBack={goBack} />
      {receipts.status !== 'ready' || !receipts.receipts ? (
        <StateView status={receipts.status === 'failed' ? 'failed' : 'loading'} message={receipts.status === 'failed' ? receipts.load_error : 'Loop is finding your receipts…'} onRetry={receipts.load} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {record ? (
            <RowView gap={SIZES.padding2} style={styles.panel}>
              <View style={styles.avatar}>
                <PlatformLogo platform_id={record.platform_id} name={record.name} letter_size={SIZES.md} />
              </View>
              <View style={common_styles.flex_1}>
                <CustomText text={record.plan ? `${record.name} · ${record.plan}` : record.name} size={SIZES.lg} />
                <CustomText mt={SIZES.padding * 0.3} text="Billing emails found in your Gmail" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
              </View>
            </RowView>
          ) : null}
          {receipts.file_error ? <CustomText text={receipts.file_error} weight={FONTS.regular} color={COLORS.danger} size={SIZES.sm} accessibility_role="alert" /> : null}
          {receipts.receipts.length ? (
            <>
              {receipts.receipts.map(item => (
                <ReceiptCard key={item.id} item={item} receipts={receipts} />
              ))}
              <CustomText text="Only billing details and attached files are kept. Full emails are never stored." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            </>
          ) : (
            <View style={styles.empty}>
              <Mascot expression="neutral" size={SIZES.padding * 5.4} label="Loop" />
              <CustomText mt={SIZES.padding * 0.9} text="No receipts yet" size={SIZES.lg} align="center" />
              <CustomText mt={SIZES.padding2} text="Billing emails Gmail finds for this subscription appear here, with their PDF or image." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
            </View>
          )}
        </ScrollView>
      )}
      <ImagePreview uri={receipts.image_url} label="Receipt image" onClose={receipts.closeImage} />
    </Container>
  );
}
