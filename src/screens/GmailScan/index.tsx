import { Pressable, ScrollView, View } from 'react-native';
import { back_icon, logo_mark } from '../../assets/icons';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Icons from '../../components/Icons';
import RowView from '../../components/RowView';
import SizedBox from '../../components/SizedBox';
import StateView from '../../components/StateView';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import { styles as onboarding_styles } from '../Onboarding/styles';
import GmailSheets from './components/GmailSheets';
import { RecoveryFooter, RecoveryView, ReviewFooter, ReviewView, ScanningFooter, ScanningView } from './components/GmailViews';
import useGmailScan, { type GmailScanRoute } from './index.function';

// Signed-in Gmail scan → review → save in onboarding's frame and components (locked 13 Nov 2026): the same header
// (Back, RENEWLESS, mark; no step bars), scrolling content and pinned footer. Every Gmail entry opens this screen.
export default function GmailScanScreen({ route }: { route: GmailScanRoute }) {
  const gmail = useGmailScan(route);
  const fitted = gmail.phase === 'nothing' || gmail.phase === 'interrupted';

  return (
    <Container is_auth>
      <View style={onboarding_styles.main_view}>
        <RowView justify_content="space-between">
          <Pressable accessibilityRole="button" accessibilityLabel="Back" hitSlop={SIZES.padding3 / 4} onPress={goBack} style={onboarding_styles.back}>
            <Icons name={back_icon} />
          </Pressable>
          <CustomText text="RENEWLESS" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} letter_spacing={2} />
          <Icons name={logo_mark} />
        </RowView>

        <SizedBox />

        {gmail.phase === 'loading' ? (
          <StateView status="loading" message="Getting your inbox ready." />
        ) : (
          <>
            {/* Keyed by phase so each state (e.g. the review after scanning) opens at the top. */}
            <ScrollView key={gmail.phase} showsVerticalScrollIndicator={false} contentContainerStyle={[onboarding_styles.scroll, fitted && onboarding_styles.scroll_fitted]}>
              {gmail.phase === 'scanning' ? <ScanningView gmail={gmail} /> : gmail.phase === 'review' ? <ReviewView gmail={gmail} /> : <RecoveryView gmail={gmail} />}
            </ScrollView>
            <View style={[onboarding_styles.footer, !fitted && onboarding_styles.footer_divider]}>
              {gmail.phase === 'scanning' ? <ScanningFooter gmail={gmail} /> : gmail.phase === 'review' ? <ReviewFooter gmail={gmail} /> : <RecoveryFooter gmail={gmail} />}
            </View>
          </>
        )}
      </View>
      <GmailSheets gmail={gmail} />
    </Container>
  );
}
