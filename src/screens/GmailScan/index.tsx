import { ScrollView, View } from 'react-native';
import { gmail_logo } from '../../assets/icons';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import StateView from '../../components/StateView';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import GmailSheets from './components/GmailSheets';
import { InboxSwitch, RecoveryView, ReviewView, ScanningView } from './components/GmailViews';
import useGmailScan, { type GmailScanRoute } from './index.function';
import { styles } from './styles';

// Authenticated Gmail scan → review → save; the inbox stays visible and the action stays pinned.
export default function GmailScanScreen({ route }: { route: GmailScanRoute }) {
  const gmail = useGmailScan(route);
  const footer =
    gmail.phase === 'scanning'
      ? { text: 'Review subscriptions', onPress: gmail.openReview, disabled: !gmail.scan_done, note: 'Only your chosen subscriptions will be saved.' }
      : gmail.phase === 'review'
        ? { text: gmail.save_label, onPress: gmail.save, disabled: !gmail.selected_count || gmail.saving, note: 'Your existing subscriptions stay available.' }
        : gmail.phase === 'nothing'
          ? { text: 'Try another inbox', onPress: gmail.openInboxes, disabled: false, note: '' }
          : gmail.phase === 'interrupted'
            ? { text: 'Try again', onPress: gmail.retry, disabled: false, note: '' }
            : null;

  return (
    <Container is_auth style={styles.main_view}>
      <Header title={gmail.title} onBack={goBack} accessory={gmail_logo} />
      {gmail.phase === 'loading' ? (
        <StateView status="loading" message="Getting your inbox ready." />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            <InboxSwitch gmail={gmail} />
            {gmail.phase === 'scanning' ? <ScanningView gmail={gmail} /> : gmail.phase === 'review' ? <ReviewView gmail={gmail} /> : <RecoveryView gmail={gmail} />}
          </ScrollView>
          {footer ? (
            <View style={styles.footer}>
              <CustomButton variant="primary" text={footer.text} busy={gmail.saving && gmail.phase === 'review'} disabled={footer.disabled} onPress={footer.onPress} />
              {footer.note ? <CustomText mt={SIZES.padding3} text={footer.note} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" /> : null}
            </View>
          ) : null}
        </>
      )}
      <GmailSheets gmail={gmail} />
    </Container>
  );
}
